<template>
	<view class="content">
		<uni-nav-bar left-icon="arrowleft" :title="actionMenuName" :right-text="actionText" color="#09BB07" @clickLeft="back"
		 @clickRight="actionRecords" />
		<view class="form-box">
			<view class="form-container" v-if="actionMenuCode==='zpz'">
				<view class="form-list">
					<view class="form-title">
						转入品种
						<text class="require">*</text>：
					</view>
					<view class="form-input form-input-picker">
						<picker mode="selector" :range="categoryList" @change="categoryChange">
							<input type="text" :value="categoryVal" class="input" placeholder="请选择转入品种" disabled />
						</picker>
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>入栏日期：</text>
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择入栏日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>入栏体重：</text>
					</view>
					<view class="form-input form-input-unit">
						<input type="text" class="input" placeholder="请输入入栏体重" v-model="weight" />
					</view>
					<view class="form-unit">kg</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>健康评估：</text>
					</view>
					<view class="form-input form-input-picker">
						<picker mode="selector" :range="healthEvaluationList" @change="healthEvaluationChange">
							<input type="text" :value="healthEvaluation" class="input" placeholder="请选择健康评估" disabled />
						</picker>
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='cz'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						称重日期：
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择称重日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>称重重量（公斤）：</text>
					</view>
					<view class="form-input">
						<input type="number" min="1" class="input" placeholder="请输入称重重量" v-model="weight" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>比上次增重（公斤）：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" disabled placeholder="自动计算出重量" v-model="increaseWeight" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='fs'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						入舍日期：
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择入舍日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>入舍名称：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请手动输入入舍名称" v-model="house" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>入舍说明：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可备注入舍说明" v-model="description" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='pz'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>配种日期：</text>
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择配种日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>种公牛号：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入种公牛号" v-model="bullno" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>配种员：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入配种员姓名" v-model="animalBreeder" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>配种说明：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可备注配种信息" v-model="description" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='hy'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>怀孕日期：</text>
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择配种日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>预产期：</text>
					</view>
					<view class="form-input">
						<input type="text" :value="childbirthDate" class="input" placeholder="自动计算预产期" disabled />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>妊娠天数：</text>
					</view>
					<view class="form-input">
						<input type="text" v-model="pregnancyDays" class="input" placeholder="请输入妊娠天数" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>怀孕说明：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可备注怀孕信息" v-model="description" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='my'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>免疫日期：</text>
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择免疫日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>疫苗名称：</text>
					</view>
					<view class="form-input form-input-picker">
						<picker mode="selector" :range="vaccinesList" @change="vaccinesChange">
							<input type="text" :value="vaccinesName" class="input" placeholder="请选择疫苗名称" disabled />
						</picker>
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>剂量：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入剂量信息" v-model="vaccinesDose" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>接种方式：</text>
					</view>
					<view class="form-input form-input-picker">
						<picker mode="selector" :range="inoculationList" @change="inoculationChange">
							<input type="text" :value="inoculation" class="input" placeholder="请选择接种方式" disabled />
						</picker>
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>疫苗厂家：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入疫苗厂家" v-model="vaccineFactory" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>疫苗批次：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入疫苗批次" v-model="vaccineBatch" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text>免疫说明：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入免疫说明" v-model="description" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='jy'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						检疫日期：
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择检疫日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>检疫项目：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="请输入检疫项目名称" v-model="quarantine" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>检疫说明：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可输入检疫说明" v-model="description" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='zb'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						治病日期：
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择治病日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>疾病类型：</text>
					</view>
					<view class="form-input form-input-picker">
						<picker mode="selector" :range="diseaseList" @change="diseaseChange">
							<input type="text" :value="diseaseType" class="input" placeholder="请选择疾病类型" disabled />
						</picker>
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>并发症状：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可输入并发症状" v-model="concurrentSymptom" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>发病原因：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可输入发病原因" v-model="diseaseReason" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>治疗方案：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可输入治疗方案" v-model="treatmentPlan" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>兽医姓名：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可输入兽医姓名" v-model="veterinaryName" />
					</view>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>治病结果：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可输入治病结果" v-model="treatmentResult" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='cd'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						产犊日期：
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择产犊日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>产犊说明：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可备注产犊说明" v-model="description" />
					</view>
				</view>
			</view>
			<view class="form-container" v-if="actionMenuCode==='lc'">
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						流产日期：
					</view>
					<view class="form-input form-input-picker" @click="dateOpen">
						<input type="text" :value="date" class="input" placeholder="请选择流产日期" disabled />
					</view>
					<uni-icons class="form-icon" type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
				</view>
				<view class="form-list">
					<view class="form-title">
						<text class="require">*</text>
						<text>流产说明：</text>
					</view>
					<view class="form-input">
						<input type="text" class="input" placeholder="可备注流产说明" v-model="description" />
					</view>
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
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniStatusBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		formatDateTime,
		errorToast
	} from '../../common/util.js'
	export default {
		data() {
			return {
				actionIconSize: 0, //右侧箭头字号
				iconColor: "#666", //右侧箭头颜色
				currentCategory: 0, //牛分类
				oldCategory: '', //上一页传过来的分类
				categoryIds: [], //牛分类原始数据idList
				categoryVal: '', //选中牛分类
				categoryList: [], //牛分类List
				date: "", //日期
				weight: '', //体重
				healthEvaluation: "", //健康评估
				healthEvaluationList: [], //健康评估List
				niuId: '', //牛列表id
				actionMenuId: '', //记录类型id
				actionMenuName: '', //记录类型name
				actionMenuCode: '', //记录类型code
				actionText: '', //右侧顶部文字
				poiAddress: '', //当前定位地点
				poiName: '', //当前定位名称
				poiLongitude: 0, //当前经度
				poiLatitude: 0, //当前纬度
				oldWeight: 0,
				increaseWeight: '',
				initialValue: null,
				house: '', //入舍名称
				bullno: '', //种公牛号
				animalBreeder: '', //配种员
				pregnancyDays: 280, //妊娠天数
				vaccinesName: "", //疫苗名称
				vaccinesList: [], //疫苗名称List
				inoculation: "", //接种方式
				inoculationList: [], //接种方式List
				vaccinesDose:'',//疫苗剂量
				vaccineFactory:'',//疫苗厂家
				quarantine:'',//检疫项目
				vaccineBatch:'',//疫苗批次
				diseaseType:'',//疾病类型
				diseaseList: [], //疾病类型List
				concurrentSymptom:'',//并发症状
				diseaseReason:'',//发病原因
				treatmentPlan:'',//治疗方案
				veterinaryName:'',//兽医姓名
				treatmentResult:'',//治病结果
				description: '' //记录说明
			}
		},
		computed: {
			childbirthDate() {
				return this.getChildbirth(this.date)
			}
		},
		watch: {
			weight(newVal, oldVal) {
				if (this.actionMenuCode === 'cz') {
					this.increaseWeight = Number(newVal) - Number(this.oldWeight)
					if (this.increaseWeight < 0) {
						this.increaseWeight = 0
					}
				}
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
			const userInfo = JSON.parse(uni.getStorageSync('userinfo'));
			this.date = formatDateTime(new Date(), 'date')
			this.uid = userInfo.uid;
			let query = this.$Route.query
			this.niuId = query.niuId
			this.initialValue = query.data
			this.oldCategory = query.category
			this.actionMenuId = query.actionMenuId
			this.actionMenuName = query.actionMenuName
			this.actionMenuCode = query.actionMenuCode
			this.actionText = this.actionMenuName + '记录'
			this.oldWeight = this.initialValue.weight
			switch (this.actionMenuCode) {
				case 'zpz':
					this.getCategoryList()
					this.getHealthEvaluationList()
					break;
				case 'cz':
					this.getRecordsList()
					break;
				case 'my':
					this.getVaccinesList()
					this.getInoculationList()
					break;
				case 'zb':
					this.getDiseaseList()
					break;
			}
			if(this.actionMenuCode!=='hy'){
				this.pregnancyDays=''
			}
			this.getLocation()
		},
		methods: {
			async subTap() {
				this.getLocation()
				let category = '';
				const {
					niuId,
					currentCategory,
					categoryIds,
					date,
					weight,
					increaseWeight,
					healthEvaluation,
					house,
					bullno,
					animalBreeder,
					childbirthDate,
					pregnancyDays,
					vaccinesName,
					inoculation,
					vaccinesDose,
					vaccineFactory,
					vaccineBatch,
					quarantine,
					diseaseType,
					concurrentSymptom,
					diseaseReason,
					treatmentPlan,
					veterinaryName,
					treatmentResult,
					description,
					actionMenuId,
					actionMenuName,
					actionMenuCode,
					categoryVal,
					oldCategory,
					poiAddress,
					poiName,
					poiLongitude,
					poiLatitude
				} = this
				if (actionMenuCode === 'zpz') {
					category = categoryIds[currentCategory]
				} else {
					category = oldCategory
				}
				let name = ''
				switch (actionMenuCode) {
					case 'zpz':
						name = categoryVal
						break;
					case 'fs':
						name = house
						break;
				}
				const params = {
					niu_id: niuId,
					date: date,
					weight: weight,
					increase_weight: increaseWeight,
					health_evaluation: healthEvaluation,
					house: house,
					bullno: bullno,
					animal_breeder: animalBreeder,
					childbirth_date: childbirthDate,
					pregnancy_days: pregnancyDays,
					vaccines_name:vaccinesName,
					inoculation:inoculation,
					vaccines_dose:vaccinesDose,
					vaccine_factory:vaccineFactory,
					vaccine_batch:vaccineBatch,
					quarantine:quarantine,
					disease_type:diseaseType,
					concurrent_symptom:concurrentSymptom,
					disease_reason:diseaseReason,
					treatment_plan:treatmentPlan,
					veterinary_name:veterinaryName,
					treatment_result:treatmentResult,
					description: description,
					old_category: oldCategory,
					category: category,
					type: actionMenuName,
					type_id: actionMenuId,
					type_code: actionMenuCode,
					name: name,
					poi_address: poiAddress,
					poi_name: poiName,
					poi_longitude: poiLongitude,
					poi_latitude: poiLatitude
				}
				const res = await this.$http.request({
					url: "/niu/niuChange",
					method: "post",
					data: params
				});
				if (res.status === "E") {
					errorToast(res.msg);
					return false;
				}
				errorToast(res.msg, 'success');
				setTimeout(() => {
					this.$Router.replace({
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
			vaccinesChange(e) {
				this.vaccinesName = this.vaccinesList[e.detail.value];
			},
			inoculationChange(e) {
				this.inoculation = this.inoculationList[e.detail.value];
			},
			diseaseChange(e) {
				this.diseaseType = this.diseaseList[e.detail.value];
			},
			async getCategoryList() {
				const res = await this.$http.request({
					url: "/niu/getCategoryList",
					method: "get",
					data: {
						category: this.oldCategory
					}
				});
				const resData = res.data;
				let dataList = [];
				resData.forEach((val) => {
					if (val.id != 1 && val.id != 4 && val.id != this.oldCategory) {
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
					url: "/baseList/getHealthEvaluationList",
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
			async getVaccinesList() {
				const res = await this.$http.request({
					url: "/baseList/getVaccinesList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.vaccinesList = dataList;
			},
			async getInoculationList() {
				const res = await this.$http.request({
					url: "/baseList/getInoculationList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.inoculationList = dataList;
			},
			async getDiseaseList() {
				const res = await this.$http.request({
					url: "/baseList/getDiseaseList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.diseaseList = dataList;
			},
			getLocation() {
				const _this = this
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						_this.poiAddress = res.address.province + res.address.city + res.address.district + res.address.street + res.address
							.streetNum
						_this.poiName = res.address.poiName
						_this.poiLongitude = res.longitude
						_this.poiLatitude = res.latitude
					}
				});
			},
			actionRecords() {
				const {
					niuId,
					actionMenuName,
					actionMenuId,
					actionMenuCode
				} = this
				this.$Router.push({
					path: "/pages/records/records-list",
					query: {
						niuId,
						actionMenuName,
						actionMenuId,
						actionMenuCode,
					}
				});
			},
			back() {
				this.$Router.back(1)
			},
			async getRecordsList() {
				const {
					uid,
					niuId,
					actionMenuId
				} = this
				const params = {
					niu_id: niuId,
					handle_user_id: uid,
					type_id: actionMenuId
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
				this.oldWeight = resData.dataList[0].weight
			},
			getChildbirth(date) {
				const dateList = date.split('-')
				let childbirth, year, month, day;
				year = parseInt(dateList[0])
				month = parseInt(dateList[1])
				day = parseInt(dateList[2])
				let rYear = year,
					rMonth = month - 3,
					rDay = day + 6;
				if (month < 3) {
					rMonth = 9 + month
				} else if (month === 3) {
					rMonth = 12
				} else {
					rYear = year + 1
				}
				rMonth = rMonth > 10 ? rMonth : '0' + rMonth
				rDay = rDay > 10 ? rDay : '0' + rDay
				return rYear + '-' + rMonth + '-' + rDay
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
		position: relative;

		.nav-action {
			position: absolute;
			right: 0;
			top: 0;
			line-height: 30px;
			color: #29a529;
			width: 100px;
			top: -37px;
			z-index: 999;
			font-size: $uni-font-size-base;
			text-align: center;
		}

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
					justify-content: space-between;
					align-items: center;
					height: 100rpx;
					border-bottom: 2rpx solid $uni-border-color;
					position: relative;
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
						font-size: $uni-font-size-base;
						color: $uni-text-color;
						line-height: 40rpx;

						.input {
							font-size: $uni-font-size-base;
							color: $uni-text-color;
							text-align: right;
							line-height: 40rpx;
							height: 40rpx;
							min-height: 40rpx;
						}

						.img-container {
							width: auto;
							padding-top: 10rpx;

							.img {
								width: 80rpx;
								height: 80rpx;
							}
						}
						&.form-input-picker{
							padding-right: 40rpx;
						}
						&.form-input-unit{
						padding-right: 40rpx;
						}
					}
					.form-icon{
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
					.form-unit {
						font-size: $uni-font-size-base;
						color: $uni-text-color;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
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
