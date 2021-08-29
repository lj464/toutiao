<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync='error'
      error-text="加载失败"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error:false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        let { data } = await getSearch({
          page: this.page,
          per_page: 20,
          q: this.searchText,
        });
        const { results } = data.data;
        this.list.push(...results);
        // 有没有结果
        this.loading = false;

        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.$toast("数据获取失败");
        this.error = true
        this.loading = false
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>