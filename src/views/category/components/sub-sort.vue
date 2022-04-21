<!--
 * @Author: hidari
 * @Date: 2022-04-20 14:26:27
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 09:20:51
 * @FilePath: \shopping-centre-management\src\views\category\components\sub-sort.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class='sub-sort'>
    <div class="sort">
  <a :class="{active:sortParams.sortField===null}" @click="changeSort(null)" href="javascript:;">默认排序</a>
      <a :class="{active:sortParams.sortField==='publishTime'}" @click="changeSort('publishTime')" href="javascript:;">最新商品</a>
      <a :class="{active:sortParams.sortField==='orderNum'}" @click="changeSort('orderNum')" href="javascript:;">最高人气</a>
      <a :class="{active:sortParams.sortField==='evaluateNum'}" @click="changeSort('evaluateNum')" href="javascript:;">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{active:sortParams.sortField==='price' && sortParams.sortMethod === 'asc'}" />
        <i class="arrow down" :class="{active:sortParams.sortField==='price' && sortParams.sortMethod === 'desc'}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from '@vue/reactivity'
import { onBeforeRouteUpdate } from 'vue-router'
export default {
  name: 'SubSort',
  emits: ['change-sort'],
  setup (props, { emit }) {
    // 实现交互
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // 切换效果
    // 1. 组件初始化的时候，查询是默认的排序，默认排序需要激活
    // 2. 查看后台排序数据的约定：
    // 2.1 sortField 参数 publishTime 最新商品 ,orderNum 最高人气 ,evaluateNum 评论最多, price价格
    // 2.2 sortMethod 参数 desc 降序  asc 升序  (sortField是价格)
    // 2.3 默认排序 sortField 为 null 即可，如果不是价格排序sortMethod需要是null
    // 这个组件产生的数据是最作为查询条件发给后台，字段需要和后台保持一致
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null
    })

    // 搜索参数（关键字）改变后效果重置
    onBeforeRouteUpdate((to, from, next) => {
      sortParams.sortField = null
      sortParams.sortMethod = null
      next()
    })

    // 提供给模板使用
    // 需要绑定按钮的点击事件修改排序字段和排序方式
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        // 点击价格
        sortParams.sortField = sortField
        // 处理排序
        if (sortParams.sortField !== 'price') {
          // 第一次点击 price
          sortParams.sortMethod = 'desc'
        } else {
          // 多次点击
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 当你点击的是已经激活的按钮，不做任何事情
        if (sortParams.sortField === sortField) return
        // 不是点击价格
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      // 触发 sort-change 事件
      // 通知父组件（排序数据）重新发请求
      emit('sort-change', sortParams)
    }

    const changeCheck = () => {
      // 触发 sort-change 事件
      emit('sort-change', sortParams)
    }
    return {
      sortParams,
      changeSort,
      changeCheck
    }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
