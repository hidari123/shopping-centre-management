<!--
 * @Author: hidari
 * @Date: 2022-04-28 19:41:02
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 18:01:05
 * @FilePath: \shopping-centre-management\src\views\member\order\detail.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <detail-steps :order="order" />
    <!-- 物流栏 -->
    <Suspense  v-if="[3,4,5].includes(order.orderState)">
      <!-- 组件加载完毕 -->
      <template #default>
        <DetailLogistics :order="order" />
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
    <detail-info :order="order" />
  </div>
</template>
<script>
import { ref } from 'vue'
import { reqFindOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action'
import DetailSteps from './components/detail-steps.vue'
import DetailLogistics from './components/detail-logistics.vue'
import DetailInfo from './components/detail-info.vue'
export default {
  name: 'OrderDetail',
  components: { DetailAction, DetailSteps, DetailLogistics, DetailInfo },
  setup () {
    const order = ref(null)
    const route = useRoute()
    reqFindOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
