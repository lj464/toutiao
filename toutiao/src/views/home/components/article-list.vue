<template>
  <div class="article-list">
    <VanPullRefresh
      v-model="isLoding"
      @refresh="onRefresh"
      :success-text="successTExt"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem v-for="(article, index) in list" :key="index" :article='article' />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </VanPullRefresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import  ArticleItem from "../../../components/article-item/index.vue";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: "",
      error: false,
      isLoding: false,
      successTExt: "刷新成功",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        let data = {
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        };
        // JSON.parse("sdaks");
        let res = await getArticles(data);
        // 模拟出错的情况
        let result = res.data.data.results;
        this.list = this.list.concat(result);
        this.loading = false;
        if (!result.length) {
          this.finished = true;
        } else {
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (err) {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        let data = {
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1,
        };
        let res = await getArticles(data);
        // 模拟出错的情况
        let result = res.data.data.results;
        this.list.unshift(...result);
        this.list = this.list.concat(result);
        this.successTExt = `下拉刷新成功，更新了${result.length}条数据`;
      } catch (err) {
        this.successTExt = `下拉刷新失败`;
        this.isLoding = false;
        console.log(err);
      }
      this.isLoding = false;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
.edit-channel-popup {
  padding-top: 100px;
	box-sizing: border-box;
}
</style>