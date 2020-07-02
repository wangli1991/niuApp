<template>
	<view class="content">
		<view class="ranch-tabs">
			<view class="item" :class="{active:currentCategory===index}" v-for="(item,index) in categoryList" :key="index" @tap="categoryTap(index)">
				{{item.name}}
			</view>
		</view>
		<view class="ranch-container">
			<swiper class="swiper" :current="currentCategory" @change="categoryChange" @transition="categoryTransition"
			 @animationfinish="categoryAnimationfinish">
				<swiper-item v-for="(item,index) in categoryList" :key="index" class="swiper-item">
					<view class="ranch-header">
						<view class="header-item sort" @tap="sortTap">
							<image class="img" src="../../static/icon_sort.png" mode="scaleToFill" v-if="sortType==='none'"></image>
							<image class="img" src="../../static/icon_sort_asc.png" mode="scaleToFill" v-else-if="sortType==='asc'"></image>
							<image class="img" src="../../static/icon_sort_desc.png" mode="scaleToFill" v-else="sortType==='desc'"></image>
							<text>月龄</text>
						</view>
						<view class="header-item search">
							<input type="text" value="" placeholder="请输入档案登记号" />
						</view>
						<view class="header-item">
							共{{count}}只
						</view>
						<view class="header-item">
							<text class="iconfont icon-shaixuan"></text>
							<text>筛选</text>
						</view>
					</view>
					<view class="ranch-box">
						<scroll-view enableBackToTop="true" scroll-y class="scroll-Y" :lower-threshold="lowerHeight" @scrolltolower="loadMore" v-if="dataList.length>0">
							<view class="ranch-item" v-for="(item,index) in dataList" :key="index">
								<view class="item-container">
									<view class="container">
										<view class="txt" @tap="popShow(index)">
											<view class="head">
												<view class="title">
													{{item.variety}}
												</view>
												<view class="no">
													{{item.archivesno}}
												</view>
											</view>
											<view class="age">
												{{item.sex}}
											</view>
										</view>
										<view class="more" @tap="goDetai(index)">
											<uni-icons class="more-icon" type="arrowright" :size="moreIconSize"></uni-icons>
										</view>
									</view>
									<view class="tips">
										<text>2天后接种细小病毒灭活苗最佳</text>
										<text class="more">了解此疫苗</text>
									</view>
								</view>
							</view>
							<view class="loading-more" v-if="isShowLoadMore">
								<text class="loading-more-text">{{loadMoreText}}</text>
							</view>
						</scroll-view>
						<view class="kong" v-else>
							<cover-image class="img" src="../../static/kong.gif"></cover-image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<uni-foot-pop :category="category" :is-pop-show="isPopShow" @close="popClose" @action="popAction"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortType: 'none', //当前排序类型
				categoryList: [], //分类List
				category:'',//选中分类
				currentCategory: 0, //选中分类 index
				moreIconSize: 30, //更多图标字体大小
				pageSize: 10, //每次加载数据数量
				pageNo: 0, //已加载分页数
				dataId:'',//选中列表id
				dataList: [], //牛列表List
				count: 0, //分类下牛数量
				maxCount: 0, //已加载条数
				lowerHeight: 0, //距底部多远时触发 scrolltolower 事件
				loadMoreText: "加载中...",
				isShowLoadMore: false,
				uid: "",
				isPopShow:false//是否显示底部弹窗
			}
		},
		mounted() {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					let format = res.windowWidth / 750
					_this.moreIconSize = 50 * format
					_this.lowerHeight = 50 * format
				}
			})
			uni.getStorage({
				key: "userinfo",
				success: function(res) {
					const userInfo = JSON.parse(res.data);
					_this.uid = userInfo.uid;
				}
			})
			this.maxCount = this.pageSize
			this.getCategoryList()
		},
		methods: {
			categoryTap(val) {
				if (val == this.currentCategory) {
					return false
				}
				this.currentCategory = val
			},
			categoryChange(e) {
				this.currentCategory = e.detail.current
				this.initLoadMore()
				this.category = this.categoryList[e.detail.current].id
				this.initDataList()
			},
			categoryTransition(e) {},
			categoryAnimationfinish(e) {},
			async getCategoryList() {
				const res = await this.$http.request({
					loading: false,
					url: "/niu/getCategoryList",
					method: "get",
					data: {}
				});
				const resData = res.data;
				this.categoryList = resData;
				this.category = this.categoryList[this.currentCategory].id
				this.initDataList()
			},
			async initDataList() {
				const {
					uid,
					pageSize,
					pageNo
				} = this
				const res = await this.$http.request({
					loading: false,
					url: "/niu/getNiuList",
					method: "post",
					data: {
						category: this.category,
						masterid: uid,
						page_size: pageSize,
						page_no: pageNo
					}
				});
				uni.stopPullDownRefresh();
				if (res.status === "E") {
					this.errorToast(res.msg);
					return false;
				}
				const resData = res.data;
				this.count = resData.count
				this.dataList = resData.data;
			},
			async getDataList() {
				const {
					uid,
					pageSize,
					pageNo
				} = this
				const res = await this.$http.request({
					loading: false,
					url: "/niu/getNiuList",
					method: "post",
					data: {
						category: this.category,
						masterid: uid,
						page_size: pageSize,
						page_no: pageNo
					}
				});
				if (res.status === "E") {
					this.errorToast(res.msg);
					return false;
				}
				const resData = res.data;
				this.dataList = this.dataList.concat(resData.data);
			},
			goDetai(index) {
				this.dataId=this.dataList[index].id
				this.$Router.push({
					path: "/pages/ranch/ranch-detail",
					query: {
						id: this.dataId
					}
				});
			},
			popAction(e){
				this.$Router.push({
					path: e,
					query: {
						id: this.dataId,
						category: this.category
					}
				});
			},
			popShow(index) {
				this.dataId=this.dataList[index].id
				this.isPopShow=true
			},
			popClose(e){
				if(e){
					this.isPopShow=false
				}
			},
			sortTap() {
				let sortType = this.sortType
				if (sortType == 'none') {
					sortType = 'asc'
				} else if (sortType == 'asc') {
					sortType = 'desc'
				} else {
					sortType = 'none'
				}
				this.sortType = sortType
			},
			onNavigationBarButtonTap(e) { //导航栏右上角 牛只录入点击事件
				this.$router.push({
					name: 'infoEnter'
				})
			},
			onPullDownRefresh() {
				this.initLoadMore()
				this.getCategoryList()
			},
			loadMore() {
				this.isShowLoadMore = true
				if (this.maxCount >= this.count) {
					return;
				}
				this.maxCount += this.pageSize
				this.pageNo++
				if (this.maxCount >= this.count) {
					this.loadMoreText = "没有更多数据了!"
				}
				this.getDataList()
			},
			initLoadMore() {
				this.pageNo = 0
				this.maxCount = this.pageSize
				this.loadMoreText = "加载中...";
				this.isShowLoadMore = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100%);
		padding-top: $uni-spacing-col-base;
		display: flex;
		flex-direction: column;

		.ranch-tabs {
			background-color: #fff;
			display: flex;

			.item {
				flex: 1;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 80rpx;
				position: relative;
				text-align: center;

				&.active {
					color: $uni-text-color-active;

					&::after {
						content: "";
						width: 40rpx;
						height: 2rpx;
						background-color: $uni-text-color-active;
						position: absolute;
						left: 50%;
						bottom: 0;
						margin-left: -20rpx;
					}
				}
			}
		}

		.ranch-container {
			flex: 1;

			.swiper {
				height: calc(100%);

				.swiper-item {
					display: flex;
					flex-direction: column;

					.ranch-header {
						display: flex;
						background-color: rgba(9, 187, 7, .2);
						padding: 6rpx 5rpx;

						.header-item {
							font-size: $uni-font-size-base;
							line-height: 40rpx;
							padding: 0 10rpx;
							display: flex;
							align-items: center;
						}

						.sort {
							.img {
								width: 26rpx;
								height: 30rpx;
							}
						}

						.search {
							flex: 1;
							background-color: #fff;
							border-radius: 20rpx;
							padding: 5rpx 20rpx;
							margin-left: 10rpx;

							input {
								display: block;
								font-size: $uni-font-size-sm;
								line-height: 1;
								height: 30rpx;
								min-height: 30rpx;
							}
						}
					}

					.ranch-box {
						flex: 1;
						overflow: hidden;

						.scroll-Y {
							height: calc(100%);

							.ranch-item {
								padding-top: $uni-spacing-col-base;

								.item-container {
									background-color: #fff;
									padding: $uni-spacing-row-base;

									.container {
										position: relative;
										display: flex;
										justify-content: space-between;
										align-items: center;
										.txt{
											flex: 1;
											.head {
												display: flex;
												justify-content: space-between;
												
												.title {
													font-size: $uni-font-size-base;
													line-height: 1;
												}
											
												.no {
													font-size: $uni-font-size-base;
													line-height: 1;
													font-family: Arial;
												}
											}
										}

										.age {
											font-size: $uni-font-size-base;
											line-height: 1;
											margin-top: 35rpx;
										}

										.more {
											width: 100rpx;
											text-align: center;
											line-height: 1;

											.more-icon {
												line-height: 1;
											}
										}
									}

									.tips {
										margin-top: 30rpx;
										background-color: $uni-bg-color;
										border-radius: 10rpx;
										display: flex;
										font-size: $uni-font-size-sm;
										line-height: $uni-font-size-sm+20rpx;
										padding: 0 10rpx;
										color: $uni-text-color-tips;
										display: flex;
										justify-content: space-between;

										.more {
											color: $uni-text-color-link;
										}
									}
								}
							}

							.loading-more {
								display: flex;
								align-items: center;
								justify-content: center;
								height: 100rpx;

								.loading-more-text {
									font-size: 28rpx;
									color: #999;
									line-height: 1;
								}
							}
							
						}
						.kong{
							width: 100%;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							background-color: #fbfbfb;
							.img{
								width: 100%;
								height: auto;
							}
						}
					}
				}
			}
		}
	}

</style>
