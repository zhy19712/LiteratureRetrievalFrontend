import request from '@/utils/request'

export function getCenters() {
  return request({
    url: '/center',
    method: 'get'
  })
}
<<<<<<< HEAD

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

export function getGlobalSearch(data) {
  return request({
    url:'/globalsearch',
    method: 'post',
    data
  })
}
=======
>>>>>>> 5654995f34e8a7de6a39ff50e787f10411608ad3
