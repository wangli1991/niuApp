<template>
	<view class="content">
		<view class="form-box">
			<scroll-view scroll-y="true" class="scroll-Y" @scroll="scroll">
				<view class="form-container">
					<view class="form-list">
						<view class="form-title">
							牛分类
							<text class="require">*</text>：
						</view>
						<view class="form-input">
							<picker mode="selector" :range="categoryList" @change="categoryChange">
								<input type="text" :value="categoryVal" class="input" placeholder="请选择牛分类" disabled />
							</picker>
						</view>
						<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
					</view>
					<block v-if="currentCategory==0">
						<view class="form-list">
							<view class="form-title">
								档案登记号
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="form-input" placeholder="请输入档案登记号" v-model="archivesNo" />
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								种公牛站编号
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="form-input" placeholder="请输入种公牛站编号" v-model="stationNo" />
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								种公牛编号
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="form-input" placeholder="请输入种公牛编号" v-model="bullNo" />
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								品种代码
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="form-input" placeholder="请输入品种代码" v-model="varietyNo" />
							</view>
						</view>
					</block>
					<block v-else>
						<view class="form-list">
							<view class="form-title">
								<text v-if="currentCategory==2">入栏日期</text>
								<text v-else>出生日期</text>
								<text class="require">*</text>：
							</view>
							<view class="form-input" @click="dateOpen">
								<input type="text" :value="date" class="input" :placeholder="currentCategory==2?'请选择入栏日期':'请选择出生日期'" disabled />
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory!=3">
							<view class="form-title">
								父系编号
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="parentNoList" @change="parentNoChange">
									<input type="text" :value="parentNo" class="input" placeholder="请选择父系编号" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory==1">
							<view class="form-title">
								精液编号
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="form-input" placeholder="请输入精液编号" v-model="semennNo" />
							</view>
						</view>
						<view class="form-list" v-if="currentCategory!=3">
							<view class="form-title">
								母系编号
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="input" placeholder="请输入母系编号" v-model="matriarchalNo" />
							</view>
						</view>
						<view class="form-list" v-if="currentCategory==2">
							<view class="form-title">
								入栏月龄
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="entryAgeList" @change="entryAgeChange">
									<input type="text" :value="entryAge" class="input" placeholder="请选择入栏月龄" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory==2">
							<view class="form-title">
								转入来源
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="sourceList" @change="sourceChange">
									<input type="text" :value="sourceVal" class="input" placeholder="请选择转入来源" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="source==0&&currentCategory==2">
							<view class="form-title">
								来源编号
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="input" placeholder="请输入来源编号" v-model="sourceArchivesno" />
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								品种
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="varietyList" @change="varietyChange">
									<input type="text" :value="variety" class="input" placeholder="请选择品种" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory!=1">
							<view class="form-title">
								性别
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="sexList" @change="sexChange">
									<input type="text" :value="sexVal" class="input" placeholder="请选择性别" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list">
							<view class="form-title">
								毛色
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="hairColorList" @change="hairColorChange">
									<input type="text" :value="hairColor" class="input" placeholder="请选择毛色" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="currentCategory==3">初生重</text>
								<text v-else>入栏体重</text>
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="input" :placeholder="currentCategory==3?'请输入初生重':'请输入入栏体重'" v-model="weight" />
							</view>
							<view class="form-unit">kg</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="currentCategory==3">体高</text>
								<text v-else>入栏体高</text>
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="input" :placeholder="currentCategory==3?'请输入体高':'请输入入栏体高'" v-model="height" />
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="currentCategory==3">体斜</text>
								<text v-else>入栏体斜</text>
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="input" :placeholder="currentCategory==3?'请输入体斜':'请输入入栏体斜'" v-model="skew" />
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="currentCategory==3">胸围</text>
								<text v-else>入栏胸围</text>
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="input" :placeholder="currentCategory==3?'请输入胸围':'请输入入栏胸围'" v-model="bust" />
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="currentCategory==3">管围</text>
								<text v-else>入栏管围</text>
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="input" :placeholder="currentCategory==3?'请输入管围':'请输入入栏管围'" v-model="vesselLength" />
							</view>
							<view class="form-unit">cm</view>
						</view>
						<view class="form-list" v-if="currentCategory!=3">
							<view class="form-title">
								牛角描述
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="isHaveHornList" @change="isHaveHornChange">
									<input type="text" :value="isHaveHornVal" class="input" placeholder="请选择牛角描述" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list">
							<view class="form-title">
								头部照片
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<view class="img-container" v-if="headImgPath">
									<image class="img" :src="headImgPath" @tap="chooseImage(0)" mode="aspectFill"></image>
								</view>
								<uni-icons type="plusempty" :size="actionIconSize" :color="iconColor" @tap="chooseImage(0)" v-else></uni-icons>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								臀部照片
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<view class="img-container" v-if="hipsImgPath">
									<image class="img" :src="hipsImgPath" @tap="chooseImage(1)" mode="aspectFill"></image>
								</view>
								<uni-icons type="plusempty" :size="actionIconSize" :color="iconColor" @tap="chooseImage(1)" v-else></uni-icons>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								左侧照片
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<view class="img-container" v-if="leftImgPath">
									<image class="img" :src="leftImgPath" @tap="chooseImage(2)" mode="aspectFill"></image>
								</view>
								<uni-icons type="plusempty" :size="actionIconSize" :color="iconColor" @tap="chooseImage(2)" v-else></uni-icons>
							</view>
						</view>
						<view class="form-list">
							<view class="form-title">
								右侧照片
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<view class="img-container" v-if="rightImgPath">
									<image class="img" :src="rightImgPath" @tap="chooseImage(3)" mode="aspectFill"></image>
								</view>
								<uni-icons type="plusempty" :size="actionIconSize" :color="iconColor" @tap="chooseImage(3)" v-else></uni-icons>
							</view>
						</view>
						<view class="form-list" v-if="currentCategory==2">
							<view class="form-title">
								育肥时间
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="fattenTimeList" @change="fattenTimeChange">
									<input type="text" :value="fattenTime" class="input" placeholder="请选择育肥时间" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory==2">
							<view class="form-title">
								日增重预期
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="form-input" placeholder="请输入日增重预期" v-model="dailyGainExpect" />
							</view>
							<view class="form-unit">kg</view>
						</view>
						<view class="form-list" v-if="currentCategory==2">
							<view class="form-title">
								出栏体重预期
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<input type="text" class="form-input" placeholder="请输入出栏体重预期" v-model="outWeightExpect" />
							</view>
							<view class="form-unit">kg</view>
						</view>
						<view class="form-list" v-if="currentCategory==1">
							<view class="form-title">
								已繁殖胎次
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="birthCountList" @change="birthCountChange">
									<input type="text" :value="birthCount" class="input" placeholder="请选择已繁殖胎次" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory==1">
							<view class="form-title">
								现生产状态
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="birthStatusList" @change="birthStatusChange">
									<input type="text" :value="birthStatus" class="input" placeholder="请选择现生产状态" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory==1">
							<view class="form-title">
								乳房健康状态
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="breastHealthStatusList" @change="breastHealthStatusChange">
									<input type="text" :value="breastHealthStatus" class="input" placeholder="请选择乳房健康状态" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory!=3">
							<view class="form-title">
								饲养方式
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="feedingModeList" @change="feedingModeChange">
									<input type="text" :value="feedingMode" class="input" placeholder="请选择饲养方式" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list">
							<view class="form-title">
								<text v-if="currentCategory==3">出生健康评估</text>
								<text v-else>健康评估</text>
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="healthEvaluationList" @change="healthEvaluationChange">
									<input type="text" :value="healthEvaluation" class="input" :placeholder="currentCategory==3?'请选择出生健康评估':'请选择健康评估'" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory==3">
							<view class="form-title">
								犊牛饲养方式
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="calfFeedingModeList" @change="calfFeedingModeChange">
									<input type="text" :value="calfFeedingMode" class="input" placeholder="请选择犊牛饲养方式" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
						<view class="form-list" v-if="currentCategory==3">
							<view class="form-title">
								母牛饲养方式
								<text class="require">*</text>：
							</view>
							<view class="form-input">
								<picker mode="selector" :range="cowFeedingModeList" @change="cowFeedingModeChange">
									<input type="text" :value="cowFeedingMode" class="input" placeholder="请选择母牛饲养方式" disabled />
								</picker>
							</view>
							<uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<view class="btn-container">
			<button type="default" class="btn" @tap="subTap">提交</button>
		</view>
		<uni-calendar ref="dateConfirm" :insert="false" :lunar="true" :clearDate="false" @confirm="dateConfirm" />
	</view>
</template>
<script>
	import permision from "@/common/permission.js"
	import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				actionIconSize: 0, //右侧箭头字号
				iconColor: "#666", //右侧箭头颜色
				currentCategory: 0, //牛分类
				categoryVal: '', //选中牛分类
				categoryList: [], //牛分类List
				oldCategoryList: [], //牛分类原始数据List
				archivesNo:'',//种公牛档案登记号
				stationNo:'',//种公牛站编号
				bullNo:'',//种公牛编号
				varietyNo:'',//品种代码
				date: "", //出生日期||入栏日期
				parentNo: "", //父系编号
				parentNoList: [], //父系编号List
				semennNo: "", //精液编号
				matriarchalNo: "", //母系编号
				variety: "", //品种
				varietyList: [], //品种List
				sex: '', //性别代码 0：公 1：母
				sexVal: '', //性别
				sexList: ["公", "母"], //性别List
				hairColor: "", //毛色
				hairColorList: [], //毛色List
				weight: '', //入栏体重
				height: '', //入栏体高
				skew: '', //入栏体斜
				bust: '', //入栏胸围
				vesselLength: "", //入栏管围
				isHaveHorn: '', //牛角描述 0：有 1：无
				isHaveHornVal: '', //牛角描述
				isHaveHornList: ["有", "无"], //牛角描述List
				birthCount: "", //已繁殖胎次
				birthCountList: [], //已繁殖胎次List
				birthStatus: "", //现生产状态
				birthStatusList: [], //现生产状态List
				breastHealthStatus: "", //乳房健康状态
				breastHealthStatusList: [], //乳房健康状态List
				feedingMode: "", //饲养方式
				feedingModeList: [], //饲养方式List
				healthEvaluation: "", //健康评估
				healthEvaluationList: [], //健康评估List
				entryAge: "", //入栏月龄
				entryAgeList: [], //入栏月龄List
				source: "", //转入来源 0:系统内 1:外部购买
				sourceVal: "", //转入来源
				sourceList: ["系统内", "外部购买"], //转入来源List
				sourceArchivesno: '', //来源编号
				fattenTime: "", //育肥时间
				fattenTimeList: [], //育肥时间List
				dailyGainExpect: '', //日增重预期
				outWeightExpect: '', //出栏体重预期
				calfFeedingMode: "", //犊牛饲养方式
				calfFeedingModeList: [], //犊牛饲养方式List
				cowFeedingMode: "", //母牛饲养方式
				cowFeedingModeList: [], //母牛饲养方式List
				headImgPath: '', //头部照片src
				hipsImgPath: '', //臀部照片src
				leftImgPath: '', //左侧照片片src
				rightImgPath: '', //右侧照片src
				imageFiles: [], //图片文件列表
				imageList: [], //图片列表
				uid: '',//用户id
				poiAddress:'',//当前定位地点
				poiName:'',//当前定位名称
				poiLongitude:0,//当前经度
				poiLatitude:0//当前纬度
			};
		},
		computed: {},
		mounted() {
			let _this = this;
			uni.getSystemInfo({
				success: function(res) {
					let format = res.windowWidth / 750;
					_this.actionIconSize = 40 * format;
				}
			});
			const userInfo = JSON.parse(uni.getStorageSync('userinfo'));
			this.uid = userInfo.uid;
			this.getCategoryList()
			this.getParentNoList()
			this.getVarietyList();
			this.getHairColorList();
			this.getBirthCountList();
			this.getBirthStatusList();
			this.getBreastHealthStatusList();
			this.getFeedingModeList();
			this.getHealthEvaluationList();
			this.getEntryAgeList();
			this.getFattenTimeList();
			this.getCalfFeedingModeList();
			this.getCowFeedingModeList();
			this.getLocation()
		},
		methods: {
			async subTap() {
				this.getLocation()
				if (this.currentCategory == 1) {
					this.sex = 1
				}
				const {
					uid,
					currentCategory,
					oldCategoryList,
					archivesNo,
					stationNo,
					bullNo,
					varietyNo,
					date,
					parentNo,
					semennNo,
					matriarchalNo,
					variety,
					sex,
					hairColor,
					weight,
					height,
					skew,
					bust,
					vesselLength,
					isHaveHorn,
					headImgPath,
					hipsImgPath,
					leftImgPath,
					rightImgPath,
					birthCount,
					birthStatus,
					breastHealthStatus,
					entryAge,
					source,
					sourceArchivesno,
					fattenTime,
					dailyGainExpect,
					outWeightExpect,
					feedingMode,
					calfFeedingMode,
					cowFeedingMode,
					healthEvaluation,
					poiAddress,
					poiName,
					poiLongitude,
					poiLatitude
				} = this;
				const category=oldCategoryList[currentCategory].id
				let params = {
					masterid: uid,
					category: category,
					archivesno:archivesNo,
					stationno:stationNo,
					bullno:bullNo,
					varietyno:varietyNo,
					date: date,
					parentno: parentNo,
					semenno: semennNo,
					matriarchalno: matriarchalNo,
					variety: variety,
					sex: Number(sex),
					hair_color: hairColor,
					weight: Number(weight),
					height: Number(height),
					skew: Number(skew),
					bust: Number(bust),
					vessel_length: Number(vesselLength),
					is_have_horn: Number(isHaveHorn),
					head_img_path: headImgPath,
					hips_img_path: hipsImgPath,
					left_img_path: leftImgPath,
					right_img_path: rightImgPath,
					birth_count: birthCount,
					birth_status: birthStatus,
					breast_health_status: breastHealthStatus,
					feeding_mode: feedingMode,
					health_evaluation: healthEvaluation,
					entry_age: entryAge,
					source: Number(source),
					source_archivesno: sourceArchivesno,
					fatten_time: fattenTime,
					daily_gain_expect: Number(dailyGainExpect),
					out_weight_expect: Number(outWeightExpect),
					calf_feeding_mode: calfFeedingMode,
					cow_feeding_mode: cowFeedingMode,
					poi_address:poiAddress,
					poi_name:poiName,
					poi_longitude:poiLongitude,
					poi_latitude:poiLatitude
				};
				console.log(params);
				const res = await this.$http.request({
					url: "/niu/niuAdd",
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
			getLocation(){
				const _this=this
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: function (res) {
						_this.poiAddress=res.address.province+res.address.city+res.address.district+res.address.street+res.address.streetNum
						_this.poiName=res.address.poiName
						_this.poiLongitude=res.longitude
						_this.poiLatitude=res.latitude
				    }
				});
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop;
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
			parentNoChange(e) {
				this.parentNo = this.parentNoList[e.detail.value];
			},
			varietyChange(e) {
				this.variety = this.varietyList[e.detail.value];
			},
			sexChange(e) {
				this.sex = e.detail.value
				this.sexVal = this.sexList[e.detail.value];
			},
			hairColorChange(e) {
				this.hairColor = this.hairColorList[e.detail.value];
			},
			isHaveHornChange(e) {
				this.isHaveHorn = e.detail.value
				this.isHaveHornVal = this.isHaveHornList[e.detail.value];
			},
			birthCountChange(e) {
				this.birthCount = this.birthCountList[e.detail.value];
			},
			birthStatusChange(e) {
				this.birthStatus = this.birthStatusList[e.detail.value];
			},
			breastHealthStatusChange(e) {
				this.breastHealthStatus = this.breastHealthStatusList[e.detail.value];
			},
			feedingModeChange(e) {
				this.feedingMode = this.feedingModeList[e.detail.value];
			},
			healthEvaluationChange(e) {
				this.healthEvaluation = this.healthEvaluationList[e.detail.value];
			},
			entryAgeChange(e) {
				this.entryAge = this.entryAgeList[e.detail.value];
			},
			sourceChange(e) {
				this.source = e.detail.value
				this.sourceVal = this.sourceList[e.detail.value];
			},
			fattenTimeChange(e) {
				this.fattenTime = this.fattenTimeList[e.detail.value];
			},
			calfFeedingModeChange(e) {
				this.calfFeedingMode = this.calfFeedingModeList[e.detail.value];
			},
			cowFeedingModeChange(e) {
				this.cowFeedingMode = this.cowFeedingModeList[e.detail.value];
			},
			async chooseImage(type) {
				//type 0:头部照片 1:臀部照片 2:左侧照片 3:右侧照片
				uni.chooseImage({
					sizeType: 'compressed',
					count: 1,
					success: (res) => {
						const imgFile = res.tempFiles[0]
						const imgList = res.tempFilePaths
						this.imageFiles = []
						this.imageList = []
						this.imageFiles = this.imageFiles.concat(imgFile);
						this.imageList = this.imageList.concat(imgList);
						console.log(this.imageFiles)
						uni.showLoading({
							title: '加载中'
						});
						this.uploadImg(this.imageFiles, type)
					},
					fail: (err) => {
						if (err['code'] && err.code !== 0 && this.sourcecategory === 2) {
							this.checkPermission(err.code);
						}
						console.log(err)
					}
				})
			},
			async uploadImg(files, type) {
				var formData = new FormData()
				formData.append("file", files[0])
				const res = await this.$axios({
					method: 'post',
					url: '/files_upload/imgUpload',
					data: formData
				}).then((response) => {
					return response.data
				}).catch((error) => {
					return error
				})
				if (res.status === "E") {
					this.errorToast(res.msg);
					uni.hideLoading();
					return false;
				}
				uni.hideLoading();
				const resData = res.data;
				const imgPath = resData[0].path;
				switch (type) {
					case 0:
						this.headImgPath = imgPath
						break;
					case 1:
						this.hipsImgPath = imgPath
						break;
					case 2:
						this.leftImgPath = imgPath
						break;
					case 3:
						this.rightImgPath = imgPath
						break;
				}
			},
			previewImage(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			async getCategoryList() {
				const res = await this.$http.request({
					url: "/niu/getCategoryList",
					method: "get",
					data: {}
				});
				const resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.oldCategoryList=resData
				this.categoryList = dataList;
				this.categoryVal = this.categoryList[this.currentCategory]
			},
			async getParentNoList() {
				const res = await this.$http.request({
					url: "/bull/getBullList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.bullno);
				});
				this.parentNoList = dataList;
			},
			async getVarietyList() {
				const res = await this.$http.request({
					url: "/baseList/getVarietyList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.varietyList = dataList;
			},
			async getHairColorList() {
				const res = await this.$http.request({
					url: "/baseList/getHairColorList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.hairColorList = dataList;
			},
			async getBirthCountList() {
				const res = await this.$http.request({
					url: "/baseList/getBirthCountList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.birthCountList = dataList;
			},
			async getBirthStatusList() {
				const res = await this.$http.request({
					url: "/baseList/getBirthStatusList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.birthStatusList = dataList;
			},
			async getBreastHealthStatusList() {
				const res = await this.$http.request({
					url: "/baseList/getBreastHealthStatusList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.breastHealthStatusList = dataList;
			},
			async getFeedingModeList() {
				const res = await this.$http.request({
					url: "/baseList/getFeedingModeList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.feedingModeList = dataList;
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
			async getEntryAgeList() {
				const res = await this.$http.request({
					url: "/baseList/getEntryAgeList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.entryAgeList = dataList;
			},
			async getFattenTimeList() {
				const res = await this.$http.request({
					url: "/baseList/getFattenTimeList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.fattenTimeList = dataList;
			},
			async getCalfFeedingModeList() {
				const res = await this.$http.request({
					url: "/baseList/getCalfFeedingModeList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.calfFeedingModeList = dataList;
			},
			async getCowFeedingModeList() {
				const res = await this.$http.request({
					url: "/baseList/getFeedingModeList",
					method: "get",
					data: {}
				});
				let resData = res.data;
				let dataList = [];
				resData.forEach(function(val) {
					dataList.push(val.name);
				});
				this.cowFeedingModeList = dataList;
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
