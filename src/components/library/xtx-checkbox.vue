<!--
 * @Author: hidari
 * @Date: 2022-04-20 09:48:54
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-20 10:00:21
 * @FilePath: \shopping-centre-management\src\components\library\xtx-checkbox.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->

<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 如果插槽内容存在则显示 -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
/**
 * v-model => :modelValue + @update:modelValue
 */
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      // 使用 emit 通知父组件状态改变
      emit('update:modelValue', checked.value)
    }
    // 使用侦听器 得到父组件传递数据 给 checked 传递数据
    watch(() => props.modelValue, () => {
      checked.value = props.modelValue
    }, {
      immediate: true
    })
    return {
      checked,
      changeChecked
    }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
