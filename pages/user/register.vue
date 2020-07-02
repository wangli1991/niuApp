<template>
  <view class="content">
    <view class="form">
      <view class="form-list">
        <view class="form-title">手机号</view>：
        <input type="text" v-model="mobile" class="form-input" placeholder="请输入手机号" />
      </view>
      <view class="form-list">
        <view class="form-title">密码</view>：
        <view class="form-input">
          <input
            class="input"
            :type="isPwdShow?'text':'password'"
            v-model="password"
            placeholder="8~16位数字或字母"
          />
        </view>
        <uni-icons
          :type="isPwdShow?'eye':'eye-slash'"
          class="icon-r"
          :size="actionIconSize"
          :color="iconColor"
          @tap="eyeTap"
        ></uni-icons>
      </view>
      <view class="form-list">
        <view class="form-title">确认密码</view>：
        <view class="form-input">
          <input
            class="input"
            :type="isConfirmPwdShow?'text':'password'"
            v-model="confirmPassword"
            placeholder="与密码保持一致"
          />
        </view>
        <uni-icons
          :type="isConfirmPwdShow?'eye':'eye-slash'"
          class="icon-r"
          :size="actionIconSize"
          :color="iconColor"
          @tap="confirmEyeTap"
        ></uni-icons>
      </view>
      <view class="form-list">
        <view class="form-title">验证码</view>：
        <input type="text" v-model="code" class="form-input" placeholder="请输入验证码" />
        <uni-get-code duration="3" @getcode="getCode" />
      </view>
      <view class="form-list">
        <view class="form-title">用户类型</view>：
        <view class="form-input">
          <picker
            mode="selector"
            :value="userTypeIndex"
            :range="userTypeList"
            @change="userTypeChange"
          >
            <input
              type="text"
              :value="userTypeList[userTypeIndex]"
              class="input"
              placeholder="请选择用户类型"
              disabled
            />
          </picker>
        </view>
        <uni-icons type="arrowright" :size="actionIconSize" :color="iconColor"></uni-icons>
      </view>
      <view class="form-list form-type">
        <view class="login-type">
          <router-link to="{name:login}">已有帐号，去登陆</router-link>
        </view>
      </view>
      <view class="form-list form-btn">
        <button type="default" class="btn" @tap="registerTap">注册</button>
      </view>
      <view class="form-list form-tips">
        <view class="txt">注册就代表您同意</view>
        <view class="link">
          <router-link to="{name:agreement}">《注册协议和隐私政策》</router-link>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mobileVerification, pwdVerification } from "@/common/verification.js";
export default {
  data() {
    return {
      actionIconSize: 0,
      iconColor: "#29a529",
      isLoginCode: true, //登录类型 true：手机验证码 false:密码登录
      mobile: "",
      password: "",
      isPwdShow: false,
      confirmPassword: "",
      isConfirmPwdShow: false,
      code: "0",
      userTypeIndex: null, //用户类型index
      userTypeList: ["管理站站长", "片区负责人", "配种员（或兽医）", "产权人"] //性别List
    };
  },
  mounted() {
    let _this = this;
    uni.getSystemInfo({
      success: function(res) {
        let format = res.windowWidth / 750;
        _this.actionIconSize = 40 * format;
      }
    });
  },
  computed: {},
  methods: {
    eyeTap() {
      this.isPwdShow = !this.isPwdShow;
    },
    confirmEyeTap() {
      this.isConfirmPwdShow = !this.isConfirmPwdShow;
    },
    getCode(e) {
      console.log(e);
    },
    userTypeChange: function(e) {
      this.userTypeIndex = e.target.value;
    },
    checkboxChange(e) {
      if (e.detail.value.length > 0) {
        this.isAgree = true;
      } else {
        this.isAgree = false;
      }
    },
    async registerTap() {
      const {
        mobile,
        password,
        confirmPassword,
        code,
        userTypeIndex,
        isAgree,
        errorToast
      } = this;
      if (!mobile) {
        errorToast("请输入您注册使用的手机号");
        return false;
      }
      if (!mobileVerification(mobile)) {
        errorToast("请输入正确的手机号");
        return false;
      }
      if (!password) {
        errorToast("请输入您注册使用的密码");
        return false;
      }
      if (!pwdVerification(password)) {
        errorToast("密码只能以字母开头，由8~16位数字和字母组成");
        return false;
      }
      if (confirmPassword !== password) {
        errorToast("确认密码与您设置的密码不一致");
        return false;
      }
      if (!code) {
        errorToast("请输入您收到的手机验证码");
        return false;
      }
      if (userTypeIndex === null) {
        errorToast("请选择您注册的用户类型");
        return false;
      }
      let usertype = userTypeIndex + 1;
      const res = await this.$http.request({
        url: "/user/register",
        method: "post",
        data: {
          mobile: mobile,
          password: password,
          usertype: usertype,
          code: code
        }
      });
      if (res.status === "E") {
        errorToast(res.msg);
        return false;
      }
      const resData = res.data;
      errorToast("注册成功");
      this.$Router.push({
        path: "/pages/user/login",
        query: {
          mobile: resData.mobile
        }
      });
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

  .form {
    padding: 50rpx 2 * $uni-spacing-row-base 0;

    .form-list {
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid $uni-border-color-active;
      height: 100rpx;

      .form-title {
        width: 120rpx;
        font-size: $uni-font-size-base;
        text-align: justify;
        text-align-last: justify;
      }

      .form-input {
        display: block;
        flex: 1;
        font-size: $uni-font-size-base;
        color: $uni-text-color-active;
        line-height: 40rpx;
        height: 40rpx;
        padding-right: 20rpx;
        .input {
          width: 100%;
          border: 0;
          outline: 0;
          color: $uni-text-color-active;
          font-size: $uni-font-size-base;
        }
      }

      &.form-btn {
        border: 0;
        margin-top: 100rpx;

        .btn {
          width: 100%;
          background: $uni-button-bg-color-base;
          color: #fff;

          &::after {
            display: none;
          }
        }
      }

      &.form-tips {
        border: 0;
        justify-content: center;
        .checkbox {
          font-size: 28rpx;
          line-height: 50rpx;

          label {
            padding-right: 0;
          }
        }

        .link {
          color: $uni-border-color-active;
          font-size: $uni-font-size-base;
        }
      }

      &.form-type {
        border: 0;
        justify-content: flex-end;

        .login-type {
          color: $uni-text-color-active;
          font-size: $uni-font-size-base;
          line-height: 1;
        }
      }
    }
  }
}
</style>
