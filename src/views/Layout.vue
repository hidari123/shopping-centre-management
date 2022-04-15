<template>
<!-- 顶部通栏 -->
<app-topnav />
<!-- 头部组件 -->
<app-header />
<app-header-sticky/>
<!-- 内容容器 -->
<main class="app-body container">
    <!-- 二级路由 -->
    <router-view />
</main>
<!-- 底部组件 -->
<AppFooter/>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import { useStore } from 'vuex'
import AppHeaderSticky from '../components/app-header-sticky'
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  // 获取分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>
.app-body {
  min-height: 600px;
}
</style>
