<!--
 * @Author: hidari
 * @Date: 2022-04-24 12:52:33
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-24 15:36:47
 * @FilePath: \shopping-centre-management\src\components\library\xtx-pagination.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-pagination"  v-if="total > 0">
    <a @click="changePager(myCurrentPage-1)" href="javascript:;" v-if="myCurrentPage > 1">上一页</a>
    <a href="javascript:;" v-else class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a @click="changePager(i)" href="javascript:;" v-for="i in pager.btnArr" :key="i" :class="{active: i === myCurrentPage}">{{i}}</a>
    <span v-if="pager.end < pager.pageCount">...</span>
    <a @click="changePager(myCurrentPage+1)" href="javascript:;" v-if="myCurrentPage < pager.pageCount">下一页</a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    // 需要数据：
    // 约定按钮个数：5个
    const count = 5
    // 当前显示的页码
    const myCurrentPage = ref(4)
    // 总页数 = 总条数 / 每页条数 向上取整
    const myTotal = ref(100)
    const myPageSize = ref(10)
    // 其他数据（总页数，起始按钮，结束按钮，按钮数组）可以根据上面数据得到
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      // 按钮个数，当前页码 => 起始按钮，结束按钮，按钮数组
      // 1. 理想情况下 =>
      const offset = Math.floor(count / 2)
      let start = myCurrentPage.value - offset
      let end = start + count - 1
      // 2. 特殊情况 如果起始页小于 1
      if (start < 1) {
        start = 1
        end = start + count - 1 > pageCount ? pageCount : (start + count - 1)
      }
      // 3. 特殊情况 结束页码不对
      if (end > pageCount) {
        end = pageCount
        start = end - count + 1 < 1 ? 1 : (end - count + 1)
      }

      // 目的：得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      // 提供计算属性数据

      return {
        pageCount,
        btnArr,
        start,
        end
      }
    })
    // 监听 props 变化 更改组件内部数据
    watch(props, () => {
      myTotal.value = props.total
      myPageSize.value = props.pageSize
      myCurrentPage.value = props.currentPage
    }, {
      immediate: true
    })

    // 切换分类函数
    const changePager = (page) => {
      myCurrentPage.value = page
      emit('current-change', page)
    }
    return {
      myCurrentPage,
      pager,
      changePager
    }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
