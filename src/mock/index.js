/*
 * @Author: hidari
 * @Date: 2022-04-28 16:26:14
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 16:39:06
 * @FilePath: \shopping-centre-management\src\mock\index.js
 * @Description: mock数据
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import Mock from 'mockjs'

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
Mock.mock(/\/my\/test/, 'get', () => {
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(Mock.mock({
      id: '@id',
      name: '@ctitle(2,4)'
    }))
  }
  return { msg: '请求测试接口成功', result: arr }
})
