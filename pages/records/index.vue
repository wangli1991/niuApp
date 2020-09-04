<template>
	<view class="records">
		<view class="records-header">
			<view class="text">
				{{variety}}牛
			</view>
			<view class="text">
				No.{{archivesno}}
			</view>
			<view class="text">
				{{age}}
			</view>
			<view class="text">
				{{house}}圈舍
			</view>
			<view class="more" @tap="goDetail">
				<uni-icons class="more-icon" type="arrowright" :size="moreIconSize"></uni-icons>
			</view>
		</view>
		<view class="records-container">
			<view class="records-head">
				<uni-grid :column="5" :square="isSquare">
					<uni-grid-item>
						<text class="text">项目类型</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">项目名称</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">操作人</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">操作日期</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">位置</text>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view class="records-list">
				<uni-grid :column="5" :square="isSquare" v-for="(record,index) in recordsList" :key="index">
					<uni-grid-item>
						<text class="link" @tap="goRecordsList(index)">{{record.type}}</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">{{record.name}}</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">{{record.handle_user}}</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">{{record.handle_time}}</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="link" @tap="goMap(index)">位置</text>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDateTime,
		errorToast
	} from '../../common/util.js'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				moreIconSize: 30, //更多图标字体大小
				isSquare: false,
				handleUserId: '',
				niuId: '',
				recordsList: [],
				variety: '',
				archivesno: '',
				age: '',
				house:''
			}
		},
		mounted() {
			const _this = this
			uni.getSystemInfo({
				success: function(res) {
					let format = res.windowWidth / 750
					_this.moreIconSize = 25 * format
				}
			})
			const userInfo = JSON.parse(uni.getStorageSync('userinfo'));
			this.handleUserId = userInfo.uid;
			let query = this.$Route.query
			this.niuId = query.id
			this.variety = query.variety
			this.archivesno = query.archivesno
			this.age = query.age
			this.house=query.house
			this.getRecordsList()
		},
		methods: {
			async getRecordsList() {
				const {
					handleUserId,
					niuId
				} = this
				const params = {
					niu_id: niuId,
					handle_user_id: handleUserId
				}
				const res = await this.$http.request({
					loading: false,
					url: "/records/getRecordsList",
					method: "post",
					data: params
				});
				if (res.status === "E") {
					errorToast(res.msg);
					return false;
				}
				const resData = res.data;
				this.recordsList = resData.dataList;
				this.recordsList.forEach(function(val) {
					val.handle_time = formatDateTime(new Date(val.handle_time).getTime(), 'date')
				})
			},
			goDetail() {
				this.$Router.push({
					path: "/pages/ranch/ranch-detail",
					query: {
						id: this.niuId
					}
				});
			},
			goMap(index) {
				const {
					poi_name,
					poi_address,
					poi_latitude,
					poi_longitude
				} = this.recordsList[index]
				this.$Router.push({
					path: "/pages/ranch/map",
					query: {
						poi_name: poi_name,
						poi_address: poi_address,
						poi_latitude: poi_latitude,
						poi_longitude: poi_longitude
					}
				});
			},
			goRecordsList(index) {
				const {
					niuId
				} = this
				const {
					type,
					type_id,
					type_code
				} = this.recordsList[index]

				this.$Router.push({
					path: "/pages/records/records-list",
					query: {
						niuId,
						actionMenuName,
						actionMenuId,
						actionMenuCode,
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.records {
		height: calc(100%);
		padding: 0 10rpx;
		background-color: #fbfbfb;
		display: flex;
		flex-direction: column;

		.records-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border: 1px solid #e5e5e5;
			border-radius: 5rpx;
			padding: 0 10rpx;
			background-color: #fff;
			margin-top: 10rpx;

			.text {
				font-size: 18rpx;
				line-height: 40rpx;
			}
		}

		.records-container {
			margin-top: 10rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			flex: 1;

			.records-head {
				flex: 0;
				flex-basis: auto;
			}

			.records-list {
				flex: 1;
			}
		}

		.link {
			color: $uni-text-color-active;
		}
	}
</style>
