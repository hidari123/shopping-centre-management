<!--
 * @Author: hidari
 * @Date: 2022-04-22 14:45:07
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 15:52:08
 * @FilePath: \shopping-centre-management\src\components\library\xtx-numbox.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{label}}</div>
    <div class="numbox">
      <a @click="changeNum(-1)" href="javascript:;">-</a>
      <input type="text" readonly :value="num">
      <a @click="changeNum(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { watch } from 'vue'
// import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    }
  },
  //   setup (props, { emit }) {
  //     const num = useVModel(props, 'modelValue', emit)
  //     const changeNum = (value) => {
  //       const newValue = num.value + value
  //       if (newValue < props.min) return
  //       if (newValue > props.max) return
  //       num.value = newValue
  //       emit('change', newValue)
  //     }
  //     return { num, changeNum }
  //   }
  setup (props, { emit }) {
    // input初始化
    const num = ref(props.modelValue)

    // 使用侦听器 得到父组件传递数据 给 num 传递数据
    watch(() => props.modelValue, () => {
      num.value = props.modelValue
    }, {
      immediate: true
    })

    // 绑定按钮点击事件
    // 数据双向绑定
    const changeNum = (step) => {
      // 使用 emit 通知父组件 num 增减
      const newNum = num.value + step
      if (newNum < props.min) return
      if (newNum > props.max) return
      num.value = newNum
      emit('update:modelValue', num.value)
    }

    return {
      changeNum,
      num
    }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
