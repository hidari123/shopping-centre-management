/*
 * @Author: hidari
 * @Date: 2022-04-21 10:52:21
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 10:52:22
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
export const reqFindGoods = (id) => {
  return request('/goods', 'get', { id })
}
