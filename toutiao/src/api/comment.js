import request from "@/utils/request";

export function getComments(params) {
    return request({
      method: "GET",
      url: "/app/v1_0/comments",
      params
    });
  }
  export const addCommentLike = target => {
    return request({
      method: 'POST',
      url: '/app/v1_0/comment/likings',
      data: {
        target
      }
    })
  }
  
  /**
   * 取消评论点赞
   */
  export const deleteCommentLike = target => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/comment/likings/${target}`
    })
  }
  
  /**
   * 发布文章评论或评论回复
   */
  export const addComment = data => {
    return request({
      method: 'POST',
      url: '/app/v1_0/comments',
      data
    })
  }