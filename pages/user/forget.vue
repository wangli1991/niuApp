<template>
	<view class="content">
		<uni-status-bar />
		<view class="form">
			<view class="form-list">
				<view class="form-title">
					手机号
				</view>：
				<input type="text" value="" class="form-input" placeholder="请输入手机号"/>
			</view>
			<view class="form-list">
				<view class="form-title">
					密码
				</view>：
				<input type="text" value="" class="form-input" placeholder="8~16位数字或字母"/>
				<uni-icons :type="isPwdShow?'eye':'eye-slash'" class="icon-r" :size="actionIconSize" :color="iconColor" @tap="eyeTap"></uni-icons>
			</view>
			<view class="form-list">
				<view class="form-title">
					验证码
				</view>：
				<input type="text" value="" class="form-input" placeholder="请输入验证码"/>
				<uni-get-code duration="3" @getcode="getCode"></uni-get-code>
			</view>
			<view class="form-list form-btn">
				<button type="default" class="btn">立即找回</button>
			</view>
		</view>
	</view>
</template>
<script>
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar.vue"
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				actionIconSize: 0,
				iconColor:'#29a529',
				isPwdShow:false,
				isLoginCode:true//登录类型 true：手机验证码 false:密码登录
			}
		},
		mounted() {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					let format = res.windowWidth / 750
					_this.actionIconSize = 40 * format
				}
			})
		},
		computed:{
		},
		methods:{
			eyeTap(){
				this.isPwdShow=!this.isPwdShow
			},
			getCode(e){
				console.log(e)
			}
		}
	}
</script>
<style lang="scss" scoped>
.content{
	height: calc(100%);
	display: flex;
	flex-direction: column;
	background-color: #fff;
	.form{
		padding: 50rpx 2*$uni-spacing-row-base 0;
		.form-list{
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid $uni-border-color-active;
			height: 100rpx;
			.form-title{
				width: 85rpx;
				font-size: $uni-font-size-base;
				text-align: justify;
				text-align-last: justify;
			}
			.form-input{
				display: block;
				flex: 1;
				font-size: $uni-font-size-base;
				color:$uni-text-color;
				line-height: 40rpx;
				height: 40rpx;
				padding-right: 20rpx;
			}
			&.form-btn{
				border: 0;
				margin-top: 100rpx;
				.btn{
					width: 100%;
					background:$uni-button-bg-color-base;
					color: #fff;
					&::after{
						display: none;
					}
				}
			}
		}
	}
}
</style>
