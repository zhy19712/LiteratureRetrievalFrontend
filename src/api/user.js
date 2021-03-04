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

export function user_Center_filter_API(data) {
  return request({
    url: '/admin/userfilter',
    method: 'post',
    data
  })
}


export function user_Center_Add_API(data) {
  return request({
    url: '/admin/user',
    method: 'post',
    data
  })
}


export function deleteUser_API(data) {
	return request({
	  url: '/admin/user',
	  method: 'delete',
	  data
	})
  }
	
export function editUser_API(data) {
	return request({
	  url: '/admin/user',
	  method: 'put',
	  data
	})
  }