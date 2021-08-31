<template>
  <div class="login-container">
    <!-- 导航栏 -->
 
   <van-nav-bar class="page-nav-bar" title="登录" >
     <van-icon 
      slot="left"
      name="cross"
      @click="$router.back()"
     />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        v-model="user.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        v-model="user.code"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 5"
            format="ss s"
            @finish="timer"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login } from "@/api/user.js";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      isCountDownShow: false,
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      let data = this.user;
      this.$toast.loading({
        duration: 0,
        // 时间wei0
        message: "登录中...",
        forbidClick: true, // 是否禁止背景点击
      });
      try {
        let res = await login(data);
        if (res.status === 201) {
          this.$toast.success("登录成功");
          this.$router.back()
          this.$store.commit("setUser", res.data.data);
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("登录失败");
        } else {
          this.$toast.fail("登录失败");
        }
      }
    },
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      this.isCountDownShow = true;
    },
    timer() {
      this.isCountDownShow = false;
      this.user.code = 287868;
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .page-nav-bar {
    background-color: #6db4fb;
    color: #fff;
  }
  /deep/.van-button__text {
    white-space: nowrap;
  }
}
</style>