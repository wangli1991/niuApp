<template>
	<view class="content">
		<uni-status-bar />
		<view class="home-header">
			<view class="logo">
				<image class="img" src="../../static/logo.png" mode="scaleToFill" lazy-load="true"></image>
			</view>
			<view class="search">
				<input type="text" value="" disabled />
				<uni-icons type="search" class="search-icon" :size="searchIconSize" color="#32CD32"></uni-icons>
			</view>
			<view class="action">
				<uni-icons type="plusempty" class="action-icon" :size="actionIconSize" color="#fff"></uni-icons>
			</view>
		</view>
		<view class="home-container">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">
				<view class="banner">
					<uni-swiper-dot :info="bannerList" :current="current" mode="round" :dots-styles="dotsStyle">
						<swiper class="swiper-box" @change="change" circular>
							<swiper-item v-for="(item, index) in bannerList" :key="index">
								<view class="swiper-item">
									<image class="img" :src="item.imgPath" mode="aspectFill" />
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>
				<view class="menu">
					<view class="menu-container">
						<view class="menu-item" v-for="(item,index) in menuList" :key="index">
							<router-link :to="item.url">
								<image class="img" :src="item.imgPath" mode="scaleToFill" lazy-load="true"></image>
								<view class="title">
									{{item.name}}
								</view>
							</router-link>
						</view>
					</view>
				</view>
				<view class="product">
					<view class="product-item" v-for="(num,index) in productList" :key="index">
						<view class="product-img">
							<image class="img" src="../../static/logo.png" mode="scaleToFill" lazy-load="true"></image>
						</view>
						<view class="product-txt">
							<view class="title">
								商品名称商品名称商品名称商品名称商品名称
							</view>
							<view>
								<view class="type">
									饲草饲料/浓缩饲料
								</view>
								<view class="source">
									自营
								</view>
							</view>
							<view class="footer">
								<view class="price">
									￥<text>1000.2</text>
								</view>
								<view class="account">
									<text>100</text>人付款
								</view>
							</view>
						</view>
					</view>
					<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="back-top" @tap="backTop" v-if="isBacktopShow">
			<text class="iconfont icon-backtop"></text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar.vue"
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	export default {
		components: {
			uniStatusBar,
			uniSwiperDot
		},
		data() {
			return {
				scrollTop: 100,
				old: {
					scrollTop: 0
				},
				isBacktopShow:false,
				bannerList: [{
						imgPath: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
					},
					{
						imgPath: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
					},
					{
						imgPath: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
					}
				],
				dotsStyle: {
					backgroundColor: 'rgba(255,255,255,.5)',
					border: 'rgba(255,255,255,.5)',
					selectedBackgroundColor: '#09BB07',
					selectedBorder: '1px solid #09BB07'
				},
				current: 0,
				searchIconSize: 0,
				actionIconSize: 0,
				menuList: [],
				productList: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0
			}
		},
		onLoad() {
			this.initData();
		},
		onPullDownRefresh() {
			console.log(0)
			this.setListData();
		},
		onReachBottom() {
			console.log(1)
		},
		mounted() {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					let format = res.windowWidth / 750
					_this.searchIconSize = 44 * format
					_this.actionIconSize = 50 * format
				}
			})
			this.getMenu()
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
				this.isBacktopShow=true
			},
			upper(e) {
				console.log('到顶了')
				this.isBacktopShow=false
				this.initData();
			},
			lower(e) {
				console.log('到底了')
				if (this.max > 40) {
					this.loadMoreText = "没有更多数据了!"
					return;
				}
				this.showLoadMore = true;
				setTimeout(() => {
					this.setListData();
				}, 300);
			},
			backTop(){
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			getMenu() {
				let menuList = [{
						name: '我的牧场',
						imgPath: '../../static/logo.png',
						url:'/pages/ranch/ranch'
					},
					{
						name: '新闻资讯',
						imgPath: '../../static/logo.png',
						url:'/pages/news/news'
					},
					{
						name: '参考价格',
						imgPath: '../../static/logo.png'
					},
					{
						name: '平台数据',
						imgPath: '../../static/logo.png'
					},
					{
						name: '交易中心',
						imgPath: '../../static/logo.png'
					},
					{
						name: '养殖技术',
						imgPath: '../../static/logo.png'
					},
					{
						name: '专家在线',
						imgPath: '../../static/logo.png'
					}
				]
				this.menuList=menuList
			},
			initData() {
				setTimeout(() => {
					this.max = 0;
					this.productList = [];
					let data = [];
					this.max += 10;
					for (var i = this.max - 9; i < this.max + 1; i++) {
						data.push(i)
					}
					this.productList = this.productList.concat(data);
				}, 300);
			},
			setListData() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.productList = this.productList.concat(data);
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 3000)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100%);
		display: flex;
		flex-direction: column;

		.home-header {
			width: 100%;
			display: flex;
			padding: 20rpx 20rpx;
			background-color: $uni-bg-color-green;

			.logo {
				width: 60rpx;
				height: 60rpx;

				.img {
					width: 60rpx;
					height: 60rpx;
				}
			}

			.search {
				flex: 1;
				margin: 0 20rpx;
				position: relative;

				input {
					height: 60rpx;
					background-color: #fff;
					border-radius: 28rpx;
				}

				.search-icon {
					position: absolute;
					right: 20rpx;
					top: 8rpx;
					line-height: 1;
				}
			}

			.action {
				margin-top: 5rpx;

				.action-icon {
					line-height: 1;
				}
			}
		}

		.home-container {
			flex: 1;
			overflow: hidden;

			.scroll-Y {
				height: 100%;
			}

			.banner {
				.swiper-box {
					height: 350rpx;

					.img {
						width: 100%;
						height: 350rpx;
					}
				}
			}

			.menu {
				padding: 20rpx 0;
				background-color: #fff;
				margin-top: 30rpx;

				.menu-container {
					margin-top: -30rpx;
					display: flex;
					flex-wrap: wrap;

					.menu-item {
						width: 20%;
						text-align: center;
						line-height: 0;
						margin-top: 30rpx;

						.img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 20rpx;
						}

						.title {
							font-size: $uni-font-size-base;
							line-height: 1;
							padding-top: 15rpx;
							color: #666;
						}
					}
				}
			}

			.product {
				.product-item {
					margin-top: $uni-spacing-col-base;
					display: flex;
					background-color: #fff;
					padding: $uni-spacing-row-base;

					.product-img {
						width: 220rpx;
						height: 300rpx;

						.img {
							width: 220rpx;
							height: 300rpx;
						}
					}

					.product-txt {
						padding-left: 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.title {
							font-size: $uni-font-size-lg;
							line-height: 40rpx;
							color: #333;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.type {
							font-size: $uni-font-size-sm;
							line-height: 30rpx;
							color: #666;
						}

						.source {
							font-size: $uni-font-size-sm;
							line-height: 30rpx;
							color: #666;
							margin-top: 10rpx;
						}

						.footer {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.price {
								font-size: $uni-font-size-base;
								color: #f00;
								line-height: 1;

								text {
									font-family: Arial;
									font-size: 40rpx;
								}
							}

							.account {
								font-size: $uni-font-size-base;
								line-height: 1;
								color: #666;

								text {
									font-family: Arial;
								}
							}
						}
					}
				}
			}
		}
		.back-top{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			border: 2rpx solid $uni-text-color-active;
			position: fixed;
			right: 25rpx;
			bottom: 200rpx;
			z-index: 999;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			.icon-backtop{
				font-size: 70rpx;
				vertical-align: middle;
				color: $uni-text-color-active;
			}
		}
	}
</style>
