<!--
 * @Author: hidari
 * @Date: 2022-04-27 18:03:29
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-05 09:15:19
 * @FilePath: \shopping-centre-management\src\views\member\pay\checkout.vue
 * @Description: 订单组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem >填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper" v-if="checkoutInfo">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
            <checkout-address @change="changeAddress" @changeList="changeListCallback" :list="checkoutInfo.userAddresses" />
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkoutInfo.goods" :key="item.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="">
                    <div class="right">
                      <p>{{item.name}}</p>
                      <p>{{item.attrsText}}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{item.payPrice}}</td>
                <td>{{item.count}}</td>
                <td>&yen;{{item.totalPrice}}</td>
                <td>&yen;{{item.totalPayPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
         <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl><dt>商品件数：</dt><dd>{{checkoutInfo.summary.goodsCount}}件</dd></dl>
            <dl><dt>商品总价：</dt><dd>¥{{checkoutInfo.summary.totalPrice}}</dd></dl>
            <dl><dt>运<i></i>费：</dt><dd>¥{{checkoutInfo.summary.postFee}}</dd></dl>
            <dl><dt>应付总额：</dt><dd class="price">¥{{checkoutInfo.summary.totalPayPrice}}</dd></dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary" @click="submitOrder">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref } from 'vue'
import checkoutAddress from './components/checkout-address.vue'
import { reqCreateOrder, reqFindCheckoutInfo } from '@/api/order'
import { useRoute, useRouter } from 'vue-router'
import { reqFindOrderRepurchase } from '@/api/member'
export default {
  components: { checkoutAddress },
  name: 'Checkout',
  setup () {
    // 结算功能 => 生成订单 => 订单信息
    const checkoutInfo = ref(null)
    const route = useRoute()
    if (route.query.orderId) {
      // 按照订单结算
      reqFindOrderRepurchase(route.query.orderId).then(data => {
        checkoutInfo.value = data.result
        // 设置订单商品数据
        requestParams.goods = data.result.goods.map(({ skuId, count }) => ({ skuId, count }))
      })
    } else {
    // 按照购物车商品结算
      reqFindCheckoutInfo().then(data => {
        checkoutInfo.value = data.result
        // 把 goods 中的数据解构出来 生成新的数组
        requestParams.goods = data.result.goods.map(({ skuId, count }) => ({ skuId, count }))
      })
    }

    // 需要提交的字段
    const requestParams = reactive({
      // 切换地址或者修改默认地址 => 更改
      addressId: null,
      deliveryTimeType: 1,
      payType: 1,
      buyerMessage: '',
      // 商品信息 => 获取订单信息后设置
      goods: []
    })

    // 提交订单 需要收货地址 id
    const changeAddress = (id) => {
      requestParams.addressId = id
    }

    // 修改地址列表list的回调函数
    const changeListCallback = (formData) => {
      checkoutInfo.value.userAddresses.unshift(formData)
    }

    // 提交订单
    const instance = getCurrentInstance()
    const router = useRouter()
    const submitOrder = async () => {
      if (!requestParams.addressId) {
        return instance.proxy.$message({ text: '请选择收货地址', type: 'warn' })
      }
      const data = await reqCreateOrder(requestParams)
      // 提交订单成功
      instance.proxy.$message({ text: '提交订单成功！', type: 'success' })
      // 跳转到支付页面
      router.push({ path: '/member/pay', query: { id: data.result.id } })
    }
    return {
      checkoutInfo,
      changeAddress,
      changeListCallback,
      submitOrder
    }
  }
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,&:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
