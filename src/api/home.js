/*
 * @Author: OBKoro1
 * @Date: 2022-04-15 16:01:32
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-04-18 16:37:03
 * @FilePath: \shopping-centre-management\src\api\home.js
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
// 首页相关api函数
import request from '@/utils/request'

/**
 * 获取品牌
 * @param {Integer} limit - 品牌个数
 * @returns Promise
 */
export const reqFindBrand = (limit = 6) => request('/home/brand', 'get', { limit })

/**
 * 获取广告图
 * @returns Promise
 */
export const reqFindBanner = () => request('/home/banner', 'get')

/**
 * 获取添加好物
 * @returns Promise
 */
export const reqFindNew = () => request('home/new', 'get')

/**
 * 获取人气推荐
 * @returns Promise
 */
export const reqFindHot = () => request('home/hot', 'get')

/**
 * 获取产品模块
 * @returns Promise
 */
export const reqFindGoods = () => request('home/goods', 'get')

/**
 * 获取最新专题
 * @returns Promise
 */
export const reqFindSpecial = () => request('home/special', 'get')
