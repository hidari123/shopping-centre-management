<!--
 * @Author: hidari
 * @Date: 2022-04-15 10:15:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-19 17:56:11
 * @FilePath: \shopping-centre-management\src\views\category\sub.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter }
}
</script>
