/*
 * @Author: hidari
 * @Date: 2022-04-26 15:34:14
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 17:19:49
 * @FilePath: \shopping-centre-management\src\api\cart.js
 * @Description:购物车模块
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const reqGetNewCartGoods = (skuId) => request(`/goods/stock/${skuId}`, 'get')

/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const reqGetSpecsAndSkus = (skuId) => request(`/goods/sku/${skuId}`, 'get')

/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.skuId - 商品SKUID
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 */
export const reqMergeLocalCart = (cartList) => request('/member/cart/merge', 'post', cartList)

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const reqFindCartList = () => request('/member/cart', 'get')

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
export const reqInsertCart = ({ skuId, count }) => request('/member/cart', 'post', { skuId, count })

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const reqDeleteCart = (ids) => request('/member/cart', 'delete', { ids })

/**
 * 修改购物车商品的状态和数量
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 * @returns Promise
 */
export const reqUpdateCart = (goods) => request('/member/cart/' + goods.skuId, 'put', goods)

/**
 * 全选反选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - 有效商品skuId集合
 * @returns Promise
 */
export const reqCheckAllCart = ({ selected, ids }) => request('/member/cart/selected', 'put', { selected, ids })
