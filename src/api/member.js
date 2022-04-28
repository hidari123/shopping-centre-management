// @ts-nocheck
/*
 * @Author: hidari
 * @Date: 2022-04-28 19:01:39
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 19:27:57
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
