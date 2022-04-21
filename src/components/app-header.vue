<!--
 * @Author: hidari
 * @Date: 2022-04-14 18:27:01
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 10:23:58
 * @FilePath: \shopping-centre-management\src\components\app-header.vue
 * @Description: 头部区域 + 搜索
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input @keyup.enter="search" v-model="keyword" type="text" placeholder="搜一搜">
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import AppHeaderNav from './app-header-nav'
export default {
  name: 'AppHeader',
  components: { AppHeaderNav },
  setup () {
    // 需求：搜索框输入后回车跳转搜索
    // 1. 双向绑定搜索框
    // 2. 绑定按键为 enter 事件
    // 3. 跳转搜索地址，携带搜索关键字
    // 4. 清楚搜索框，失去焦点
    const router = useRouter()
    const keyword = ref('')
    const search = (e) => {
      // 为了查询更多数据，允许空字符串跳过，实际开发需要校验
      router.push(`/search?keyword=${keyword.value}`)
      keyword.value = ''
      e.target.blur()
    }
    return {
      search,
      keyword
    }
  }
}
</script>

<style scoped lang='less'>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.png) no-repeat center 18px / contain;
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
  .cart {
    width: 50px;
    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart{
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: @helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
