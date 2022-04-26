/*
 * @Author: hidari
 * @Date: 2022-04-24 15:52:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 16:11:14
 * @FilePath: \shopping-centre-management\src\router\route\login.route.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
export const Login = [
  {
    // 登陆布局容器
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    // 登录回调页面
    path: '/login/callback',
    name: 'LoginCallback',
    component: () => import('@/views/login/callback.vue')
  }
]
