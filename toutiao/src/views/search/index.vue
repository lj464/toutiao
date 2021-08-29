<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->
    <SearchResult v-if="isResultShow" :searchText="searchText" />
    <SearchSuggestion
      :searchText="searchText"
      @search="onSearch"
      v-else-if="searchText"
    />
    <SearchHistory
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    />
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
import { setItem, getItem } from '@/utils/storage'
export default {
  name: "SearchPage",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      isResultShow: false,
      searchText: "",
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据
    };
  },
  computed: {},
  watch: {
    searchHistories(value) {
      setItem("TOUTIAO_SEARCH_HISTORIES", value);
    },
  },
  created() {},
  methods: {
    onCancel() {},
    onSearch(val) {
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      this.searchText = val;
      this.isResultShow = true;
    },
  },
};
</script>

<style scoped lang='less'>
.search-container {
  padding-top: 50px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>