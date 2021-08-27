import Vue from 'vue'
import Vuex from 'vuex'
import {getItem ,setItem} from '../utils/storage'
const TOKEN = 'TOUTIAO_USER'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: getItem(TOKEN),
    // user: null
    isSet:getItem('isSet')
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(TOKEN,state.user)
    },
    removeTOken(state) {
      state.user = ''
      window.localStorage.removeItem('TOUTIAO_USER')
    },
    setIsSet(state){
      state.isSet = true
      setItem('isSet',true)
    }
  },
  actions: {},
  modules: {}
})
