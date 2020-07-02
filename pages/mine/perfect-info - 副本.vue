<template>
	<view class="content">
		<view class="form">
			<view class="form-list">
				<view class="form-title">
					出生日期<text>*</text>：
				</view>
				<view class="form-input">
					<picker mode="date" :value="birthDate" @change="birthDateChange">
						<input type="text" :value="birthDate" class="input" placeholder="请选择出生日期" disabled/>
					</picker>
				</view>
				<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
			</view>
			<view class="form-list">
				<view class="form-title">
					父系编号<text>*</text>：
				</view>
				<input type="text" class="form-input" placeholder="请输入父系编号" v-model="parentNo"/>
			</view>
			<view class="form-list">
				<view class="form-title">
					精液编号<text>*</text>：
				</view>
				<input type="text" class="form-input" placeholder="请输入精液编号" v-model="semennNo"/>
			</view>
			<view class="form-list">
				<view class="form-title">
					母系编号<text>*</text>：
				</view>
				<input type="text" class="form-input" placeholder="请输入母系编号" v-model="matriarchalNo"/>
			</view>
			<view class="form-list">
				<view class="form-title">
					品种<text>*</text>：
				</view>
				<view class="form-input">
					<!-- <picker mode="selector" :value="variety" @change="varietyChange">
						<input type="text" :value="variety" class="input" placeholder="请选择品种" disabled/>
					</picker> -->
				</view>
				<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
			</view>
			<view class="form-list">
				<view class="form-title">
					性别<text>*</text>：
				</view>
				<view class="form-input">
					<picker @change="sexChange" :value="sexIndex" :range="sexList">
						<input type="text" :value="sex" class="input" placeholder="请选择性别" disabled/>
					</picker>
				</view>
				<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
			</view>
			<view class="form-list">
				<view class="form-title">
					所在地区<text>*</text>：
				</view>
				<view class="form-input">
					<view class="address-select">
						<uni-address-picker @change="addressChange" mode="street">
							<input type="text" :value="addressPickerDate" class="input" placeholder="请选择地区" disabled/>
						</uni-address-picker>
					</view>
				</view>
				<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
			</view>
			<view class="form-list">
				<view class="form-title">
					详细地址<text>*</text>：
				</view>
				<input type="text" value="" class="form-input" placeholder="请输入详细地址" />
			</view>
			<view class="form-list form-btn">
				<button type="default" class="btn">提交</button>
			</view>
		</view>
	</view>
</template>
<script>
	import uniAddressPicker from '@/components/uni-address-picker/uni-address-picker.vue'
	export default {
		components: {
			uniAddressPicker
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				actionIconSize: 0,//右侧箭头字号
				iconColor: '#666',//右侧箭头颜色
				birthDate: '',//出生日期
				addressPickerDate:'',//地区
				parentNo:'',//父系编号
				semennNo:'',//精液编号
				matriarchalNo:'',//母系编号
				variety:'',//品种
				sex:'',//性别
				sexIndex:0,
				sexList: ['公','母'],//性别List
				
			}
		},
		computed: {
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
		methods: {
			birthDateChange: function(e) {
				console.log(e)
				this.birthDate = e.detail.value
			},
			addressChange: function(e) {
				console.log(e)
				this.addressPickerDate=e.value
			},
			varietyChange: function(e) {
				console.log(e)
				this.variety = e.detail.value
			},
			sexChange: function(e) {
				console.log(e)
				this.sex = this.sexList[e.detail.value]
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		height: calc(100%);
		display: flex;
		flex-direction: column;
		background-color: #fff;

		.form {
			padding: 50rpx 2*$uni-spacing-row-base 0;

			.form-list {
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid $uni-border-color;
				height: 100rpx;

				.form-title {
					font-size: $uni-font-size-base;
					color: $uni-text-color-form;

					text {
						color: $uni-text-color-tips;
						font-size: $uni-font-size-base;
						font-weight: bold;
					}
				}

				.form-input {
					display: block;
					flex: 1;
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					line-height: 40rpx;
					padding-right: 20rpx;
					.input{
						font-size:$uni-font-size-base;
						color: $uni-text-color;
					}
				}

				&.form-btn {
					border: 0;
					margin-top: 100rpx;

					.btn {
						width: 100%;
						background: $uni-button-bg-color-sm;
						color: #fff;

						&::after {
							display: none;
						}
					}
				}
			}
		}
	}
</style>
