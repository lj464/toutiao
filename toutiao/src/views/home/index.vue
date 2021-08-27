<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <articleList :channel="channel"
      /></van-tab>
      <div slot="nav-right" class="placehoder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isEditChannelShow = true"
      >
        <i class="toutiao toutiao-gengduo"> </i>
      </div>
    </van-tabs>
    <van-popup
      class="edit-channel-popup"
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      ><channelEdit :myChannels="channels" :active.sync="active" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels} from "../../api/user";
import { getChannels} from "../../api/channels.js";
import channelEdit from "./components/channel-edit.vue";
import articleList from "./components/article-list.vue";
import { mapState } from "vuex";
import { getItem } from "../../utils/storage";
export default {
  name: "HomeIndex",
  components: {
    articleList,
    channelEdit,
  },
  props: {},
  data() {
    return {
      active: "",
      channels: {},
      isEditChannelShow: false,
    };
  },
  computed: {
    ...mapState(["isSet", "user"]),
  },
  watch: {},
  created() {},
  mounted() {
    this.getUserChannels();
  },
  methods: {
    async getUserChannels() {
      // 登录过
      if (this.user) {
        // 操作过
        if (this.isSet) {
          this.channels = getItem("toutiao");
          return;
        }
        // 初始化
        try {
          let res = await getUserChannels();
          this.channels = res.data.data.channels;
        } catch (err) {
          this.$toast("获取频道失败");
        }
      } else {
        let local = getItem("breakToutiao");
        if (local) {
          this.channels = local;
        } else {
          const { data } = await getChannels();
          this.channels = data.data.channels;
        }
      }
    },
    close() {
      this.isEditChannelShow = false;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 90px;
  .page-nav-bar {
    background-color: #5babfb;
  }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 250px;
    height: 30px;
    background-color: skyblue;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 22px;
      color: #fff;
    }
    .van-button__text {
      font-size: 18px;
    }
  }
  /deep/.van-tabs__wrap {
    position: fixed;
    top: 46px;
    z-index: 1;
    left: 0;
    right: 0;
    .van-tab {
      min-width: 80px;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 20px !important;
      background-color: #3296fa;
      bottom: 6px;
    }
    .van-tabs__nav {
      padding-bottom: 0px;
    }
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    width: 44px;
    height: 48px;
    opacity: 0.7;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    &::before {
      content: "";
      height: 100%;
      width: 1px;
      background-image: url("~@/assets/gradient-gray-line.png");
      background-size: contain;
      position: absolute;
      left: 0px;
      height: 40px;
    }
  }
  .placehoder {
    width: 1rem;
    height: 48px;
    flex-shrink: 0;
  }
}
</style>