<template>
	<view class="content">
		<uni-status-bar />
		<view class="login-title">欢迎使用</view>
		<view class="form">
			<view class="form-list">
				<uni-icons type="person" class="icon-l" :size="actionIconSize" :color="iconColor"></uni-icons>
				<view class="form-input">
					<input class="input" type="text" v-model="mobile" placeholder="请输入手机号" :value="mobile" />
				</view>
			</view>
			<view class="form-list">
				<uni-icons type="locked" class="icon-l" :size="actionIconSize" :color="iconColor"></uni-icons>
				<view class="form-input" v-if="isLoginPwd">
					<input class="input" :type="isPwdShow?'text':'password'" v-model="password" placeholder="请输入密码" />
					<uni-icons :type="isPwdShow?'eye':'eye-slash'" class="icon-r" :size="actionIconSize" :color="iconColor" @tap="eyeTap"></uni-icons>
				</view>
				<view class="form-input" v-else>
					<input class="input" type="text" v-model="code" placeholder="请输入验证码" />
					<uni-get-code duration="3" @getcode="getCode" />
				</view>
			</view>
			<view class="form-list form-type">
				<view class="login-type" @tap="loginTypeTap">{{loginTypeText}}</view>
			</view>
			<view class="form-list">
				<button type="default" class="form-btn" @tap="loginTap">登录</button>
			</view>
			<view class="form-list form-footer">
				<view class="footer-item">
					<router-link to="{name:register}">新用户注册</router-link>
				</view>
				<view class="footer-item">
					<router-link to="{name:forget}">忘记密码</router-link>
				</view>
			</view>
		</view>
		<view class="login-other">
			<view class="other-header">
				<view class="line"></view>
				<view class="txt">第三方账号</view>
				<view class="line"></view>
			</view>
			<view class="other-container">
				<view class="other-list">
					<image class="img" src="../../static/wx.png" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar.vue";
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				actionIconSize: 0,
				iconColor: "#29a529",
				isPwdShow: false,
				isLoginPwd: true, //登录类型 true:密码登录 false：手机验证码
				mobile: "",
				password: "",
				code: "0",
				fromPath:''
			};
		},
		mounted() {
			let _this = this;
			uni.getSystemInfo({
				success: function(res) {
					let format = res.windowWidth / 750;
					_this.actionIconSize = 40 * format;
				}
			});
			let query = this.$Route.query
			console.log(query)
			if (query) {
				if(query.mobile){
					this.mobile = query.mobile;
				}
				if(query.to){
					this.fromPath = query.to;
				}
			}
		},
		computed: {
			...mapState(["userInfo"]),
			loginTypeText() {
				let type = "密码登录";
				if (this.isLoginPwd) {
					type = "密码登录";
				} else {
					type = "验证码登录";
				}
				return type;
			}
		},
		methods: {
			...mapMutations(["setUserInfo"]),
			eyeTap() {
				this.isPwdShow = !this.isPwdShow;
			},
			loginTypeTap() {
				this.isLoginPwd = !this.isLoginPwd;
			},
			getCode(e) {
				console.log(e);
			},
			async loginTap() {
				const {
					mobile,
					password,
					code,
					errorToast
				} = this;
				if (!mobile) {
					errorToast("请输入手机号");
					return false;
				}
				if (!password) {
					errorToast("请输入密码");
					return false;
				}
				if (!code) {
					errorToast("请输入您收到的手机验证码");
					return false;
				}
				const res = await this.$http.request({
					url: "/user/login",
					method: "post",
					loadingTitle:'登陆中...',
					data: {
						mobile: mobile,
						password: password,
						code: code
					}
				});
				if (res.status === "E") {
					errorToast(res.msg);
					return false;
				}     
				const resData = res.data;
				uni.setStorage({
					key: 'userinfo',
					data: JSON.stringify(resData),
					success: function() {
						console.log('success');
					}
				});
				let fromPath=''
				if(this.fromPath){
					fromPath=this.fromPath
				}else{
					fromPath='/pages/mine/mine'
				}
				this.$Router.push(fromPath);
			},
			errorToast(title) {
				uni.showToast({
					title: title,
					duration: 2000,
					mask: true,
					icon: "none"
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.content {
		height: calc(100%);
		display: flex;
		flex-direction: column;
		background-color: #fff;

		.login-title {
			font-size: 2 * $uni-font-size-sm;
			line-height: 2 * $uni-font-size-lg;
			color: $uni-text-color-active;
			font-weight: bold;
			padding: 100rpx 0 0 100rpx;
		}

		.form {
			padding-top: 50rpx;

			.form-list {
				display: flex;
				align-items: center;
				padding: 0 2 * $uni-spacing-row-base;
				margin-top: $uni-spacing-col-lg;

				.form-input {
					flex: 1;
					border-bottom: 2rpx solid $uni-border-color-active;
					margin-left: $uni-spacing-row-base;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 80rpx;

					.input {
						display: block;
						flex: 1;
						font-size: $uni-font-size-lg;
						color: $uni-text-color-active;
						line-height: 40rpx;
						height: 40rpx;
						padding-right: 20rpx;
						border: 0;
						outline: none;
						min-height: auto;
					}
				}

				.form-btn {
					margin-top: 50rpx;
					width: 100%;
					background: $uni-button-bg-color-base;
					color: #fff;

					&::after {
						display: none;
					}
				}

				&.form-footer {
					justify-content: space-between;

					.footer-item {
						font-size: $uni-font-size-base;
						line-height: 40rpx;
						color: $uni-text-color-active;
					}
				}

				&.form-type {
					justify-content: flex-end;

					.login-type {
						color: $uni-text-color-active;
						font-size: $uni-font-size-base;
						line-height: 1;
					}
				}
			}
		}

		.login-other {
			margin-top: 100rpx;
			padding: 0 2 * $uni-spacing-row-base;

			.other-header {
				display: flex;
				align-items: center;

				.line {
					height: 2rpx;
					flex: 1;
					background-color: $uni-border-color;
				}

				.txt {
					font-size: $uni-font-size-base;
					line-height: 1;
					color: $uni-text-color-grey;
					padding: 0 $uni-spacing-row-sm;
				}
			}

			.other-container {
				display: flex;
				justify-content: center;
				padding-top: 50rpx;

				.other-list {
					.img {
						width: 100rpx;
						height: 100rpx;
					}
				}
			}
		}
	}
</style>
