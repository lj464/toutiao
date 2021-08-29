<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in suggestions" @click="$emit('search',item )" :key='index' icon="search">
      <div slot="title" v-html="heightline(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { getSearchSuggestions } from "@/api/search";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      suggestions:[]
    };
  },
  computed: {},
  watch: {
    searchText: {
      // handler(nweVal){
      // },
      handler: debounce(function (nweVal) {
        this.loadSearchSuggestions(nweVal);
      }, 200),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    heightline(source){
      let keyword = this.searchText
      const reg = new RegExp(keyword, 'gi')
      return source.replace(reg, `<span style="color: #3296fa">${keyword}</span>`)
    }
  },
};
</script>

<style scoped lang="less"></style>