import Vue from "vue";
import App from "./App";
import store from "./store";
import uniIcons from "./components/uni-icons/uni-icons.vue";
import axios from "axios";
//路由支持
import router from "./router";
import Router, { RouterMount } from "uni-simple-router";
import routerLink from "./node_modules/uni-simple-router/component/router-link.vue";
Vue.component("router-link", routerLink);
Vue.use(Router);

Vue.prototype.$axios = axios; //全局注册，使用方法为:this.$axios
axios.defaults.baseURL = "/api";
//http request导入并挂载到原型
import http from "./common/http";
Vue.prototype.$http = http;

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
