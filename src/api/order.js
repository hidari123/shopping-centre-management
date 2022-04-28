/*
 * @Author: hidari
 * @Date: 2022-04-27 18:11:31
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 14:22:00
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

/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
export const reqAddAddress = (address) => request('/member/address', 'post', address)

/**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
export const reqEditAddress = (address) => request(`/member/address/${address.id}`, 'put', address)

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const reqCreateOrder = (order) => request('/member/order', 'post', order)

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const reqFindOrderDetail = (id) => request('/member/order/' + id, 'get')
