import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { TabPane } from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// const whiteArr = ['/success']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = to.meta.title || '文件审批系统'

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (localStorage.getItem('name') === 'Admin') {
      // if is logged in, redirect to the home page
      if (to.path === '/success') {
        next('/')
      } else {
        next()
      }
    } else {
      if (to.path === '/') {
        next('/success')
      } else if (to.path === '/success') {
        next()
      } else {
        next({ path: '/success' })
      }
      // if (whiteArr.indexOf(to.path) !== -1) {
      //   next()
      // }
      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getInfo')

      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/
    if (to.path === '/resetpwd') {
      next()
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
