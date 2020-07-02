<template>
	<view class="get-code">
		<button type="default" class="btn" :disabled="isTimerShow" @tap="getCode">{{codeText}}</button>
	</view>
</template>

<script>
	export default {
		name: 'uniGetCode',
		props:{
			duration:{
				type:[Number,String],
				default:60
			}
		},
		data() {
			return {
				codeText:"获取验证码",
				time:0,
				isTimerShow:false
			};
		},
		watch:{
			time(newval,oldval){
				if(newval<this.duration){
					this.codeText=this.duration-newval+'秒'
				}else{
					this.codeText='重新获取验证码'
				}
			}
		},
		methods:{
			getCode(){
				this.$emit('getcode',1)
				let time=0
				this.isTimerShow=true
				let timer=setInterval(()=>{
					time++
					this.time=time
					if(time>=this.duration){
						this.isTimerShow=false
						clearInterval(timer)
					}
				},1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
.get-code{
	.btn{
		min-width: 100rpx;
		background:none;
		border:none;
		color: $uni-text-color-active;
		font-size: $uni-font-size-sm;
		line-height: 50rpx;
		border-radius: 25rpx;
		padding: 0 10rpx;
		&::after{
			display: none;
		}
	}
}
</style>
