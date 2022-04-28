<!--
 * @Author: hidari
 * @Date: 2022-04-28 10:08:19
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 12:32:16
 * @FilePath: \shopping-centre-management\src\components\library\xtx-dialog.vue
 * @Description: 提示框组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
    <!-- 动画和显示要有时间差 不能一起 前面写 visible 稍后再显示fade（定时器） -->
  <div class="xtx-dialog" v-show="visible" :class="{fade}">
    <div class="wrapper" :class="{fade}">
      <div class="header">
        <h3>{{title}}</h3>
        <a @click="closeDialog" href="JavaScript:;" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
          <slot name="footer"/>
      </div>
    </div>
  </div>
</template>
<script>
// vue3 v-model:visible 语法糖 拆解 (:visible => 传值 + @update:visible => 改值)
// vue2 visible.sync 语法糖 拆解 (:visible => 传值 + @update:visible => 改值)
import { ref, watch } from 'vue'
export default {
  name: 'XtxDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup (props, { emit }) {
    const fade = ref(false)

    // visible => true => 打开 => 控制 fade
    // visible => false => 关闭 => 控制 fade
    watch(() => props.visible, (newVal) => {
      // 结构和样式同时加上无过度效果，需要些延时。
      setTimeout(() => {
        fade.value = newVal
      }, 0)
    }, {
      immediate: true
    })

    // 关闭对话框 => 修改父组件数据状态
    const closeDialog = () => {
      emit('update:visible', false)
    }
    return { fade, closeDialog }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0,0,0,0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0,0,0,.5);
  }
  .wrapper {
    width: 600px;
    max-height: 600px;
    overflow: auto;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%,-50%);
      opacity: 1;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
