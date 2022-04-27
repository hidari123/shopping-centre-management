/*
 * @Author: hidari
 * @Date: 2022-04-27 18:04:29
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 18:07:47
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
  }
]
