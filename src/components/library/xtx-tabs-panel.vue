<!--
 * @Author: hidari
 * @Date: 2022-04-29 09:30:03
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 10:37:03
 * @FilePath: \shopping-centre-management\src\components\library\xtx-tabs-panel.vue
 * @Description: 标签 panel 组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <!-- 装载是内容 -->
  <div class="xtx-tabs-panel" v-show="name === activeName">
    <slot />
  </div>
</template>
<script>
import { inject } from '@vue/runtime-core'
// label 选项卡文字，name选项卡唯一标识，$slot.default 默认插槽内容
export default {
  name: 'XtxTabsPanel',
  props: {
    // 标签页标题文章
    label: {
      type: String,
      default: ''
    },
    // 唯一标识
    name: {
      type: [String, Number],
      default: ''
    }
  },
  setup () {
    const activeName = inject('activeName')
    return {
      activeName
    }
  }
}
</script>
<style scoped lang="less"></style>
