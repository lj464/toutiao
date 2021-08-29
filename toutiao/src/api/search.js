import request from '@/utils/request'

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索
export function getSearch(params) {
    return request({
      method: "GET",
      url: "/app/v1_0/search",
      params
    })
  }