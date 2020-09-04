<template>
	<view class="content">
		<view class="form-box">
			<scroll-view scroll-y="true" class="scroll-Y" @scroll="scroll">
				<view class="form-container" v-for="item in dataList" :key="item.id">
					<view class="form-list">
						<view class="form-title">
							牛分类：
						</view>
						<view class="form-input">
							<text>{{item.category_name}}</text>
						</view>
					</view>
					<block v-if="item.category==1">
						<view class="form-list">
							<view class="form-title">
								档案登记号：
							</view>
							<view class="form-input">
								<text>{{item.archivesno}}</text>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								种公牛站编号：
							</view>
							<view class="form-input">
								<text>{{item.stationno}}</text>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								种公牛编号：
							</view>
							<view class="form-input">
								<text>{{item.bullno}}</text>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								品种代码：
							</view>
							<view class="form-input">
								<text>{{item.varietyno}}</text>
							</view>
						</view>
					</block>
					<block v-else>
						<view class="form-list">
							<view class="form-title">
								<text v-if="item.category==3">入栏日期：</text>
								<text v-else>出生日期：</text>
							</view>
							<view class="form-input">
								<text>{{item.date}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category!=4">
							<view class="form-title">
								父系编号：
							</view>
							<view class="form-input">
								<text>{{item.parentno}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==2">
							<view class="form-title">
								精液编号：
							</view>
							<view class="form-input">
								<text>{{item.semenno}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category!=4">
							<view class="form-title">
								母系编号：
							</view>
							<view class="form-input">
								<text>{{item.matriarchalno}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==3">
							<view class="form-title">
								入栏月龄：
							</view>
							<view class="form-input">
								<text>{{item.entry_age}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==3">
							<view class="form-title">
								转入来源：
							</view>
							<view class="form-input">
								<text>{{item.source==0?'系统内':'外部购买'}}</text>
							</view>
						</view>
						<block v-if="item.category==3">
							<view class="form-list" v-if="item.source==0">
								<view class="form-title">
									来源编号：
								</view>
								<view class="form-input">
									<text>{{item.source_archivesno}}</text>
								</view>
							</view>
						</block>
						<view class="form-list">
							<view class="form-title">
								品种：
							</view>
							<view class="form-input">
								<text>{{item.variety}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category!=2">
							<view class="form-title">
								性别：
							</view>
							<view class="form-input">
								<text>{{item.sex===0?'公':'母'}}</text>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								毛色：
							</view>
							<view class="form-input">
								<text>{{item.hair_color}}</text>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="item.category==4">初生重：</text>
								<text v-else>入栏体重：</text>
							</view>
							<view class="form-input">
								<text>{{item.weight}}</text>
							</view>
							<view class="form-unit">kg</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="item.category==4">体高：</text>
								<text v-else>入栏体高：</text>
							</view>
							<view class="form-input">
								<text>{{item.height}}</text>
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="item.category==4">体斜：</text>
								<text v-else>入栏体斜：</text>
							</view>
							<view class="form-input">
								<text>{{item.skew}}</text>
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="item.category==4">胸围：</text>
								<text v-else>入栏胸围：</text>
							</view>
							<view class="form-input">
								<text>{{item.bust}}</text>
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="item.category==4">管围：</text>
								<text v-else>入栏管围：</text>
							</view>
							<view class="form-input">
								<text>{{item.vessel_length}}</text>
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list" v-if="item.category!=4">
							<view class="form-title">
								牛角描述：
							</view>
							<view class="form-input">
								<text>{{item.is_have_horn===0?'有牛角':'无牛角'}}</text>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								头部照片：
							</view>
							<view class="form-input">
								<view class="img-container">
									<image class="img" :src="item.head_img_path" :data-src="item.head_img_path" @tap="previewImage" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								臀部照片：
							</view>
							<view class="form-input">
								<view class="img-container">
									<image class="img" :src="item.hips_img_path" :data-src="item.hips_img_path" @tap="previewImage" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								左侧照片：
							</view>
							<view class="form-input">
								<view class="img-container">
									<image class="img" :src="item.left_img_path" :data-src="item.left_img_path" @tap="previewImage" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								右侧照片：
							</view>
							<view class="form-input">
								<view class="img-container">
									<image class="img" :src="item.right_img_path" :data-src="item.right_img_path" @tap="previewImage" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="form-list" v-if="item.category==3">
							<view class="form-title">
								育肥时间：
							</view>
							<view class="form-input">
								<text>{{item.fatten_time}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==3">
							<view class="form-title">
								日增重预期：
							</view>
							<view class="form-input">
								<text>{{item.daily_gain_expect}}</text>
							</view>
							<view class="form-unit">kg</view>
						</view>
						<view class="form-list" v-if="item.category==3">
							<view class="form-title">
								出栏体重预期：
							</view>
							<view class="form-input">
								<text>{{item.out_weight_expect}}</text>
							</view>
							<view class="form-unit">kg</view>
						</view>
						<view class="form-list" v-if="item.category==2">
							<view class="form-title">
								已繁殖胎次：
							</view>
							<view class="form-input">
								<text>{{item.birth_count}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==2">
							<view class="form-title">
								现生产状态：
							</view>
							<view class="form-input">
								<text>{{item.birth_status}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==2">
							<view class="form-title">
								乳房健康状态：
							</view>
							<view class="form-input">
								<text>{{item.breast_health_status}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category!=4">
							<view class="form-title">
								饲养方式：
							</view>
							<view class="form-input">
								<text>{{item.feeding_mode}}</text>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="item.category==4">出生健康评估：</text>
								<text v-else>健康评估：</text>
							</view>
							<view class="form-input">
								<text>{{item.health_evaluation}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==4">
							<view class="form-title">
								犊牛饲养方式：
							</view>
							<view class="form-input">
								<text>{{item.calf_feeding_mode}}</text>
							</view>
						</view>
						<view class="form-list" v-if="item.category==4">
							<view class="form-title">
								母牛饲养方式：
							</view>
							<view class="form-input">
								<text>{{item.cow_feeding_mode}}</text>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				dataList: [], //牛列表List
				id: '' //详情数据id
			};
		},
		mounted() {
			let query = this.$Route.query
			this.id = query.id
			this.getNiuDetail()
		},
		methods: {
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop;
			},
			async getNiuDetail() {
				const {
					id
				} = this
				const res = await this.$http.request({
					url: "/niu/getNiuDetail",
					method: "post",
					data: {
						id: id
					}
				});
				if (res.status === "E") {
					errorToast(res.msg);
					return false;
				}
				const resData=res.data
				this.dataList = resData;
			},
			previewImage: function(e) {
				const current = e.target.dataset.src
				const imageList=[current]
				uni.previewImage({
					current: current,
					urls: imageList
				})
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
	}
</style>
