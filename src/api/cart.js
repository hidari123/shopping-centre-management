/*
 * @Author: hidari
 * @Date: 2022-04-26 15:34:14
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 13:24:17
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
