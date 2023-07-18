import Cookies from 'js-cookie'
import Cache from '@/plugins/cache'

const TokenKey = 'Admin-Token'
const AdminKey = 'Admin-Key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAdminData() {
  return Cache.local.getJSON(AdminKey);
}

export function setAdmin(info) {
  return Cache.local.setJSON(AdminKey, info);
}

export function removeAdmin() {
  return Cache.local.remove(AdminKey)
}
