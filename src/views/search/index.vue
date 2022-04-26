<!--
 * @Author: hidari
 * @Date: 2022-04-21 10:27:39
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 12:38:26
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
        <sub-sort  @sort-change="changeSort"/>
        <!-- 结果区 -->
        <ul class="goods-list">
          <li v-for="item in list" :key="item.id">
            <goods-item :goods="item" />
          </li>
        </ul>
        <div v-if="!total" class="none">
          <img src="@/assets/images/none.png" alt="" />
          暂无数据
        </div>
        <!-- 分页区 -->
        <XtxPagination
          v-if="total"
          :total="total"
          :page-size="reqParams.pageSize"
          :current-page="reqParams.page"
          @current-change="changePager"
        />
    </div>
  </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import subSort from '../category/components/sub-sort.vue'
import { reqGetSearchGoods, reqGetSearchKeyword } from '@/api/search'
import GoodsItem from '../category/components/goods-item.vue'
export default {
  components: { subSort, GoodsItem },
  name: 'Search',
  setup () {
    // 分页切换
    // 1. 准备好查询参数对象
    // 2. 准备API函数
    // 3. 组件初始化的时候，调用API获取数据
    // 4. 渲染列表 和 分页组件
    // 5. 监听分页改变，更新列表
    const route = useRoute()
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      keyword: null,
      sortField: null,
      sortMethod: null
    })

    // 列表
    const list = ref([])
    // 总数
    const total = ref(0)

    // 获取数据
    const loadData = async () => {
      const { result } = await reqGetSearchGoods(reqParams)
      list.value = result.pageData.items
      total.value = result.pageData.counts
      console.log(list.value)
    }

    // 获取提示词
    const getTips = async () => {
      const res = await reqGetSearchKeyword(JSON.stringify(route.query.keyword))
      console.log(res)
    }
    onMounted(() => {
      loadData()
      getTips()
    })

    // 分页切换
    const changePager = (newPage) => {
      reqParams.page = newPage
      loadData()
      getTips()
    }

    // 1. 无数据的暂时，根据total判断即可
    // 2. 排序条件改变更新数据
    // 2.1 子组件通过自定义事件传递数据给父组件，拿到排序数据给查询参数重新请求（第一页）即可
    const changeSort = (sortParams) => {
      reqParams.sortField = sortParams.sortField
      reqParams.sortMethod = sortParams.sortMethod
      reqParams.page = 1
      loadData()
      getTips()
    }

    // 3. 搜索关键字改变更新数据
    // 3.1 监听路由参数的变化，拿着新的关键字且排序需要重置，重新发请求（第一页）即可
    // 3.2 排序组件的排序效果需要重置
    onBeforeRouteUpdate((to, from, next) => {
      reqParams.keyword = to.query.keyword
      reqParams.sortField = null
      reqParams.sortMethod = null
      reqParams.page = 1
      loadData()
      getTips()
      next()
    })
    return {
      changeSort,
      list,
      total,
      changePager,
      reqParams
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
