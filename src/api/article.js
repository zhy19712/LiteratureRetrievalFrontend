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

export function getArticleTable(data) {
  return request({
    url:'/article',
    method: 'put',
    data
  })
}

export function getArticleHtml(data) {
  return request({
    url:'/articlefilter',
    method: 'post',
    data
  })
}