<template>
  <view class="content">
    <view class="form-box">
      <scroll-view scroll-y="true" class="scroll-Y" @scroll="scroll">
        <view class="form-container">
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              产权人性质
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="ownerPropertyList" @change="ownerPropertyChange">
                <input
                  type="text"
                  :value="ownerProperty"
                  class="input"
                  placeholder="请选择产权人性质"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="ownerProperty"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list form-address" v-if="userType=='4'">
            <view class="form-title">
              详细地址
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <uni-address-picker @change="ownerAddressChange" mode="street">
                <input
                  type="text"
                  :value="ownerAddressDate"
                  class="input"
                  placeholder="请选择地区"
                  disabled
                />
              </uni-address-picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="ownerAddressDate"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <input
              type="text"
              class="form-input"
              placeholder="请输入详细地址"
              v-model="ownerAddress"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list form-address" v-if="userType!='4'">
            <view class="form-title">
              负责区域
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <uni-address-picker
                @change="manageAddressChange"
                :mode="userType=='1'?'area':'street'"
              >
                <input
                  type="text"
                  :value="manageAddressDate"
                  class="input"
                  placeholder="请选择负责区域"
                  disabled
                />
              </uni-address-picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="manageAddressDate"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='2'||userType=='3'">
            <input
              type="text"
              class="form-input"
              placeholder="请输入详细地址"
              v-model="manageAddress"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list form-address" v-if="userType=='2'||userType=='3'">
            <view class="form-title">
              家庭地址
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <uni-address-picker @change="familyAddressChange" mode="street">
                <input
                  type="text"
                  :value="familyAddressDate"
                  class="input"
                  placeholder="请选择家庭地址"
                  disabled
                />
              </uni-address-picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="familyAddressDate"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='2'||userType=='3'">
            <input
              type="text"
              class="form-input"
              placeholder="请输入详细地址"
              v-model="familyAddress"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list form-address" v-if="userType=='1'">
            <view class="form-title">
              办公地址
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <uni-address-picker @change="workAddressChange" mode="street">
                <input
                  type="text"
                  :value="workAddressDate"
                  class="input"
                  placeholder="请选择办公地址"
                  disabled
                />
              </uni-address-picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="workAddressDate"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='1'">
            <input
              type="text"
              class="form-input"
              placeholder="请输入详细地址"
              v-model="workAddress"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list" v-if="userType=='1'">
            <view class="form-title">
              管理片区明细
              <text>*</text>：
            </view>
            <input
              type="text"
              class="form-input"
              placeholder="请输入管理片区明细"
              v-model="manageAreaInfo"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list" v-if="userType!='4'">
            <view class="form-title">
              负责人姓名
              <text>*</text>：
            </view>
            <input
              type="text"
              class="form-input"
              placeholder="请输入负责人姓名"
              v-model="leaderName"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list" v-if="userType!='1'">
            <view class="form-title">
              片区管理
              <text>*</text>：
            </view>
            <input type="text" :value="areaManage" class="form-input" disabled />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              养殖规模
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="breedRangeList" @change="breedRangeChange">
                <input type="text" :value="breedRange" class="input" placeholder="请选择养殖规模" disabled />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input type="text" class="form-input" :value="breedRange" disabled v-if="isPerfect==1" />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              从业人数
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="memberCountList" @change="memberCountChange">
                <input
                  type="text"
                  :value="memberCount"
                  class="input"
                  placeholder="请选择从业人数"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input type="text" class="form-input" :value="memberCount" disabled v-if="isPerfect==1" />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              养殖设施
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="breedFacilitiesList" @change="breedFacilitiesChange">
                <input
                  type="text"
                  :value="breedFacilities"
                  class="input"
                  placeholder="请选择养殖设施"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="breedFacilities"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              饲养品种
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="breedVarietyList" @change="breedVarietyChange">
                <input
                  type="text"
                  :value="breedVariety"
                  class="input"
                  placeholder="请选择饲养品种"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="breedVariety"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              技术水平
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="technicalLevelList" @change="technicalLevelChange">
                <input
                  type="text"
                  :value="technicalLevel"
                  class="input"
                  placeholder="请选择技术水平"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="technicalLevel"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              信誉评级
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="creditGradeList" @change="creditGradeChange">
                <input
                  type="text"
                  :value="creditGrade"
                  class="input"
                  placeholder="请选择信誉评级"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input type="text" class="form-input" :value="creditGrade" disabled v-if="isPerfect==1" />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              联系方式
              <text>*</text>：
            </view>
            <input
              type="text"
              class="form-input"
              placeholder="请输入联系方式"
              v-model="contactTel"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              产权负责人信息
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="ownerInfoList" @change="ownerInfoChange">
                <input
                  type="text"
                  :value="ownerInfo"
                  class="input"
                  placeholder="请选择产权负责人信息"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input type="text" class="form-input" :value="ownerInfo" disabled v-if="isPerfect==1" />
          </view>
          <view class="form-list">
            <view class="form-title">
              年龄
              <text>*</text>：
            </view>
            <input
              type="text"
              class="form-input"
              placeholder="请输入年龄"
              v-model="age"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list">
            <view class="form-title">
              学历
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="educationList" @change="educationChange">
                <input type="text" :value="education" class="input" placeholder="请选择学历" disabled />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input type="text" class="form-input" :value="education" disabled v-if="isPerfect==1" />
          </view>
          <view class="form-list">
            <view class="form-title">
              民族
              <text>*</text>：
            </view>
            <input
              type="text"
              class="form-input"
              placeholder="请输入民族"
              v-model="nation"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <view class="form-title">
              职业
              <text>*</text>：
            </view>
            <input
              type="text"
              class="form-input"
              placeholder="请输入职业"
              v-model="occupation"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list" v-if="userType!='4'">
            <view class="form-title">
              技术等级
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="technicalGradeList" @change="technicalGradeChange">
                <input
                  type="text"
                  :value="technicalGrade"
                  class="input"
                  placeholder="请选择技术等级"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="technicalGrade"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType!='4'">
            <view class="form-title">
              就业性质
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="jobPropertyList" @change="jobPropertyChange">
                <input
                  type="text"
                  :value="jobProperty"
                  class="input"
                  placeholder="请选择就业性质"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input type="text" class="form-input" :value="jobProperty" disabled v-if="isPerfect==1" />
          </view>
          <view class="form-list">
            <view class="form-title">
              健康状态
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <picker mode="selector" :range="healthStatusList" @change="healthStatusChange">
                <input
                  type="text"
                  :value="healthStatus"
                  class="input"
                  placeholder="请选择健康状态"
                  disabled
                />
              </picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="healthStatus"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list form-address" v-if="userType=='4'">
            <view class="form-title">
              现住址
              <text>*</text>：
            </view>
            <view class="form-input" v-if="isPerfect==0">
              <uni-address-picker @change="presentAddressChange" mode="street">
                <input
                  type="text"
                  :value="presentAddressDate"
                  class="input"
                  placeholder="请选择地区"
                  disabled
                />
              </uni-address-picker>
            </view>
            <uni-icons
              type="arrowright"
              :size="actionIconSize"
              :color="iconColor"
              v-if="isPerfect==0"
            ></uni-icons>
            <input
              type="text"
              class="form-input"
              :value="presentAddressDate"
              disabled
              v-if="isPerfect==1"
            />
          </view>
          <view class="form-list" v-if="userType=='4'">
            <input
              type="text"
              class="form-input"
              placeholder="请输入详细地址"
              v-model="presentAddress"
              :disabled="isPerfect==1?true:false"
            />
          </view>
          <view class="form-list" v-if="userType=='3'||userType=='4'">
            <view class="form-title">
              身份证号
              <text>*</text>：
            </view>
            <input
              type="text"
              class="form-input"
              placeholder="请输入身份证号"
              v-model="idNumber"
              :disabled="isPerfect==1?true:false"
            />
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="btn-container">
      <button type="default" class="btn" @tap="subTap" v-if="isPerfect==0">提交</button>
    </view>
  </view>
</template>
<script>
import uniAddressPicker from "@/components/uni-address-picker/uni-address-picker.vue";
export default {
  components: {
    uniAddressPicker
  },
  data() {
    return {
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
      actionIconSize: 0, //右侧箭头字号
      iconColor: "#666", //右侧箭头颜色
      provinceId: "", //省id
      cityId: "", //市id
      areaId: "", //区id
      streetId: "", //街道id
      ownerAddressDate: "", //详细地址 地区
      ownerAddress: "", //详细地址
      manageAddressDate: "", //详细地址 地区
      manageAddress: "", //负责区域
      familyAddressDate: "", //家庭地址 地区
      familyAddress: "", //家庭地址
      workAddressDate: "", //办公地址 地区
      workAddress: "", //办公地址
      ownerProperty: "", //产权人性质
      ownerPropertyList: [], //产权人性质List
      areaManage: "", //片区管理
      manageAreaInfo: "", //管理片区明细
      leaderName: "", //负责人姓名
      breedRange: "", //养殖规模
      breedRangeList: [], //养殖规模List
      memberCount: "", //从业人数
      memberCountList: [], //从业人数List
      breedFacilities: "", //养殖设施
      breedFacilitiesList: [], //养殖设施List
      breedVariety: "", //饲养品种
      breedVarietyList: [], //饲养品种List
      technicalLevel: "", //技术水平
      technicalLevelList: [], //技术水平List
      creditGrade: "", //信誉评级
      creditGradeList: [], //信誉评级List
      contactTel: "", //联系方式
      ownerInfo: "", //产权负责人信息
      ownerInfoList: [], //产权负责人信息List
      education: "", //学历
      educationList: [], //学历List
      age: "", //年龄
      nation: "", //民族
      occupation: "", //职业
      presentAddressDate: "", //现住址 地区
      presentAddress: "", //现住址 详细地址
      jobProperty: "", //就业性质
      jobPropertyList: [], //就业性质List
      technicalGrade: "", //技术等级
      technicalGradeList: [], //技术等级List
      healthStatus: "", //健康状态
      healthStatusList: [], //健康状态List
      idNumber: "", //身份证号
      uid: "",
      userType: "", //用户类型
      userNo: "", //登记编号
      isPerfect: 0 //是否已完善信息
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
    _this.uid = userInfo.uid;
    _this.userType = userInfo.usertype;
    _this.userNo = userInfo.userno;
    _this.ownerProperty = userInfo.owner_property;
    _this.ownerAddress = userInfo.owner_address;
    _this.ownerAddressDate = userInfo.owner_area;
    _this.manageAddress = userInfo.manage_address;
    _this.manageAddressDate = userInfo.manage_area;
    _this.familyAddress = userInfo.family_address;
    _this.familyAddressDate = userInfo.family_area;
    _this.workAddress = userInfo.work_address;
    _this.workAddressDate = userInfo.work_area;
    _this.manageAreaInfo = userInfo.manage_area_info;
    _this.leaderName = userInfo.leader_name;
    _this.areaManage = userInfo.area_manage;
    _this.breedRange = userInfo.breed_range;
    _this.memberCount = userInfo.member_count;
    _this.breedFacilities = userInfo.breed_facilities;
    _this.breedVariety = userInfo.breed_variety;
    _this.technicalLevel = userInfo.technical_level;
    _this.creditGrade = userInfo.credit_grade;
    _this.contactTel = userInfo.contact_tel;
    _this.ownerInfo = userInfo.owner_info;
    _this.age = userInfo.age;
    _this.education = userInfo.education;
    _this.nation = userInfo.nation;
    _this.occupation = userInfo.occupation;
    _this.technicalGrade = userInfo.technical_grade;
    _this.jobProperty = userInfo.job_property;
    _this.healthStatus = userInfo.health_status;
    _this.presentAddress = userInfo.present_address;
    _this.presentAddressDate = userInfo.present_area;
    _this.idNumber = userInfo.id_number;
    _this.isPerfect = userInfo.is_perfect;

    this.getUserInfo();
    this.getOwnerPropertyList();
    this.getBreedRangeList();
    this.getMemberCountList();
    this.getBreedFacilitiesList();
    this.getbreedVarietyList();
    this.getEducationList();
    this.getJobPropertyList();
    this.getHealthStatusList();
    this.getTechnicalLevelList();
    this.getCreditGradeList();
    this.getOwnerInfoList();
    this.getTechnicalGradeList();
  },
  methods: {
    async getUserInfo() {
      const { uid } = this;
      const res = await this.$http.request({
        url: "/user/getUserInfo",
        method: "post",
        data: { uid: uid }
      });
      if (res.status === "E") {
        this.errorToast(res.msg);
        return false;
      }
      const resData = res.data[0];
      uni.setStorage({
        key: "userinfo",
        data: JSON.stringify(resData)
      });
    },
    async subTap() {
      const {
        userType,
        uid,
        provinceId,
        cityId,
        areaId,
        streetId,
        ownerAddressDate,
        ownerAddress,
        presentAddressDate,
        presentAddress,
        manageAddressDate,
        manageAddress,
        familyAddressDate,
        familyAddress,
        workAddressDate,
        workAddress,
        ownerProperty,
        areaManage,
        manageAreaInfo,
        leaderName,
        breedRange,
        memberCount,
        breedFacilities,
        breedVariety,
        technicalLevel,
        creditGrade,
        contactTel,
        ownerInfo,
        education,
        age,
        nation,
        occupation,
        jobProperty,
        technicalGrade,
        healthStatus,
        idNumber
      } = this;
      let params = {
        uid: uid,
        province_id: provinceId,
        city_id: cityId,
        ara_id: areaId,
        street_id: streetId,
        owner_area: ownerAddressDate,
        owner_address: ownerAddress,
        present_area: presentAddressDate,
        present_address: presentAddress,
        manage_area: manageAddressDate,
        manage_address: manageAddress,
        family_area: familyAddressDate,
        family_address: familyAddress,
        work_area: workAddressDate,
        work_address: workAddress,
        owner_property: ownerProperty,
        area_manage: areaManage,
        manage_area_info: manageAreaInfo,
        leader_name: leaderName,
        breed_range: breedRange,
        member_count: memberCount,
        breed_facilities: breedFacilities,
        breed_variety: breedVariety,
        technical_level: technicalLevel,
        credit_grade: creditGrade,
        contact_tel: contactTel,
        owner_info: ownerInfo,
        education: education,
        age: age,
        nation: nation,
        occupation: occupation,
        job_property: jobProperty,
        technical_grade: technicalGrade,
        health_status: healthStatus,
        id_number: idNumber
      };
      console.log(params);
      const res = await this.$http.request({
        url: "/user/userPerfect",
        method: "post",
        data: params
      });
      if (res.status === "E") {
        this.errorToast(res.msg);
        return false;
      }
      const resData = res.data[0];
      uni.setStorage({
        key: "userinfo",
        data: JSON.stringify(resData),
        success: function() {
          console.log("success");
        }
      });
      this.$Router.push({
        path: "/pages/mine/mine"
      });
    },
    scroll(e) {
      this.old.scrollTop = e.detail.scrollTop;
    },
    ownerPropertyChange(e) {
      this.ownerProperty = this.ownerPropertyList[e.detail.value];
    },
    async ownerAddressChange(e) {
      const ownerArea = e.dataList;
      this.provinceId = ownerArea.province.value;
      this.cityId = ownerArea.city.value;
      this.areaId = ownerArea.area.value;
      this.streetId = ownerArea.street.value;
      this.ownerAddressDate = e.value;
      const res = await this.$http.request({
        url: "/area_manage/getAreaManageList",
        method: "post",
        data: {
          province_id: this.provinceId,
          city_id: this.cityId,
          ara_id: this.areaId,
          street_id: this.streetId,
          usertype: this.userType
        }
      });
      if (res.status === "E") {
        this.errorToast(res.msg);
        return false;
      }
      const areaManageData = res.data[0];
      this.areaManage = areaManageData.leader_name;
    },
    async manageAddressChange(e) {
      const manageArea = e.dataList;
      this.provinceId = manageArea.province.value;
      this.cityId = manageArea.city.value;
      this.areaId = manageArea.area.value;
      if (this.userType != "1") {
        this.streetId = manageArea.street.value;
      }
      this.manageAddressDate = e.value;
      const res = await this.$http.request({
        url: "/area_manage/getAreaManageList",
        method: "post",
        data: {
          province_id: this.provinceId,
          city_id: this.cityId,
          ara_id: this.areaId,
          street_id: this.streetId,
          usertype: this.userType
        }
      });
      if (res.status === "E") {
        this.errorToast(res.msg);
        return false;
      }
      const areaManageData = res.data[0];
      this.areaManage = areaManageData.leader_name;
    },
    familyAddressChange(e) {
      this.familyAddressDate = e.value;
    },
    workAddressChange(e) {
      this.workAddressDate = e.value;
    },
    breedRangeChange(e) {
      this.breedRange = this.breedRangeList[e.detail.value];
    },
    memberCountChange(e) {
      this.memberCount = this.memberCountList[e.detail.value];
    },
    breedFacilitiesChange(e) {
      this.breedFacilities = this.breedFacilitiesList[e.detail.value];
    },
    breedVarietyChange(e) {
      this.breedVariety = this.breedVarietyList[e.detail.value];
    },
    educationChange(e) {
      this.education = this.educationList[e.detail.value];
    },
    jobPropertyChange(e) {
      this.jobProperty = this.jobPropertyList[e.detail.value];
    },
    presentAddressChange(e) {
      this.presentAddressDate = e.value;
    },
    technicalLevelChange(e) {
      this.technicalLevel = this.technicalLevelList[e.detail.value];
    },
    creditGradeChange(e) {
      this.creditGrade = this.creditGradeList[e.detail.value];
    },
    ownerInfoChange(e) {
      this.ownerInfo = this.ownerInfoList[e.detail.value];
    },
    technicalGradeChange(e) {
      this.technicalGrade = this.technicalGradeList[e.detail.value];
    },
    healthStatusChange(e) {
      this.healthStatus = this.healthStatusList[e.detail.value];
    },
    async getOwnerPropertyList() {
      const res = await this.$http.request({
        url: "/baseList/getOwnerPropertyList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.ownerPropertyList = dataList;
    },
    async getBreedRangeList() {
      const res = await this.$http.request({
        url: "/baseList/getBreedRangeList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.breedRangeList = dataList;
    },
    async getMemberCountList() {
      const res = await this.$http.request({
        url: "/baseList/getMemberCountList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.memberCountList = dataList;
    },
    async getBreedFacilitiesList() {
      const res = await this.$http.request({
        url: "/baseList/getBreedFacilitiesList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.breedFacilitiesList = dataList;
    },
    async getbreedVarietyList() {
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
      this.breedVarietyList = dataList;
    },
    async getEducationList() {
      const res = await this.$http.request({
        url: "/baseList/getEducationList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.educationList = dataList;
    },
    async getJobPropertyList() {
      const res = await this.$http.request({
        url: "/baseList/getJobPropertyList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.jobPropertyList = dataList;
    },
    async getHealthStatusList() {
      const res = await this.$http.request({
        url: "/baseList/getHealthStatusList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.healthStatusList = dataList;
    },
    async getTechnicalLevelList() {
      const res = await this.$http.request({
        url: "/baseList/getTechnicalLevelList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.technicalLevelList = dataList;
    },
    async getCreditGradeList() {
      const res = await this.$http.request({
        url: "/baseList/getCreditGradeList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.creditGradeList = dataList;
    },
    async getOwnerInfoList() {
      const res = await this.$http.request({
        url: "/baseList/getOwnerInfoList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.ownerInfoList = dataList;
    },
    async getTechnicalGradeList() {
      const res = await this.$http.request({
        url: "/baseList/getTechnicalGradeList",
        method: "get",
        data: {}
      });
      let resData = res.data;
      let dataList = [];
      resData.forEach(function(val) {
        dataList.push(val.name);
      });
      this.technicalGradeList = dataList;
    },
    errorToast(title) {
      uni.showToast({
        title: title,
        duration: 2000,
        mask: true,
        icon: "none"
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
        height: 100rpx;
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid $uni-border-color;

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
          flex: 1;
          font-size: $uni-font-size-base;
          color: $uni-text-color;
          line-height: 40rpx;
          padding-right: 20rpx;

          .input {
            font-size: $uni-font-size-base;
            color: $uni-text-color;
          }
        }

        &.form-address {
          border-bottom: 0;

          .form-input {
            height: 100rpx;
            border-bottom: 2rpx solid $uni-border-color;
            display: flex;
            align-items: center;
            .address-picker-content {
              flex: 1;
            }
          }
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
