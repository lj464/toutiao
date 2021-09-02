<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">我出去跟别人说我的是。。。</p>
          <p>
            <span style="margin-right: 10px">3天前</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import {getComments} from '../../../api/comment'
export default {
  name: "ArticleComment",
  props: {
      articleId:{
          
      }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      articleComment: {
        // 文章评论相关数据
        list: [],
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0, // 总数据条数
      },
    };
  },

  methods: {
    async onLoad() {
      const articleComment = this.articleComment;
      const { data } = await getComments({
        type: "a", 
        source: this.articleId, 
        offset: articleComment.offset, 
        limit: 10, 
      });

      const { results } = data.data;
      articleComment.list.push(...results);

      articleComment.totalCount = data.data.total_count;

      // 3. 将加载更多的 loading 设置为 false
      articleComment.loading = false;

      if (results.length) {
        articleComment.offset = data.data.last_id; // 更新获取下一页数据的页码
      } else {
        articleComment.finished = true; // 没有数据了，关闭加载更多
      }
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>