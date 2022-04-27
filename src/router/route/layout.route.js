/*
 * @Author: hidari
 * @Date: 2022-04-14 13:57:49
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 18:07:25
 * @FilePath: \shopping-centre-management\src\router\route\layout.route.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import { Member } from './member.route'
export const Layout = [
  // 一级路由布局容器
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        // 首页
        path: '/',
        name: 'HomePage',
        component: () => import('@/views/home')
      },
      {
        // 顶级菜单
        path: 'category/:id',
        name: 'TopCategory',
        component: () => import('@/views/category')
      },
      {
        // 二级菜单
        path: '/category/sub/:id',
        name: 'SubCategory',
        component: () => import('@/views/category/sub')
      },
      {
        // 搜索模块
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search')
      },
      {
        // 商品详情
        path: '/product/:id',
        name: 'Goods',
        component: () => import('@/views/goods')
      },
      {
        // 购物车
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/cart')
      },
      ...Member
    ]
  }
]
