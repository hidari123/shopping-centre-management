/*
 * @Author: OBKoro1
 * @Date: 2022-04-15 16:01:32
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-19 15:27:57
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

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const reqFindTopCategory = (id) => request('/category', 'get', { id })
