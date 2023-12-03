import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const tokenStorage = localStorage.getItem('access_token')
  const uidStorage = localStorage.getItem('uid')
  const accessToken = ref(tokenStorage ?? '')
  const userId = ref(uidStorage ?? '')
  const isAuthenticated = ref(accessToken.value.length > 0 ? true : false)
  const profile = ref({
    name: '',
    role: ''
  })

  function loginSuccess(token: string, uid: string) {
    accessToken.value = token
    userId.value = uid
    localStorage.setItem('access_token', token)
    localStorage.setItem('uid', uid)
    isAuthenticated.value = true
  }

  function setProfile(opts: { name: string; role: string }) {
    profile.value.name = opts.name
    profile.value.role = opts.role
  }

  function logout() {
    isAuthenticated.value = false
    accessToken.value = ''
    profile.value.name = ''
    profile.value.role = ''
    userId.value = ''
    localStorage.removeItem('access_token')
    localStorage.removeItem('uid')
  }

  async function baseRequest(opts: {
    path: string
    method: string
    data?: any
  }): Promise<AxiosResponse> {
    const response = await axios({
      url: import.meta.env.VITE_BASE_URL + opts.path,
      method: opts.method,
      headers: {
        Authorization: 'Bearer ' + accessToken.value,
        'x-user-uid': userId.value
      },
      data: opts.data
    })
    if (response.status == 401) {
      logout()
    }
    return response
  }

  return {
    isAuthenticated,
    accessToken,
    loginSuccess,
    baseRequest,
    logout,
    profile,
    setProfile,
    userId
  }
})
