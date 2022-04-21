<!--
 * @Author: hidari
 * @Date: 2022-04-21 10:48:51
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 18:37:33
 * @FilePath: \shopping-centre-management\src\views\goods\index.vue
 * @Description: 商品详情
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class='xtx-goods-page'>
    <div class="container" v-if="loading">
      <div class="loading"></div>
    </div>
    <div class="container" v-else>
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem >{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
            <goods-image :images="goods.mainPictures"/>
            <goods-sales />
        </div>
        <div class="spec">
            <!-- 名字区组件 -->
            <goods-name :goods="goods"/>
            <!-- 规格组件 -->
            <goods-sku :goods="goods" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue'
import { reqFindGoods } from '@/api/product.js'
import GoodsRelevant from './components/goods-relevant'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
export default {
  name: 'Goods',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku },
  setup () {
    // 1. 获取商品详情，进行渲染
    const { goods, loading } = useGoods()
    return {
      goods,
      loading
    }
  }
}

// 获取商品详情
const useGoods = () => {
  const goods = ref(null)
  // 默认就是没有数据，加载中
  const loading = ref(true)
  const loadData = async (id) => {
    loading.value = true
    const { result } = await reqFindGoods(id)
    // 让商品数据为 null 使用 v-if 的组件 可以重新销毁和创建
    goods.value = null
    // 页面渲染完毕后执行
    nextTick(() => {
      goods.value = result
    })
    loading.value = false
  }
  const route = useRoute()
  onMounted(() => {
    loadData(route.params.id)
  })

  // 可能出现路由地址商品 ID 发生变化 但是不会重新初始化组件
  onBeforeRouteUpdate(async (to, from, next) => {
    if (`/product/${to.params.id}` === to.path) {
      loadData(to.params.id)
      next()
    }
  })
  return { goods, loading }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.loading {
  height: 600px;
  border-top: 72px solid #f5f5f5;
  background: #fff url(../../assets/images/load.gif) no-repeat center / 80px 80px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
