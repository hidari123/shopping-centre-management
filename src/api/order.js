/*
 * @Author: hidari
 * @Date: 2022-04-27 18:11:31
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 18:11:32
 * @FilePath: \shopping-centre-management\src\api\order.js
 * @Description: 订单模块
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const reqFindCheckoutInfo = () => request('/member/order/pre', 'get')
