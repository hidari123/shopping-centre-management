/*
 * @Author: hidari
 * @Date: 2022-04-14 11:40:26
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 17:33:21
 * @FilePath: \shopping-centre-management\src\store\modules\user.store.js
 * @Description: user模块 vuex
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        account: '',
        avatar: '',
        nickname: '',
        mobile: '',
        token: ''
      },
      // 登录后回调的路径
      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改回调地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}
