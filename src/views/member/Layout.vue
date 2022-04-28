<!--
 * @Author: hidari
 * @Date: 2022-04-28 16:01:19
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 16:01:20
 * @FilePath: \shopping-centre-management\src\views\member\Layout.vue
 * @Description: 个人中心布局容器组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="container">
    <AppMemberAside />
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>
<script>
import AppMemberAside from '@/components/app-member-aside'
export default {
  name: 'MemberLayout',
  components: {
    AppMemberAside
  }
}
</script>
<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
