<template>
	<view class="foot-pop-content">
		<view class="foot-pop" :class="{show:isPopShow}">
			<view class="mask" @tap="closePop"></view>
			<view class="pop-container">
				<view class="pop-list" v-for="(item,index) in dataList" :key="index" @tap="actionTap(index)">
					<image src="../../static/logo.png" mode="scaleToFill" class="img"></image>
					<text class="title">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			category: {
				type: [String, Number],
				default: 1
			},
			isPopShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dataList: []
			}
		},
		watch: {
			category(newVal, oldVal) {
				this.getMenu(newVal)
			}
		},
		mounted() {
			this.getMenu(this.category)
		},
		methods: {
			async getMenu(category) {
				category=Number(category)
				const res = await this.$http.request({
					loading: false,
					url: "/actionMenu/getActionMenuList",
					method: "get",
					data: {category:category}
				});
				if (res.status === "E") {
					this.errorToast(res.msg);
					return false;
				}
				const resData = res.data;
				this.dataList=resData
			},
			actionTap(index) {
				this.$emit('action', {
					path:this.dataList[index].path,
					actionMenuId:this.dataList[index].id,
					actionMenuName:this.dataList[index].name,
				})
			},
			closePop() {
				this.$emit('close', true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.foot-pop {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		box-sizing: border-box;
		z-index: -1;

		.mask {
			position: fixed;
			z-index: 999;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
			transition: all 0.3s;
			opacity: 0;
		}

		.pop-container {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999999;
			background-color: #fff;
			transition: all 0.3s;
			transform: translateY(100%);
			display: flex;
			flex-wrap: wrap;

			.pop-list {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 20rpx;

				.img {
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
				}

				.title {
					font-size: $uni-font-size-base;
					line-height: 2*$uni-font-size-base;
				}
			}
		}

		&.show {
			z-index: 999999;

			.mask {
				opacity: 1;
			}

			.pop-container {
				transform: translateY(0);
			}
		}
	}
</style>
