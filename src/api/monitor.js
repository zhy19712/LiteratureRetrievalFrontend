import request from '@/utils/request'

export function fetchTarget() {
  return request({
    url: '/target',
    method: 'get'
  })
}

export function changeStatus(data) {
  return request({
    url: '/targetfilter',
    method: 'put',
    data
  })
}
