import request from "@/utils/request"
// 登录获取token接口
export const login = data => {
    return request({
      method: 'POST',
      url: '/app/v1_0/authorizations',
      data
    })
  }
// 获取用户基本信息
  export const getUserInfo = () => {
    return request({
      method: 'GET',
      url: '/app/v1_0/user',
    })
  }
  // 获取频道列表
  export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}