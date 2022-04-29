<!--
 * @Author: hidari
 * @Date: 2022-04-29 17:23:44
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 17:40:47
 * @FilePath: \shopping-centre-management\src\views\member\order\components\detail-steps.vue
 * @Description: 使用steps组件显示订单进度
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="detail-steps" style="padding:20px">
    <XtxSteps :active="order.orderState===6?1:order.orderState">
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="order.payTime" />
      <XtxStepsItem title="商品发货" :desc="order.consignTime" />
      <XtxStepsItem title="确认收货" :desc="order.evaluationTime" />
      <XtxStepsItem title="订单完成" :desc="order.endTime" />
    </XtxSteps>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'DetailSteps'
}
</script>
<style scoped lang="less">

</style>
