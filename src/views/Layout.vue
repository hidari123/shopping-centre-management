<template>
<!-- 顶部通栏 -->
<app-topnav />
<!-- 头部组件 -->
<app-header />
<!-- 内容容器 -->
<main class="app-body">
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
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter }
}
</script>

<style scoped lang='less'>
.app-body {
  min-height: 600px;
}
</style>
