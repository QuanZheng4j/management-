import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '文件审批后台管理系统', icon: 'el-icon-odometer' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/login/success'),
    hidden: true
  },
  {
    path: '/resetpwd',
    name: 'resetpwd',
    component: () => import('@/views/login/resetpwd'),
    hidden: true
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '管理', icon: 'el-icon-s-flag' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用户管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '部门管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'addTeacher',
        name: 'addTeacher',
        component: () => import('@/views/table/addTeacher'),
        meta: { title: '添加用户', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path: 'editTeacher',
        name: 'editTeacher',
        component: () => import('@/views/table/editTeacher'),
        meta: { title: '编辑用户', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path: 'addDepart',
        name: 'addDepart',
        component: () => import('@/views/tree/addDepart'),
        meta: { title: '添加部门', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path: 'updateDepart',
        name: 'updateDepart',
        component: () => import('@/views/tree/updateDepart'),
        meta: { title: '编辑部门', icon: 'el-icon-s-order' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
