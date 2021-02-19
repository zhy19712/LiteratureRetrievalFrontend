import request from '@/utils/request'

export function fetchTarget() {
  return request({
    url: '/article',
    method: 'get'
  })
}
