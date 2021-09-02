<template>
  <!--
    只有 List 在可视范围内才会检查滚动位置触发 onLoad
   -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    @load="onLoad"
  >
  、<CommentItem v-for="(item ,index) in list" :key="index" :comment='item'/>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  computed: {
  },
  watch: {},
  created () {
    this.loading = true
    // 上来拿到总数
    this.onLoad()
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getComments({
          type: this.type, 
          source: this.source.toString(), 
          offset: this.offset, 
          limit: this.limit 
        })

        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
