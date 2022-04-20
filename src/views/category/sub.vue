<!--
 * @Author: hidari
 * @Date: 2022-04-15 10:15:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-20 17:57:01
 * @FilePath: \shopping-centre-management\src\views\category\sub.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 商品面板 -->
      <div class="goods-list">
        <!-- 排序 -->
        <sub-sort @sort-change="sortChange"/>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <goods-item :goods="goods || {}" />
          </li>
        </ul>
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData"/>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref } from '@vue/reactivity'
import { reqFindSubCategoryGoods } from '@/api/category.js'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = async () => {
      loading.value = true
      // 设置二级分类ID
      reqParams.categoryId = route.params.categoryId
      const { result } = await reqFindSubCategoryGoods(reqParams)
      // 数据获取成功
      if (result.items.length) {
        // 有数据追加数据
        goodsList.value.push(...result.items)
        // 把 page 改为下一页
        reqParams.page++
        loading.value = false
      } else {
        // 没有数据 代表加载完成
        finished.value = true
      }
    }

    // 在更改二级分类时重新加载数据
    onBeforeRouteUpdate((to, from, next) => {
      if (to.path === `/category/sub/${to.params.id}`) {
        finished.value = false
        goodsList.value = [] // 列表为空 加载更多组件顶上来 进入可视区 加载数据
        reqParams = {
          page: 1,
          pageSize: 20
        }
        next()
      }
    })

    // 更改排序组件的排序属性 重新请求
    const sortChange = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams }
      // 合并请求参数 保留之前参数
      reqParams.page = 1
      goodsList.value = [] // 列表为空 加载更多组件顶上来 进入可视区 加载数据
      finished.value = false
    }
    // 更改筛选组件的筛选属性 重新请求
    const filterChange = (filterParams) => {
      finished.value = false
      // 合并请求参数 保留之前参数
      reqParams.page = 1
      goodsList.value = [] // 列表为空 加载更多组件顶上来 进入可视区 加载数据
      reqParams = { ...reqParams, ...filterParams }
    }
    return {
      getData,
      loading,
      finished,
      goodsList,
      sortChange,
      filterChange
    }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
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
</style>
