<template>
  <div class="login-container">
    <header class="app-module__header">
      <div class="container" style="padding-right:100px">
        <!-- <img src="https://a.perfma.net/webpack/account-ssr/1.0.5/static/img/a54122a6bc57a7ba16179ecc58f46117.png" alt="" /> -->
      </div>
    </header>
    <div class="login-index panel">
      <div class="login-index-module__top">
        <div class="index-module__title">
          <span class="index-module__text"><span>用户密码修改</span></span>
        </div>
        <el-form>
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder='Username'></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder='请输入旧密码' type='password'></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.newpassword" placeholder='请输入新密码' type='password'></el-input>
          </el-form-item>
          <el-form-item style="display: block;width: 100%;">
            <el-button type='primary' style="display: block;width: 100%;" @click="submit()">确定</el-button>
          </el-form-item>
           <el-link icon="el-icon-s-home" type="info" style="float:right" @click="goback()">返回</el-link>
        </el-form>
      </div>
      <div class="login-index-module__footer">
        <!-- <p>第三方登录</p>
        <div class="login-index-module__images">
          <img src="https://a.perfma.net/webpack/account-ssr/1.0.5/static/img/9df4072cd7e53d5a51f8645da78ad75a.png" alt="">
          <img src="https://a.perfma.net/webpack/account-ssr/1.0.5/static/img/3ce176ee8e6178d5bc13233cd5c4a6d0.png" alt="">
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserPassWord } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        newpassword: ''
      }
    }
  },
  mounted() { },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    submit() {
      if (this.loginForm.username === '') {
        this.$message({
          message: '账号不能为空',
          type: 'error',
          showClose: true
        })
        return
      }
      if (this.loginForm.password === '') {
        this.$message({
          message: '密码不能为空',
          type: 'error',
          showClose: true
        })
        return
      }
      if (this.loginForm.newpassword === '') {
        this.$message({
          message: '请输入新密码',
          type: 'error',
          showClose: true
        })
        return
      }
      const data = {
        userName: this.loginForm.username,
        password: this.loginForm.password,
        newPassword: this.loginForm.newpassword
      }
      console.log(data)
      updateUserPassWord(data).then(res => {
        console.log(res)
        if (res.data === 1) {
          this.$message({
            message: '修改成功,请妥善保管新密码',
            type: 'success',
            showClose: true
          })
          this.$router.go(-1)
        } else if (res.data === -1) {
          this.$message({
            message: '修改失败,请输入正确的账号或密码',
            type: 'error',
            showClose: true
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  font-size: 12px;
  line-height: 1.5;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif;
  background: #d1edff url(https://a.perfma.net/webpack/account-ssr/1.0.5/static/img/2d8c0753d07da3b52c6f4e37f4ea17f3.png) top no-repeat;
  background-size: cover;
  min-width: 1200px;
  height: 100%;
}
.login-container .app-module__header {
  height: 50px;
  background: #121933;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  .container {
    width: 1200px;
    margin: 0 auto;
    img {
      height: 30px;
      border-style: none;
      vertical-align: middle;
    }
  }
}
.panel {
  width: 400px;
  max-width: 100%;
  min-width: 300px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2px;
  margin: 0 auto;
}
.login-index {
  margin: 110px auto;
  .login-index-module__top {
    padding: 30px 40px 20px;
    .index-module__title {
      position: relative;
      text-align: center;
      margin-bottom: 40px;
      .index-module__text {
        font-weight: 700;
        left: 50%;
        width: 200px;
        margin-left: -100px;
        top: 0;
        position: absolute;
        z-index: 2;
        font-size: 18px;
        color: #333;
        background: #fff;
        text-align: center;
        span {
          color: #1890ff;
        }
      }
    }
    .index-module__title::after {
      display: inline-block;
      content: "";
      width: 100%;
      height: 1px;
      background: #f0f0f0;
    }
  }
  .login-index-module__footer {
    border-top: 1px solid #f0f0f0;
    color: #999;
    margin: 0 40px;
    padding: 20px 0;
    p {
      margin-top: 0;
      margin-bottom: 1em;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
    .login-index-module__images {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      img {
        cursor: pointer;
        width: 52px;
        height: 52px;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .login-container {
      min-width: auto;
      background: #fff;
  }
  .login-container .app-module__header {
    display: none;
  }
  // .login-index .login-index-module__top {
  //   padding: 30px 20px 20px;
  // }
}
</style>
<style lang="scss" scoped>
</style>
