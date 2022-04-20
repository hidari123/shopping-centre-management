<!--
 * @Author: hidari
 * @Date: 2022-04-15 10:15:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-20 10:02:29
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
      <!-- 测试复选框 -->
      <xtx-checkbox v-model="isAllChecked">111</xtx-checkbox>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
  setup () {
    const isAllChecked = ref(true)
    return {
      isAllChecked
    }
  }
}
</script>
