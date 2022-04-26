/*
 * @Author: hidari
 * @Date: 2022-04-13 17:36:23
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 16:02:11
 * @FilePath: \shopping-centre-management\src\router\index.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { Layout } from './route/layout.route'
import { Login } from './route/login.route'

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

export default router
