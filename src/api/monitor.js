import request from '@/utils/request'

export function fetchTarget() {
  return request({
    url: '/target',
    method: 'get'
  })
}
