<template>
	<view class="content">
		<uni-nav-bar left-icon="arrowleft" :title="title" color="#09BB07" @clickLeft="back" />
		<view class="records">
			<view class="records-container" v-if="recordsLen>0">
				<view class="records-head">
					<uni-grid :column="listLen" :square="isSquare">
						<uni-grid-item v-for="(item,index) in headList" :key="index">
							<text class="text">{{item}}</text>
						</uni-grid-item>
					</uni-grid>
				</view>
				<view class="records-list">
					<uni-grid :column="listLen" :square="isSquare" v-for="(record,index) in recordsList" :key="index">
						<template v-if="actionMenuCode==='pz'||actionMenuCode==='hy'">
							<uni-grid-item>
								<text class="text">{{index+1}}</text>
							</uni-grid-item>
						</template>
						<uni-grid-item>
							<text class="text">{{record.date}}</text>
						</uni-grid-item>
						<template v-if="actionMenuCode==='zpz'">
							<uni-grid-item>
								<text class="text">{{record.name}}</text>
							</uni-grid-item>
						</template>
						<template v-if="actionMenuCode==='cz'">
							<uni-grid-item>
								<text class="text">{{record.weight}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.increase_weight}}</text>
							</uni-grid-item>
						</template>
						<template v-if="actionMenuCode==='fs'">
							<uni-grid-item>
								<text class="text">{{record.house}}</text>
							</uni-grid-item>
						</template>
						<template v-if="actionMenuCode==='pz'">
							<uni-grid-item>
								<text class="text">{{record.bullno}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.animal_breeder}}</text>
							</uni-grid-item>
						</template>
						<template v-if="actionMenuCode==='hy'">
							<uni-grid-item>
								<text class="text">{{record.childbirth_date}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.pregnancy_days}}</text>
							</uni-grid-item>
						</template>
						<template v-if="actionMenuCode==='my'">
							<uni-grid-item>
								<text class="text">{{record.vaccines_name}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.vaccines_dose}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.inoculation}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.vaccine_factory}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.vaccine_batch}}</text>
							</uni-grid-item>
						</template>
						<template v-if="actionMenuCode==='jy'">
							<uni-grid-item>
								<text class="text">{{record.quarantine}}</text>
							</uni-grid-item>
						</template>
						<template v-if="actionMenuCode==='zb'">
							<uni-grid-item>
								<text class="text">{{record.disease_type}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.concurrent_symptom}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.disease_reason}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.treatment_plan}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.veterinary_name}}</text>
							</uni-grid-item>
							<uni-grid-item>
								<text class="text">{{record.treatment_result}}</text>
							</uni-grid-item>
						</template>
						<uni-grid-item v-if="actionMenuCode!=='cz'&&actionMenuCode!=='zb'">
							<text class="text">{{record.description}}</text>
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
			<view class="kong" v-else>
				暂无记录
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
				isSquare: false,
				handleUserId: '',
				niuId: '',
				recordsList: [],
				recordsLen: 0,
				title: '',
				actionMenuId: '', //记录类型id
				actionMenuName: '', //记录类型name
				actionMenuCode: '', //记录类型code
				headList: ['操作人', '操作时间', '位置']
			}
		},
		computed: {
			listLen() {
				return this.headList.length
			}
		},
		mounted() {
			const _this = this
			const userInfo = JSON.parse(uni.getStorageSync('userinfo'));
			this.handleUserId = userInfo.uid;
			let query = this.$Route.query
			this.niuId = query.niuId
			this.actionMenuId = query.actionMenuId
			this.actionMenuName = query.actionMenuName
			this.actionMenuCode = query.actionMenuCode
			this.title = this.actionMenuName + '记录'
			this.getRecordsList()
		},
		methods: {
			async getRecordsList() {
				const {
					handleUserId,
					niuId,
					actionMenuId
				} = this
				const params = {
					niu_id: niuId,
					handle_user_id: handleUserId,
					type_id: actionMenuId
				}
				console.log(params)
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
				this.recordsLen = this.recordsList.length
				this.recordsList.forEach(function(val) {
					val.handle_time = formatDateTime(new Date(val.handle_time).getTime())
				})
				let newArray = []
				switch (this.actionMenuCode) {
					case 'zpz':
						newArray = ['转品种日期', '转成品种','转品种说明']
						break;
					case 'cz':
						newArray = ['称重日期', '称重重量(公斤)', '比上次增重(公斤)']
						break;
					case 'fs':
						newArray = ['入舍日期', '圈舍名称', '入舍说明']
						break;
					case 'pz':
						newArray = ['第几次','配种日期', '种公牛号', '配种员','配种说明']
						break;
					case 'hy':
						newArray = ['第几次','怀孕日期', '预产期', '妊娠天数（天）','怀孕说明']
						break;
					case 'my':
						newArray = ['免疫日期','疫苗名称', '剂量', '接种方式','疫苗厂家','疫苗批次','免疫说明']
						break;
					case 'jy':
						newArray = ['检疫日期', '检疫项目','检疫说明']
						break;
					case 'zb':
						newArray = ['治病日期', '疾病类型','并发症状','发病原因','治疗方案','兽医姓名','治病结果']
						break;
					case 'cd':
						newArray = ['产犊日期', '产犊说明']
						break;
					case 'lc':
						newArray = ['流产日期', '流产说明']
						break;
				}
				newArray = newArray.concat(this.headList)
				this.headList = newArray
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
			back() {
				this.$Router.back(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100% - 45px);

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
			
			.kong {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 40rpx;
			}
		}
	}
</style>
