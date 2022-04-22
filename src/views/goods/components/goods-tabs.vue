<!--
 * @Author: hidari
 * @Date: 2022-04-22 17:00:27
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 17:56:00
 * @FilePath: \shopping-centre-management\src\views\goods\components\goods-tabs.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="goods-tabs">
    <nav>
      <a @click="activeName = 'GoodsDetail'" :class="{active: activeName === 'GoodsDetail'}" href="javascript:;">商品详情</a>
      <a @click="activeName = 'GoodsComment'" :class="{active: activeName === 'GoodsComment'}" href="javascript:;">商品评价<span>({{goods.commentCount}})</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <!-- 动态切换组件 => component 组件-->
    <!-- is 属性用来决定 component 组件应该渲染为哪个组件 写组件名称 -->
    <component :is="activeName"></component>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import GoodsComment from './goods-comment.vue'
import GoodsDetail from './goods-detail.vue'
import { inject } from '@vue/runtime-core'
export default {
  components: { GoodsComment, GoodsDetail },
  name: 'GoodsTabs',
  setup () {
    // detail-->详情   comment-->评价
    const activeName = ref('GoodsDetail')
    // goods 详情数据
    const goods = inject('goods')
    return {
      activeName,
      goods
    }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
