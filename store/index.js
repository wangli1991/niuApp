import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {}, // 用户信息
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  getters: {},
  actions: {
    // 获取用户信息
    async setUserInfo({ commit }) {
      commit("setUserInfo", {}); // 将用户信息存入store,全局调用
    },
  },
});
export default store;
