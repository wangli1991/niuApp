<template>
  <view>
    <uni-status-bar />
    <view class="head" @tap="goInfo">
      <view class="head-l">
        <image class="head-portrait" src="../../static/logo.png" mode="scaleToFill"></image>
        <view class="head-info">
          <view class="name">{{realName}}</view>
          <view class="mobile">{{mobile}}</view>
        </view>
      </view>
      <uni-icons type="arrowright" :size="actionIconSize" color="#fff"></uni-icons>
    </view>
    <view class="order-menu">
      <view class="item" v-for="(item,index) in orderMenuList" :key="index">
        <view class="icon iconfont icon-shaixuan"></view>
        <router-link :to="item.url">
          <view class="txt">{{item.name}}</view>
        </router-link>
      </view>
    </view>
    <view class="menu">
      <view class="menu-list">
        <view class="list-title">常用</view>
        <view class="list-container">
          <view class="item" v-for="(item,index) in menuList" :key="index">
            <view class="icon iconfont icon-shaixuan"></view>
            <router-link :to="item.url">
              <view class="txt">{{item.name}}</view>
            </router-link>
          </view>
        </view>
      </view>
    </view>
    <view class="menu">
      <view class="menu-list">
        <view class="list-title">其他</view>
        <view class="list-container">
          <view class="item" v-for="(item,index) in menuList" :key="index">
            <view class="icon iconfont icon-shaixuan"></view>
            <router-link :to="item.url">
              <view class="txt">{{item.name}}</view>
            </router-link>
          </view>
        </view>
      </view>
    </view>
    <view class="btns">
      <button type="warn" @tap="logoutTap">退出登录</button>
    </view>
  </view>
</template>

<script>
import uniStatusBar from "@/components/uni-status-bar/uni-status-bar.vue";
export default {
  components: {
    uniStatusBar
  },
  data() {
    return {
      uid: "",
      mobile: "",
      realName: "未实名",
      actionIconSize: 0, //右侧箭头字号
      orderMenuList: [], //订单类menuList
      menuList: [] //常用menuList
    };
  },
  mounted() {
    let _this = this;
    uni.getSystemInfo({
      success: function(res) {
        let format = res.windowWidth / 750;
        _this.actionIconSize = 60 * format;
      }
    });
    this.orderMenuList = [
      {
        name: "全部订单",
        url: ""
      },
      {
        name: "待付款",
        url: ""
      },
      {
        name: "待发货",
        url: ""
      },
      {
        name: "待收货",
        url: ""
      }
    ];
    this.menuList = [
      {
        name: "我的牧场",
        url: "/pages/ranch/ranch"
      }
    ];
  },
  onShow() {
    let _this = this;
    uni.getStorage({
      key: "userinfo",
      success: function(res) {
        const userInfo = JSON.parse(res.data);
        _this.uid = userInfo.uid;
        _this.mobile = userInfo.mobile;
      }
    });
    this.getUserInfo();
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
    goInfo() {
      this.$Router.push({
        path: "/pages/mine/perfect-info"
      });
    },
    async logoutTap() {
      const res = await this.$http.request({
        url: "/user/logout",
        method: "post",
        data: {}
      });
      if (res.status === "S") {
        uni.setStorage({
          key: "userinfo",
          data: "",
          success: function() {
            console.log("success");
          }
        });
        this.$Router.replace({
          path: "/pages/home/home"
        });
      }
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
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #43c24d;
  padding: 60rpx 2 * $uni-spacing-row-base;

  .head-l {
    display: flex;
    align-items: center;

    .head-portrait {
      width: 110rpx;
      height: 110rpx;
      border-radius: 50%;
    }

    .head-info {
      padding-left: 2 * $uni-spacing-row-base;
      color: #fff;

      .name {
        font-size: $uni-font-size-lg;
        line-height: 1;
      }

      .mobile {
        font-size: $uni-font-size-base;
        line-height: 1;
        margin-top: $uni-spacing-col-lg;
      }
    }
  }
}

.order-menu {
  margin: $uni-spacing-col-lg $uni-spacing-row-sm $uni-spacing-col-base;
  background-color: #fff;
  border-radius: $uni-border-radius-base;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 25%;
    padding: $uni-spacing-col-sm 0;

    .icon {
      margin: 0 auto;
      text-align: center;
      color: $uni-text-color;
      font-size: 60rpx;
    }

    .txt {
      text-align: center;
      font-size: $uni-font-size-base;
      color: $uni-text-color;
    }
  }
}

.menu {
  .menu-list {
    background-color: #fff;
    margin-bottom: $uni-spacing-col-lg;

    .list-title {
      font-size: $uni-font-size-lg;
      color: $uni-text-color-active;
      line-height: 2 * $uni-font-size-base;
      padding-left: $uni-spacing-row-lg;
      border-bottom: 1rpx solid $uni-border-color-grey;
      position: relative;

      &::after {
        content: "";
        width: 4rpx;
        height: 70%;
        background-color: $uni-text-color-active;
        position: absolute;
        left: $uni-spacing-row-sm;
        top: 15%;
      }
    }

    .list-container {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 25%;
        padding: $uni-spacing-col-sm 0;

        .icon {
          margin: 0 auto;
          text-align: center;
          color: $uni-text-color;
          font-size: 40rpx;
        }

        .txt {
          text-align: center;
          font-size: $uni-font-size-base;
          color: $uni-text-color;
        }
      }
    }
  }
}

.btns {
  margin: 0 $uni-spacing-row-lg;
}
</style>
