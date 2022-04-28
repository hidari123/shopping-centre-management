import { h } from 'vue'
import { RouterView } from 'vue-router'

/*
 * @Author: hidari
 * @Date: 2022-04-27 18:04:29
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 20:00:40
 * @FilePath: \shopping-centre-management\src\router\route\member.route.js
 * @Description: 个人中心
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
export const Member = [
  {
    // 结算页面
    path: '/member/checkout',
    name: 'PayCheckout',
    component: () => import('@/views/member/pay/checkout')
  },
  {
    // 支付页面
    path: '/member/pay',
    name: 'Pay',
    component: () => import('@/views/member/pay/index')
  },
  {
    // 支付结果
    path: '/pay/callback',
    name: 'PayResult',
    component: () => import('@/views/member/pay/result')
  },
  {
    // 个人中心外部容器
    path: '/member',
    name: 'MemberLayout',
    component: () => import('@/views/member/Layout'),
    children: [
      {
        // 个人中心
        path: '/member',
        name: 'MemberHome',
        component: () => import('@/views/member/home')
      },
      {
        path: '/member/order',
        component: {
          // 创建一个 Routerview 容器，形成嵌套关系，动态激活类名
          // vue3.0 需要有嵌套关系才能模糊匹配
          render: () => h(<RouterView/>)
        },
        children: [
          {
            // 订单管理
            path: '',
            name: 'Order',
            component: () => import('@/views/member/order')
          },
          {
            // 订单详情
            path: ':id',
            name: 'Detail',
            component: () => import('@/views/member/order/detail')
          }
        ]
      }
    ]
  }
]
