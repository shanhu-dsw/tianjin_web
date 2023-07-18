import { login, logout, getInfo } from '@/api/login'
import { getMessage, modifyMessage, getAdmin, getDepartment } from "@/api/problem";
import { getToken, setToken, removeToken, getAdminData, setAdmin, removeAdmin } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    admin: getAdminData(),
    noRead: 0,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ADMIN: (state, admin) => {
      state.admin = admin
    },
    SET_NOREAD: (state, number) => {
      state.noRead = number
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username.trim(), userInfo.password, userInfo.uuid).then(res => {

          setToken(res.token)
          commit('SET_TOKEN', res.token)
          delete res.admin_info[0].menus
          delete res.admin_info[0].department_detail

          debugger
          var deptId = res.admin_info[0].department_uuid;
          var deptName = res.admin_info[0].full_name;
          switch (res.admin_info[0].parent_array.length) {
            case 2:
              deptId = res.admin_info[0].parent_array[1].uuid;
              deptName = res.admin_info[0].parent_array[1].name;
              break;
          }

          res.admin_info[0].department_uuid2 = deptId;
          res.admin_info[0].department_uuid2_name = deptName;

          getDepartment({ uuid: deptId, offset: 0, rows: 1 }).then(resp => {
            res.admin_info[0].department_uuid2_type = resp.array[0].type_name;
            setAdmin(res.admin_info[0])
            commit('SET_ADMIN', res.admin_info[0])
            resolve(res.admin_info[0])

          }).catch(error => {
            commit('SET_TOKEN', '')
            removeToken()
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetNoRead({ commit }, query) {
      return new Promise((resolve, reject) => {
        getMessage(query).then(res => {
          commit('SET_NOREAD', res.count)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        removeAdmin()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeAdmin()
        resolve()
      })
    }
  }
}

export default user
