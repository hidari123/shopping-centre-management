<!--
 * @Author: hidari
 * @Date: 2022-04-28 15:42:34
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 15:52:09
 * @FilePath: \shopping-centre-management\src\views\member\pay\result.vue
 * @Description:支付回调页面
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付结果</XtxBreadItem>
      </XtxBread>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span v-if="$route.query.payResult" class="iconfont icon-queren2 green"></span>
        <span v-else class="iconfont icon-shanchu red" ></span>
        <p class="tit">订单支付{{$route.query.payResult ? '成功' : '失败'}}</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>支付宝支付</span></p>
        <p>
          支付金额：<span class="red">¥ {{ order?.payMoney }}</span>
        </p>
        <div class="btn">
          <XtxButton @click="$router.push('/member/order')" type="primary" style="margin-right:20px">查看订单</XtxButton>
          <XtxButton @click="$router.push('/')" type="gray">进入首页</XtxButton>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { reqFindOrderDetail } from '@/api/order'
export default {
  name: 'PayResult',
  setup () {
    const order = ref(null)
    const route = useRoute()
    onMounted(async () => {
      const data = await reqFindOrderDetail(route.query.orderId)
      order.value = data.result
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
