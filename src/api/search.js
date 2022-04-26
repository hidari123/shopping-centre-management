/*
 * @Author: hidari
 * @Date: 2022-04-26 11:41:59
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 11:48:42
 * @FilePath: \shopping-centre-management\src\api\search.js
 * @Description: 搜索模块 api
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 *
 * @param {Object} data => 筛选条件
 *
 * page => integer 非必须 页码
 * pageSize => integer 非必须 页尺寸
 * keyword => string 非必须 所输入的关键词
 * associatedIds => string[] 非必须 联想词Id集合
 * item => string 非必须 联想词Id
 * categoryId => string 非必须 分类id
 * brandId => string 非必须 品牌id
 * onlyDiscount=> boolean 非必须 只显示特惠
 * sortField => string 非必须 排序字段，取值范围：[publishTime,orderNum,price,evaluateNum]
 * sortMethod => string 非必须 排序规则，asc为正序，desc为倒序，默认为desc
 * @returns
 */
export const reqGetSearchGoods = (data) => request('/search/all', 'post', data)

/**
 *
 * @param {String} keyword => 所输入的关键词
 * @returns
 */
export const reqGetSearchKeyword = (keyword) => request('/search/tips', 'get', { keyword })
