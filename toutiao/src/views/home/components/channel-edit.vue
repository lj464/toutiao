<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        :style="{ width: '40px' }"
        >编辑</van-button
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
        icon="clear"
      >
        <span slot="text" class="text"  :class="{ active: index === active }">
          {{ value.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in 8"
        :key="value"
        text="文字"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
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
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.channel-edit {
  margin-top: 40px;
  .channel-item {
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
      font-size: 16px;
    }
    .van-icon-clear {
      position: absolute;
      left: -5px;
      top: -5px;
      z-index: 2;
      color: #cacaca;
    }
  }
  /deep/.van-cell__title {
    line-height: 28px;
  }
  .active {
    color: red !important;
  }
}
</style>