<!--
 * @Author: hidari
 * @Date: 2022-04-19 11:27:23
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-19 12:58:35
 * @FilePath: \shopping-centre-management\src\components\library\xtx-bread-item.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
