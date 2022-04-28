/*
 * @Author: hidari
 * @Date: 2022-04-28 16:26:14
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 19:23:34
 * @FilePath: \shopping-centre-management\src\mock\index.js
 * @Description: mock数据
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import Mock from 'mockjs'
import qs from 'qs'

// mock的配置
Mock.setup({
  // 随机延时500-1000毫秒
  timeout: '500-1000'
})

// 拦截接口
// 1. 接口地址路径规则 需要匹配到它
// 2. 请求方式
// 3. 返回数据（函数返回数据）

// 拦截请求，
// 第一个参数：url，使用正则去匹配
// 第二个参数：请求方式
// 第三个参数： 生成数据的函数
Mock.mock(/\/member\/collect/, 'get', (config) => {
  // 生成 35 条数据
  const items = []
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  for (let i = 0; i < queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }
  return {
    msg: '获取收藏商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  }
})
