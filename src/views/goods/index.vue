<!--
 * @Author: hidari
 * @Date: 2022-04-21 10:48:51
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 17:42:16
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
            <goods-sku :goods="goods" :skuId="floorPriceId" @change="changeSku"/>
            <!-- 数量选择组件 -->
            <xtx-numbox label="数量" v-model="count" :max="goods.inventory" />
            <XtxButton type="primary" style="margin-top:20px;" @click="insertCart">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
              <goods-tabs />
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
              <goods-warn />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
            <goods-hot :type="1"/>
            <goods-hot :type="2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, nextTick, onMounted, provide, ref } from 'vue'
import { reqFindGoods } from '@/api/product.js'
import GoodsRelevant from './components/goods-relevant'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
import { useStore } from 'vuex'
export default {
  name: 'Goods',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup () {
    const changeSku = (sku) => {
      // 修改商品的现价 / 原价信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      // 记录选择后的 sku 可能有数据 可能是空对象
      currSku.value = sku
    }

    /**
     * 数字排序（数字和升序）：
     * var points = [40,100,1,5,25,10];
     * points.sort(function(a,b){return a-b});
     * fruits输出结果：
     * 1,5,10,25,40,100
     */
    /**
     * 数字排序（数字和降序）：
     * var points = [40,100,1,5,25,10];
     * points.sort(function(a,b){return b-a});
     * fruits输出结果：
     * 100,40,25,10,5,1
     */
    const comparePrice = (prop) => {
      return function (a, b) {
        var value1 = a[prop]
        var value2 = b[prop]
        return value1 - value2
      }
    }

    // 1. 获取商品详情，进行渲染
    const { goods, loading } = useGoods()

    // 获取价格最低的其中一件商品的skuId
    const floorPriceId = computed(() => {
      let skus = goods.value.skus
      if (skus) {
        skus = skus.sort(comparePrice('price'))[0].id
      }
      return skus
    })

    // 选择的数量
    const count = ref(1)

    // 提供 goods 数据给后代使用
    provide('goods', goods)

    // 加入购物车
    const instance = getCurrentInstance()
    const store = useStore()
    const currSku = ref(null)
    const insertCart = () => {
      // 判断规格是否完整
      if (!currSku.value || !currSku.value.skuId) {
        return instance.proxy.$message({ type: 'warn', text: '请选择商品规格' })
      }
      // 选择完整
      if (count.value > goods.inventory) {
        return instance.proxy.$message({ type: 'warn', text: '库存不足' })
      }
      const { id, name, price, mainPictures } = goods.value
      const { skuId, specsText: attrsText, inventory: stock } = currSku.value
      store.dispatch('cart/insertCart', {
        skuId,
        attrsText,
        stock,
        id,
        name,
        price,
        nowPrice: price,
        picture: mainPictures[0],
        selected: true,
        isEffective: true,
        count: count.value
      }).then(
        instance.proxy.$message({ text: '加入购物车成功', type: 'success' })
      )
    }
    return {
      goods,
      loading,
      changeSku,
      floorPriceId,
      count,
      insertCart
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
