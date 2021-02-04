import request from '@/utils/request'

export function getCenters() {
  return request({
    url: '/center',
    method: 'get'
  })
}

export function getKeywordTree(data) {
  return request({
    url:'/keywordtree',
    method: 'post',
    data
  })
}