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
          <span class="index-module__text"><span>文件导出申请系统</span></span>
        </div>
        <el-form>
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder='Username'></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder='password' type='password' @keyup.enter.native="getData()"></el-input>
          </el-form-item>
          <el-form-item style="display: block;width: 100%;">
            <el-button type='primary' style="display: block;width: 100%;" @click="getData()">登录</el-button>
          </el-form-item>
        </el-form>
        <el-link icon="el-icon-edit" type="info" style="float:right" @click="showPwd()">修改密码</el-link>
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
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  mounted() { },
  methods: {
    getData() {
      const data = {
        userName: this.loginForm.username,
        pwd: this.loginForm.password
      }
      const userName = this.loginForm.username
      const pwd = this.loginForm.password
      localStorage.setItem('userName', userName)
      localStorage.setItem('pwd', pwd)
      // const data = new FormData()
      // data.append('userName', this.loginForm.username)
      // data.append('pwd', this.loginForm.password)
      // // setToken('authorToken')
      // this.$store.state.user.name = this.loginForm.username
      // this.$store.state.user.avatar = 'https://lezhong-1253457580.cos.ap-beijing.myqcloud.com/app/txm/activity/mock/mock.jpg'
      // localStorage.setItem('name', this.loginForm.username)
      // localStorage.setItem('avatar', 'https://lezhong-1253457580.cos.ap-beijing.myqcloud.com/app/txm/activity/mock/mock.jpg')
      // this.$router.push('/')
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message({
          message: '账号或密码不能为空',
          type: 'error',
          showClose: true
        })
      }
      login(data).then(res => {
        console.log(res)
        if (res.data === 1) {
          setToken(res.data.authorToken)
          this.$store.state.user.name = this.loginForm.username
          this.$store.state.user.avatar = 'https://lezhong-1253457580.cos.ap-beijing.myqcloud.com/app/txm/activity/mock/mock.jpg'
          localStorage.setItem('name', this.loginForm.username)
          localStorage.setItem('avatar', 'https://lezhong-1253457580.cos.ap-beijing.myqcloud.com/app/txm/activity/mock/mock.jpg')
          this.$router.push('/success')
        }
      }).catch(() => {
        this.$message({
          message: '服务器未上线',
          type: 'error',
          showClose: true
        })
      })
    },
    showPwd() {
      this.$router.push(`resetpwd`)
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
