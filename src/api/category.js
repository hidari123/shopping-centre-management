/*
 * @Author: hidari
 * @Date: 2022-04-15 09:09:07
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-20 08:55:05
 * @FilePath: \shopping-centre-management\src\api\category.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
// 分类相关API函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据(顶级，二级，对应的商品推荐数据)
 */
export const reqFindAllCategory = () => request('/home/category/head', 'get')

/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 */
export const reqFindSubCategoryFilter = (id) => request('/category/sub/filter', 'get', { id })
