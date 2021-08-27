import request from '../utils/request'

export const getAllChannels = () => {
    return request({
      method: 'GET',
      url: '/app/v1_0/channels'
    })
}
// 添加用户频道
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
// 删除
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}