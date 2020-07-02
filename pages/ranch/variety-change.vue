<template>
	<view class="content">
		<view class="form-box">
			<view class="form-container">
				<view class="form-list">
					<view class="form-title">
						转入品种
						<text class="require">*</text>：
					</view>
					<view class="form-input">
						<picker mode="selector" :range="categoryList" @change="categoryChange">
							<input type="text" :value="categoryVal" class="input" placeholder="请选择转入品种" disabled />
						</picker>
					</view>
					<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>入栏日期</text>
						<text class="require">*</text>：
					</view>
					<view class="form-input" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择入栏日期" disabled />
					</view>
					<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>入栏体重</text>
						<text class="require">*</text>：
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入入栏体重" v-model="weight" />
					</view>
					<view class="form-unit">kg</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>健康评估</text>
						<text class="require">*</text>：
					</view>
					<view class="form-input">
						<picker mode="selector" :range="healthEvaluationList" @change="healthEvaluationChange">
							<input type="text" :value="healthEvaluation" class="input" placeholder="请选择健康评估" disabled />
						</picker>
					</view>
					<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
			</view>
		</view>
		<view class="btn-container">
			<button type="default" class="btn" @tap="subTap">提交</button>
		</view>
		<uni-calendar ref="dateConfirm" :insert="false" :lunar="true" :clearDate="false" @confirm="dateConfirm" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actionIconSize: 0, //右侧箭头字号
				iconColor: "#666", //右侧箭头颜色
				currentCategory: 0, //牛分类
				oldCategory:'',//上一页传过来的分类
				categoryIds: [], //牛分类原始数据idList
				categoryVal: '', //选中牛分类
				categoryList: [], //牛分类List
				date: "", //入栏日期
				weight: '', //入栏体重
				healthEvaluation: "", //健康评估
				healthEvaluationList: [], //健康评估List
				id: ''//牛列表id
			}
		},
		mounted() {
			let _this = this;
			uni.getSystemInfo({
				success: function(res) {
					let format = res.windowWidth / 750;
					_this.actionIconSize = 40 * format;
				}
			});
			uni.getStorage({
				key: "userinfo",
				success: function(res) {
					const userInfo = JSON.parse(res.data);
					_this.uid = userInfo.uid;
				}
			})
			let query = this.$Route.query
			this.id = query.id
			this.oldCategory=query.category
			this.getCategoryList()
			this.getHealthEvaluationList()
		},
		methods: {
			async subTap() {
				const {
					id,
					currentCategory,
					categoryIds,
					date,
					weight,
					healthEvaluation,
				}=this
				const category=categoryIds[currentCategory]
				console.log(category)
				const params={
					id:id,
					category:category,
					date:date,
					weight: Number(weight),
					health_evaluation: healthEvaluation,
				}
				const res = await this.$http.request({
					url: "/niu/niuChange",
					method: "post",
					data: params
				});
				if (res.status === "E") {
					this.errorToast(res.msg);
					return false;
				}
				this.errorToast(res.msg, 'success');
				setTimeout(() => {
					this.$Router.push({
						path: "/pages/ranch/ranch"
					});
				}, 1000)
			},
			categoryChange(e) {
				this.currentCategory = e.detail.value
				this.categoryVal = this.categoryList[e.detail.value];
				this.sex = '';
			},
			dateOpen() {
				this.$refs.dateConfirm.open();
			},
			dateConfirm(e) {
				this.date = e.fulldate;
			},
			dateChange(e) {
				this.date = e.detail.value;
			},
			healthEvaluationChange(e) {
				this.healthEvaluation = this.healthEvaluationList[e.detail.value];
			},
			async getCategoryList() {
				const res = await this.$http.request({
					url: "/niu/getCategoryList",
					method: "get",
					data: {}
				});
				const resData = res.data;
				let dataList = [];
				resData.forEach((val) =>{
					if (val.id != 1 && val.id != 4&& val.id != this.oldCategory) {
						dataList.push(val.name);
						this.categoryIds.push(val.id)
					}
				});
				this.oldCategoryList = resData
				this.categoryList = dataList;
				this.categoryVal = this.categoryList[this.currentCategory]
			},
			async getHealthEvaluationList() {
				const res = await this.$http.request({
					url: "/healthEvaluation/getHealthEvaluationList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.healthEvaluationList = dataList;
			},
			errorToast(title, icon) {
				uni.showToast({
					title: title,
					duration: 2000,
					mask: true,
					icon: icon || "none"
				});
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

		.form-box {
			flex: 1;
			overflow: hidden;

			.scroll-Y {
				height: 100%;
			}

			.form-container {
				height: 100%;
				padding: 0 2 * $uni-spacing-row-base;

				.form-list {
					display: flex;
					align-items: center;
					height: 100rpx;
					border-bottom: 2rpx solid $uni-border-color;

					.form-title {
						font-size: $uni-font-size-base;
						color: $uni-text-color-form;

						.require {
							color: $uni-text-color-tips;
							font-size: $uni-font-size-base;
							font-weight: bold;
						}
					}

					.form-input {
						flex: 1;
						font-size: $uni-font-size-base;
						color: $uni-text-color;
						line-height: 40rpx;
						padding-right: 20rpx;

						.input {
							font-size: $uni-font-size-base;
							color: $uni-text-color;
						}

						.img-container {
							width: auto;
							padding-top: 10rpx;

							.img {
								width: 80rpx;
								height: 80rpx;
							}
						}
					}

					.form-unit {
						font-size: $uni-font-size-base;
						color: $uni-text-color;
					}
				}
			}
		}

		.btn-container {
			padding: 20rpx 2 * $uni-spacing-row-base;

			.btn {
				width: 100%;
				height: 90rpx;
				background: $uni-button-bg-color-sm;
				color: #fff;
				font-size: $uni-font-size-lg;
				line-height: 90rpx;

				&::after {
					display: none;
				}
			}
		}
	}
</style>
