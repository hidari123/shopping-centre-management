/*
 * @Author: hidari
 * @Date: 2022-04-14 11:53:40
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 19:38:43
 * @FilePath: \shopping-centre-management\src\utils\request.js
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net'
const instance = axios.create({
  // axios 配置 baseURL timeout
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有token就在头部携带
  // 1. 获取用户信息对象
  const { profile } = store.state.user
  // 2. 判断是否有token
  if (profile.token) {
    // 3. 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
// res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码 => 无效
  // && => 排除没有响应的接口
  if (err.response && err.response.status === 401) {
    // 1. 清空无效用户信息
    // 2. 跳转到登录页
    // 3. 跳转需要传参（当前路由地址）给登录页码
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件中：`/user?a=10` $route.path => /user  $route.fullPath => /user?a=10
    // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
    // 有特殊字符可能造成地址解析有问题，需要 encodeURIComponent 转码
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 如果是 get 请求 => params 传递 submitData
    // 不是 get 请求 => data 传递 submitData
    // const a = {name: 100} a.name a[10 > 9 ? 'name': 'age'] => [] 中可以写js表达式
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
