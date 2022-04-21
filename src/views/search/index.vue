<!--
 * @Author: hidari
 * @Date: 2022-04-21 10:27:39
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 10:40:17
 * @FilePath: \shopping-centre-management\src\views\search\index.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-search-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>搜索 "{{ $route.query.keyword }}" 的结果：</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 排序区 -->
        <sub-sort  @change-sort="changeSort"/>
        <!-- 结果区 -->
        <ul class="goods-list">
          <li v-for="item in list" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <div v-if="!total" class="none">
          <img src="@/assets/images/none.png" alt="" />
          暂无数据
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import subSort from '../category/components/sub-sort.vue'
export default {
  components: { subSort },
  name: 'Search',
  setup () {
    const route = useRoute()
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      keyword: route.query.keyword,
      sortField: null,
      sortMethod: null
    })
    // 1. 无数据的暂时，根据total判断即可
    // 2. 排序条件改变更新数据
    // 2.1 子组件通过自定义事件传递数据给父组件，拿到排序数据给查询参数重新请求（第一页）即可
    const changeSort = (sortParams) => {
      reqParams.sortField = sortParams.sortField
      reqParams.sortMethod = sortParams.sortMethod
      reqParams.page = 1
    //   loadData()
    }
    // 3. 搜索关键字改变更新数据
    // 3.1 监听路由参数的变化，拿着新的关键字且排序需要重置，重新发请求（第一页）即可
    // 3.2 排序组件的排序效果需要重置
    onBeforeRouteUpdate((to, from, next) => {
      reqParams.keyword = to.query.keyword
      reqParams.sortField = null
      reqParams.sortMethod = null
      reqParams.page = 1
      //   loadData()
      next()
    })
    return {
      changeSort
    }
  }
}
</script>

<style lang="less" scoped>
.none {
  padding: 100px 0;
  text-align: center;
  color: #999;
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    object-fit: contain;
  }
}
.xtx-search-page {
  .wrapper {
    background-color: #fff;
    padding: 0 25px;
    .goods-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px;
      li {
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
