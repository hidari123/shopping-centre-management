/*
 * @Author: hidari
 * @Date: 2022-04-21 10:52:21
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 18:06:25
 * @FilePath: \shopping-centre-management\src\api\product.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const reqFindGoods = (id) => request('/goods', 'get', { id })

/**
 * 获取商品同类推荐-未传入ID为猜你喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 * 用对象形式传参,可以不强制顺序
 */
export const reqFindRelGoods = ({ id, limit = 16 }) => request('/goods/relevant', 'get', { id, limit })

/**
 * 获取热榜商品
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const reqFindHotGoods = ({ id, type, limit = 3 }) => request('/goods/hot', 'get', { id, type, limit })

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
// axios 遇到 http 开头的地址 不会加上基准地址
export const reqFindCommentInfoByGoods = (id) => request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`)

// https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate
// /goods/${id}/evaluate
