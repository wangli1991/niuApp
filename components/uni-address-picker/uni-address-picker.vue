<template>
  <view class="address-picker-content">
    <view class="address-picker" :class="{show:isPickerShow}">
      <view class="mask" @tap="closePicker"></view>
      <view class="address-content">
        <view class="title">请选择地址</view>
        <view class="select-container">
          <view
            class="select-list"
            :class="showIndex==0?'selected':''"
            @tap="anewSelect(0)"
          >{{province}}</view>
          <view
            class="select-list"
            :class="showIndex==1?'selected':''"
            @tap="anewSelect(1)"
            v-if="showIndex>=1"
          >{{city}}</view>
          <view
            class="select-list"
            :class="showIndex==2?'selected':''"
            @tap="anewSelect(2)"
            v-if="showIndex>=2"
          >{{area}}</view>
          <view
            class="select-list"
            :class="showIndex==3?'selected':''"
            @tap="anewSelect(3)"
            v-if="showIndex>=3"
          >{{street}}</view>
        </view>
        <view class="address-container">
          <view v-if="showIndex==0" class="address-list" :style="'height:'+ heightCot + 'rpx'">
            <view
              class="list"
              @tap="selectPro(index,item.label)"
              v-for="(item,index) in provinceData"
              :key="index"
            >{{item.label}}</view>
          </view>

          <view v-if="showIndex==1" class="address-list" :style="'height:'+ heightCot + 'rpx'">
            <view
              class="list"
              @tap="selectCity(index,item.label)"
              v-for="(item,index) in cityData"
              :key="index"
            >{{item.label}}</view>
          </view>

          <view
            v-if="showIndex==2&&(mode==='area'||mode==='street')"
            class="address-list"
            :style="'height:'+ heightCot + 'rpx'"
          >
            <view
              class="list"
              @tap="selectaArea(index,item.label)"
              v-for="(item,index) in areaData"
              :key="index"
            >{{item.label}}</view>
          </view>

          <view
            v-if="showIndex==3&&mode==='street'"
            class="address-list"
            :style="'height:'+ heightCot + 'rpx'"
          >
            <view
              class="list"
              @tap="selectStreet(index,item)"
              v-for="(item,index) in streetData"
              :key="index"
            >{{item}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="address" @tap="showPicker">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import provinceData from "./data/province.js";
import getCity from "./data/city.js";
import getArea from "./data/area.js";
import getstreet from "./data/street.js";
export default {
  name: "uniAddressPicker",
  props: {
    mode: {
      type: String,
      default: "area"
    }
  },
  data() {
    return {
      province: "请选择省",
      city: "请选择市",
      area: "请选择县",
      street: "请选择街道",
      cityDataAll: "", // 市的所有數據
      getAreaAll: "", // 区的所有数据
      getstreetAll: "", // 街道的所有数据
      presentIndex: [],
      proIndex: 0,
      cityIndex: 0,
      areaIndex: 0,
      streetIndex: 0,
      provinceData: "", // 当前展示的省数据
      cityData: "", // 当前展示的市数据
      areaData: "", //当前展示的区数据
      streetData: "", //当前展示的区数据
      showIndex: 0,
      heightCot: 0,
      isPickerShow: false
    };
  },
  created() {
    uni.getSystemInfo({
      success: res => {
        this.heightCot = (res.safeArea.height * 2) / 2;
      }
    });
  },
  mounted() {
    this.provinceData = provinceData;
    this.cityDataAll = getCity;
    this.getAreaAll = getArea;
    this.getstreetAll = getstreet;
  },
  methods: {
    showPicker() {
      this.showIndex = 0;
      this.province = "请选择省";
      this.city = "请选择市";
      this.area = "请选择县";
      this.street = "请选择街道";
      this.isPickerShow = true;
    },
    closePicker() {
      this.isPickerShow = false;
    },
    anewSelect(num) {
      switch (num) {
        case 0:
          this.showIndex = 0;
          this.areaData = [];
          this.streetData = [];
          this.city = "请选择市";
          this.area = "请选择县";
          this.street = "请选择街道";
          break;
        case 1:
          this.showIndex = 1;
          this.areaData = [];
          this.streetData = [];
          this.area = "请选择县";
          this.street = "请选择街道";
          break;
        case 2:
          this.showIndex = 2;
          this.streetData = [];
          this.street = "请选择街道";
          break;
      }
    },
    selectPro(index, label) {
      const { cityDataAll } = this;
      this.proIndex = index; // 当前省的下标
      this.province = label;
      this.cityData = cityDataAll[index];
      this.showIndex = 1;
    },
    selectCity(index, label) {
      const { proIndex } = this;
      this.city = label;
      this.cityIndex = index; // 当前市的下标
      if (this.mode === "city") {
        this.changeEmit();
        return false;
      }
      this.showIndex = 2;
      this.areaData = this.getAreaAll[proIndex][index];
    },
    selectaArea(index, label) {
      const { proIndex, cityIndex } = this;
      this.area = label;
      this.areaIndex = index; // 当前市的下标
      if (this.mode === "area") {
        this.changeEmit();
        return false;
      }
      this.showIndex = 3;
      this.streetData = this.getstreetAll[proIndex][cityIndex][index];
    },
    selectStreet(index, label) {
      this.street = label;
      this.streetIndex = index; // 当前市的下标
      if (this.mode === "street") {
        this.changeEmit();
      }
    },
    changeEmit() {
      const { proIndex, cityIndex, areaIndex, streetIndex } = this;
      const { provinceData, cityData, areaData, streetData } = this;
      let area, street, value;
      const province = {
        label: provinceData[proIndex].label,
        value: provinceData[proIndex].value
      };
      const city = {
        label: cityData[cityIndex].label,
        value: cityData[cityIndex].value
      };
      value = province.label + " " + city.label;
      if (this.mode === "area" || this.mode === "street") {
        area = {
          label: areaData[areaIndex].label,
          value: areaData[areaIndex].value
        };
        value += " " + area.label;
      }
      if (this.mode === "street") {
        let streetValue;
        if (streetIndex < 10) {
          streetValue = "0" + streetIndex;
        } else {
          streetValue = streetIndex;
        }
        street = {
          label: streetData[streetIndex],
          value: streetValue
        };
        value += " " + street.label;
      }
      this.$emit("change", {
        dataList: {
          province: province,
          city: city,
          area: area,
          street: street
        },
        value: value
      });
      this.isPickerShow = false;
    }
  }
};
</script>

<style lang="less">
.address-picker {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  z-index: -1;
  font-size: 16rpx;

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

  .address-content {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    background-color: #fff;
    padding-top: 10rpx;
    transition: all 0.3s;
    transform: translateY(100%);

    .select-container {
      padding: 0 20rpx;
      display: flex;

      .select-list {
        font-size: 26rpx;
        margin-right: 40rpx;
        padding-bottom: 6rpx;

        &.selected {
          color: red;
          position: relative;

          &::after {
            content: "";
            width: 40rpx;
            height: 6rpx;
            background: red;
            position: absolute;
            left: 50%;
            bottom: -8rpx;
            margin-left: -20rpx;
          }
        }
      }
    }

    .title {
      font-size: 32rpx;
      margin: 30rpx 20rpx;
    }

    .address-list {
      margin-top: 20rpx;
      height: 600rpx;
      overflow-y: auto;

      .list {
        padding: 20rpx;
        display: flex;
        border-bottom: 1px solid #f1f1f1;

        &:last-child {
          border-bototm: none;
        }
      }
    }
  }

  &.show {
    z-index: 999;

    .mask {
      opacity: 1;
    }

    .address-content {
      transform: translateY(0);
    }
  }
}
</style>
