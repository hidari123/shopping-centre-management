<!--
 * @Author: hidari
 * @Date: 2022-04-21 11:55:50
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 13:06:40
 * @FilePath: \shopping-centre-management\src\views\goods\components\goods-image.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="goods-image">
      <!-- 大图 -->
      <div class="large" v-show="show" :style="[{backgroundImage:`url(${images[currIndex]})`}, largePosition]"></div>
      <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩色块 -->
      <div class="layer" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 当前预览图的索引
    const currIndex = ref(0)

    const {
      target,
      layerPosition,
      largePosition,
      show
    } = usePreviewImg()
    return {
      currIndex,
      show,
      layerPosition,
      largePosition,
      target
    }
  }
}
// 使用 useMouseInElement 得到基于元素左上角的坐标和是否进入 / 离开元素数据
const usePreviewImg = () => {
  // 是否显示遮罩和大图
  const show = ref(false)

  // 设置遮罩层图标（样式）
  const layerPosition = reactive({
    left: 0,
    top: 0
  })

  // 大图的背景定位
  const largePosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0
  })

  const target = ref(null)
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  // 因为这三个值都是 ref 类型的 可以直接监听
  watch([elementX, elementY, isOutside], () => {
    // 根据数据设置样式数据和是否显示数据
    show.value = !isOutside.value

    // 计算坐标
    const position = { left: 0, top: 0 }
    if (elementX.value < 100) position.left = 0
    else if (elementX.value > 300) position.left = 200
    else position.left = elementX.value - 100

    if (elementY.value < 100) position.top = 0
    else if (elementY.value > 300) position.top = 200
    else position.top = elementY.value - 100

    // 给样式赋值
    layerPosition.left = position.left + 'px'
    layerPosition.top = position.top + 'px'
    largePosition.backgroundPositionX = -2 * position.left + 'px'
    largePosition.backgroundPositionY = -2 * position.top + 'px'
  })
  return {
    target,
    layerPosition,
    largePosition,
    show
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
