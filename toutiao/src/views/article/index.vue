<template>
  <div class="article-container">
    <!-- 导航栏 <van-icon name="arrow-left" />-->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading='isLoding'
            >{{ article.is_followed ? "已关注" : "未关注" }}</van-button
          > -->
          <follow-user
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="content"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <commentList
          :source="article.aut_id"
          @onload-success="total = $event.total_count"
          :list="CommentList"
        />
        <!-- <ArticleComment  :article-id="article.art_id" /> -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            @click="isPostShow = true"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="total" color="#777" />
          <CollectArticle
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <like-article
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="staus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleById"
          >点击重试</van-button
        >
      </div>
    </div>

    <!-- 底部区域 -->
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from "../../api/article";
// import { setItem } from "../../utils/storage";
// import { addFollow, deleteFollow } from "@/api/user";
import { ImagePreview } from "vant";
import CollectArticle from "@/components/collect-article";
import LikeArticle from "@/components/like-article";
import followUser from "@/components/follow-user/index.vue";
// import ArticleComment from "./components/article-comment";
import CommentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post";
export default {
  name: "ArticleIndex",
  components: {
    followUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  data() {
    return {
      article: {},
      //   页面加载
      loading: true,
      staus: 0,
      //  按钮加载
      isLoding: false,
      total: 0,
      isPostShow: false,
      CommentList:[]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById();
  },
  mounted() {},
  methods: {
    async getArticleById() {
      this.loading = true;
      try {
        let { data } = await getArticleById(this.articleId);
        this.article = data.data;
        console.log(data);
        this.$nextTick(() => {
          this.getImg();
        });
        this.loading = false;
      } catch (err) {
        this.loading = false;
        if (err.response && err.response.staus === 404) {
          this.staus = 404;
        }
      }
    },
    getImg() {
      setTimeout(() => {
        console.log(this.$refs.content);
        let imgs = this.$refs.content.querySelectorAll("img");
        let imagesSrc = [];
        console.log(imgs);
        imgs.forEach((v, index) => {
          imagesSrc.push(v.src);
          v.onclick = () => {
            ImagePreview({
              images: imagesSrc,
              startPosition: index,
            });
          };
        });
        console.log(imagesSrc);
      }, 0);
    },
    onPostSuccess(data) {
      this.isPostShow = false;
      this.commentList.unshift(data.new_obj);
    },
    // async onFollow() {
    //   console.log(this.article.aut_id);
    //   this.isLoding = true
    //   try {
    //     if (this.article.is_followed) {
    //       let res = await deleteFollow(this.article.aut_id);
    //       console.log(res);
    //     } else {
    //       let res = await addFollow(this.article.aut_id);
    //       console.log(res);
    //     }
    //     this.article.is_followed = !this.article.is_followed;
    //   } catch (err) {
    //       var message = '操作失败'
    //       if(err.response && err.response.status === 400){
    //           message = '你不能关注你自己'
    //       }
    //       this.$toast(message)
    //   }
    //   this.isLoding = false
    // },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.page-nav-bar {
  background-color: #1989fa;
  /deep/.van-icon {
    color: #fff !important;
  }
}
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    padding-bottom: 30px;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>