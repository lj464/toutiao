<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        :style="{ width: '40px' }"
        @click="Editcannel"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
      <!-- <van-icon
        v-show="isEdit && !fiexdChannels.includes(channel.id)"
        slot="icon"
        name="clear"
      ></van-icon> -->
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in myChannels"
        :key="value.id"
        @click="onMyChannels(value, index)"
      >
        <van-icon
          name="clear"
          v-show="isEdit && !fixedChiled.includes(value.id)"
          slot="icon"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">
          {{ value.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in recommendChannels"
        :key="value.id"
        :text="value.name"
        @click="onAddChannel(value)"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channels.js";
import { mapState } from "vuex";
import { setItem } from "../../../utils/storage";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      AllChannels: [],
      isEdit: false,
      fixedChiled: [0],
    };
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      return this.AllChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
    },
  },
  watch: {},
  created() {
    this.getAllChannels();
  },
  mounted() {},
  methods: {
    async getAllChannels() {
      try {
        let res = await getAllChannels();
        this.AllChannels = res.data.data.channels;
      } catch (err) {
        console.log(err);
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel);
      // 判断有无登录数据持久化
      this.$store.commit("setIsSet");
      if (this.user) {
        try {
          await addUserChannel([
            {
              id: channel.id, // 频道 id
              seq: this.myChannels.length, // 频道的 序号
            },
          ]);
          setItem("toutiao", this.myChannels);
        } catch (err) {
          this.$toast("增加频道失败");
        }
      } else {
        setItem("breakToutiao", this.myChannels);
      }
    },
    Editcannel() {
      this.isEdit = !this.isEdit;
    },
    onMyChannels(Channel, index) {
      if (this.isEdit) {
        // 删除
        if (this.fixedChiled.includes(index)) {
          this.$toast("固定频道不能删除");
          return;
        }
        if (index <= this.active) {
          let data = this.active - 1;
          this.$emit("update:active", data);
        }
        this.myChannels.splice(index, 1);
        // console.log(Channel,index);
        this.deleteChannel(Channel);
      } else {
        //切换
        this.$emit("update:active", index);
        this.$parent.close();
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          this.$store.commit("setIsSet");
          await deleteUserChannel(channel.id);
          setItem("toutiao", this.myChannels);
        } else {
          // 未登录，将数据存储到本地
          setItem("breakToutiao", this.myChannels);
        }
      } catch (err) {
        console.log(err);
        this.$toast("删除频道失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  margin-top: 40px;
  .channel-item {
    overflow: hidden;
    height: 46px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 15px;
      }
    }
  }
  /deep/.van-grid-item__content {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    background-color: #ccc;
    .van-grid-item__text,
    .text {
      font-size: 12px;
      color: #222;
      margin-top: 0;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-grid-item__icon {
      font-size: 12px;
    }
    .van-grid-item__text {
      font-size: 10px !important;
    }
    .van-icon-clear {
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 2;
      color: #cacaca;
      font-size: 16px;
    }
  }
  /deep/.van-cell__title {
    line-height: 28px;
  }
  .active {
    color: red !important;
  }
}
// /deep/.channel-edit .van-grid-item__content .van-grid-item__icon {
//   font-size: 12px!important;
//   color: #222;
//   margin-top: 0;
// }
</style>