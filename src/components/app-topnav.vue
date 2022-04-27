<!--
 * @Author: hidari
 * @Date: 2022-04-14 17:52:54
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 15:35:26
 * @FilePath: \shopping-centre-management\src\components\app-topnav.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
            <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account}}</a></li>
            <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
            <li><router-link to="/login">请先登录</router-link></li>
            <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup () {
    // 获取用户的登录信息
    const store = useStore()
    // 使用 vuex 中的 state 需要设置计算属性
    const profile = computed(() => {
      return store.state.user.profile
    })

    // 退出登录
    const router = useRouter()
    const logout = () => {
    // 1. 清除本地存储信息和 vuex 中的用户信息
      store.commit('user/setUser', {})
      // 清空购物车
      store.commit('cart/setCart', [])
      // 2. 跳转登录
      router.push('/login')
    }
    return {
      profile,
      logout
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
    // ~选择器的作用：选择当前选择器后所有的元素
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
