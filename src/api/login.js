import request from '@/utils/request'

// 登录方法
export function login(username, password, uuid) {
  const data = {
    name: username,
    password,
    uuid
  }
  return request({
    url: '/supervision-spot/module/supervision.spot.AdminInfo/adminLogon',
    headers: {
      isToken: false
    },
    method: 'get',
    params: data
  })
}


// 退出方法
export function logout() {
  return request({
    url: '/supervision-spot/module/supervision.spot.AdminInfo/adminLogoff',
    headers: {
      isToken: false
    },
    method: 'get',
  })
}


// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}




