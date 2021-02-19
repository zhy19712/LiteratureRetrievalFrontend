import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/admin/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/login',
    method: 'get'
  })
}
