/*
 * @Author: hidari
 * @Date: 2022-04-13 17:36:23
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 17:40:10
 * @FilePath: \shopping-centre-management\src\router\index.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { Layout } from './route/layout.route'
import { Login } from './route/login.route'
import store from '@/store'

const routes = [
  ...Layout,
  ...Login
]

// vue2 => new VueRouter({}) 创建路由实例
// vue3 => createRouter({}) 创建路由实例
const router = createRouter({
  // hash路由模式
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    // vue2.0 => x,y
    // vue3.0 => left,top
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router
