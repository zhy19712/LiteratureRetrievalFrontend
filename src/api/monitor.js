import request from '@/utils/request'



export function changeStatus(data) {
	return request({
	  url: '/targetfilter',
	  method: 'put',
	  data
	})
  }
  
 export function change_Keyword_Status_API(data) {
 	return request({
 	  url: '/keywordfilter',
 	  method: 'put',
 	  data
 	})
   }
   
    
 export function change_Target_Status_API(data) {
 	return request({
 	  url: '/targetfilter',
 	  method: 'put',
 	  data
 	})
   }
   
  


export function fetchTarget_API() {
  return request({
    url: '/target',
    method: 'get'
  })
}

export function fetchCenter_API() {
  return request({
    url: '/center',
    method: 'get'
  })
}

export function fetchKeyword_API() {
  return request({
    url: '/keyword',
    method: 'get'
  })
}

export function fetchKeyword_filter_API(data) {
  return request({
    url: '/keywordfilter',
    method: 'post',
	data
  })
}

export function fetchCategory_by_center_API(data) {
  return request({
    url: '/categoryfilter',
    method: 'post',
	data
  })
}

export function fetchTarget_by_center_API(data) {
  return request({
    url: '/targetfilter',
    method: 'post',
	data
  })
}
 


export function postTarget_API(data) {
	return request({
	  url: '/target',
	  method: 'post',
	  data
	})
  }
  
export function postKeyword_API(data) {
	return request({
	  url: '/keyword',
	  method: 'post',
	  data
	})
  }

export function postCategory_API(data) {
	return request({
	  url: '/category',
	  method: 'post',
	  data
	})
  }


export function editTarget_API(data) {
	return request({
	  url: '/targetfilter',
	  method: 'put',
	  data
	})
  }
 export function editKeyword_API(data) {
 	return request({
 	  url: '/keywordfilter',
 	  method: 'put',
 	  data
 	})
   }
 export function editCategory_API(data) {
 	return request({
 	  url: '/categoryfilter',
 	  method: 'put',
 	  data
 	})
   }  
 
  
  
  
export function deleteTarget_API(data) {
	return request({
	  url: '/targetfilter',
	  method: 'delete',
	  data
	})
  }
  
export function delete_category_API(data) {
	return request({
	  url: '/categoryfilter',
	  method: 'delete',
	  data
	})
  }
  
export function deleteKeyword_API(data) {
	return request({
	  url: '/keywordfilter',
	  method: 'delete',
	  data
	})
  }
