// @ts-nocheck
/*
 * @Author: hidari
 * @Date: 2022-04-28 19:01:39
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 18:08:26
 * @FilePath: \shopping-centre-management\src\api\member.JS
 * @Description: 个人中心模块
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

import request from '@/utils/request'

/**
 * 获取收藏分页数据
 * @param {Integer} collectType - 收藏类型，1为商品，2为专题，3为品牌
 * @returns
 */
export const reqFindCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => request('/member/collect', 'get', { page, pageSize, collectType })

/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const reqFindOrderList = ({ orderState = 0, page = 1, pageSize = 10 }) => request('/member/order', 'get', { orderState, page, pageSize })

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const reqCancelOrder = ({ orderId, cancelReason }) => request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })

/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const reqDelteOrder = (ids) => request('/member/order', 'delete', { ids })

/**
 * 确认收货
 * @param {String} orderId - 订单ID
 * @returns
 */
export const reqConfirmOrder = (orderId) => request(`/member/order/${orderId}/receipt`, 'put')

/**
 * 查看物流
 * @param {String} id - 订单ID
 * @returns
 */
export const reqLogisticsOrder = (id) => request(`/member/order/${id}/logistics`, 'get')

/**
 * 获取再次购买的订单结算信息
 * @param {String} id - 订单ID
 * @returns
 */
export const reqFindOrderRepurchase = (id) => request(`/member/order/repurchase/${id}`, 'get')
