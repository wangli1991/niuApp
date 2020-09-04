import Vue from "vue";
import Router from "uni-simple-router";
import store from "@/store";
import {
	loginCheck
} from "@/common/loginCheck";
Vue.use(Router);
//初始化
const router = new Router({
	routes: [{
			aliasPath: "/", //对于h5端你必须在首页加上aliasPath并设置为/
			path: "/pages/home/home",
		},
		{
			path: "/pages/news/news",
			name: "news",
		},
		{
			path: "/pages/news/news-detail",
			name: "newsDetail",
		},
		{
			path: "/pages/ranch/ranch",
			name: "ranch",
		},
		{
			path: "/pages/ranch/ranch-detail",
			name: "ranchDetail",
		},
		{
			path: "/pages/mine/mine",
			name: "mine",
		},
		{
			path: "/pages/mine/perfect-info",
			name: "perfectInfo",
		},
		{
			path: "/pages/book/book",
			name: "book",
		},
		{
			path: "/pages/shop/shop",
			name: "shop",
		},
		{
			path: "/pages/cart/cart",
			name: "cart",
		},
		{
			path: "/pages/user/login",
			name: "login",
		},
		{
			path: "/pages/user/register",
			name: "register",
		},
		{
			path: "/pages/user/forget",
			name: "forget",
		},
		{
			path: "/pages/agreement/agreement",
			name: "agreement",
		},
		{
			path: "/pages/ranch/info-enter",
			name: "infoEnter",
		},
		{
			path: "/pages/ranch/map",
			name: "map",
		},
		{
			path: "/pages/records/index",
			name: "records",
		},
		{
			path: "/pages/records/records-list",
			name: "recordsList",
		},
		{
			path: "/pages/ranch/actions",
			name: "actions",
		}
	], //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// #ifndef H5
	if(to.name=='records'||to.name=='recordsList'){
		plus.screen.lockOrientation('landscape-primary'); //锁死屏幕方向为横屏  
		console.log(`横屏：${JSON.stringify(plus.screen.getCurrentSize())}`)
	}else{
		plus.screen.unlockOrientation();
		plus.screen.lockOrientation('portrait-primary'); //锁死屏幕方向为横屏  
		console.log(`竖屏：${JSON.stringify(plus.screen.getCurrentSize())}`)
	}
	// #endif
	console.log(to, from);
	if (
		to.name === "mine" ||
		to.name === "perfectInfo" ||
		to.name === "ranch" ||
		to.name === "infoEnter"
	) {
		try {
			const userInfo = uni.getStorageSync('userinfo');
			if (!userInfo) {
				next({
					name: "login",
					NAVTYPE: "push",
					params: {
						to: to.path,
					},
				});
			} else {
				next();
			}
		} catch (e) {
			next({
				name: "login",
				NAVTYPE: "push",
				params: {
					to: to.path,
				},
			});
		}
	} else {
		next();
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {});
export default router;
