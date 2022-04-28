<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [订单模块](#%E8%AE%A2%E5%8D%95%E6%A8%A1%E5%9D%97)
  - [结算](#%E7%BB%93%E7%AE%97)
    - [页面布局](#%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80)
    - [渲染页面](#%E6%B8%B2%E6%9F%93%E9%A1%B5%E9%9D%A2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-04-28 09:51:23
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 10:06:23
 * @FilePath: \shopping-centre-management\markdown\ORDER.md
 * @Description: 订单模块
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->

# 订单模块

## 结算

### 页面布局

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1615272228114.3a8212d8.png)

落地代码：

定义组件基础解构和配置路由
`src/views/member/pay/checkout.vue` 定义组件

```vue
<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem >填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <!-- 商品信息 -->
        <!-- 配送时间 -->
        <!-- 支付方式 -->
        <!-- 金额明细 -->
        <!-- 提交订单 -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XtxPayCheckoutPage'
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
  }
}
</style>
```

`src/router/index.js` 配置路由

```js
const PayCheckout = () => import('@/views/member/pay/checkout')
```
```diff
      { path: '/cart', component: Cart },
+     { path: '/member/checkout', component: PayCheckout }
```

完成页面布局效果
```vue
<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem >填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
              <ul>
                <li><span>收<i/>货<i/>人：</span>朱超</li>
                <li><span>联系方式：</span>132****2222</li>
                <li><span>收货地址：</span>海南省三亚市解放路108号物质大厦1003室</li>
              </ul>
              <a href="javascript:;">修改地址</a>
            </div>
            <div class="action">
              <XtxButton class="btn">切换地址</XtxButton>
              <XtxButton class="btn">添加地址</XtxButton>
            </div>
          </div>
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
              <tr v-for="i in 4" :key="i">
                <td>
                  <a href="javascript:;" class="info">
                    <img src="https://yanxuan-item.nosdn.127.net/cd9b2550cde8bdf98c9d083d807474ce.png" alt="">
                    <div class="right">
                      <p>轻巧多用锅雪平锅 麦饭石不粘小奶锅煮锅</p>
                      <p>颜色：白色 尺寸：10cm 产地：日本</p>
                    </div>
                  </a>
                </td>
                <td>&yen;100.00</td>
                <td>2</td>
                <td>&yen;200.00</td>
                <td>&yen;200.00</td>
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
            <dl><dt>商品件数：</dt><dd>5件</dd></dl>
            <dl><dt>商品总价：</dt><dd>¥5697.00</dd></dl>
            <dl><dt>运<i></i>费：</dt><dd>¥0.00</dd></dl>
            <dl><dt>应付总额：</dt><dd class="price">¥5697.00</dd></dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XtxPayCheckoutPage'
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
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;  
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
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
```

### 渲染页面

> 目的：分离收货地址组件，渲染页面默认内容。

大致步骤：

- 分离收货地址组件
- 定义获结算信息API接口
- 页面组件获取数据，传入地址组件，渲染剩余内容
- 渲染地址组件

落地代码：

分离收货地址组件
`src/member/pay/components/checkout-address.vue` 定义组件
```vue
<template>
  <div class="checkout-address">
    <div class="text">
      <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
      <ul>
        <li><span>收<i/>货<i/>人：</span>朱超</li>
        <li><span>联系方式：</span>132****2222</li>
        <li><span>收货地址：</span>海南省三亚市解放路108号物质大厦1003室</li>
      </ul>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckoutAddress'
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
```

`src/views/member/pay/checkout.vue` 使用组件

```diff
+import CheckoutAddress from './components/checkout-address'
export default {
  name: 'XtxPayCheckoutPage',
+  components: { CheckoutAddress }
}
```
```diff
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
+          <CheckoutAddress />
        </div>
```
原有结构和样式代码需要删除。

- 定义获结算信息API接口
`src/api/order.js` 定义接口
```js
import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}
```

- 页面组件获取数据，传入地址组件，渲染剩余内容

`src/views/member/pay/checkout.vue` 获取数据

```diff
+import { findCheckoutInfo } from '@/api/order'
export default {
  name: 'XtxPayCheckoutPage',
  components: { CheckoutAddress },
  setup () {
+    const checkoutInfo = ref(null)
+    findCheckoutInfo().then(data => {
+      checkoutInfo.value = data.result
+    })
+    return { checkoutInfo }
  }
}
```
`src/views/member/pay/checkout.vue` 传入地址组件，地址列表
```diff
+      <div class="wrapper" v-if="checkoutInfo">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
+          <CheckoutAddress :list="checkoutInfo.userAddresses" />
        </div>
```

`src/views/member/pay/checkout.vue` 渲染剩余内容

```vue
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
```
```vue
          <div class="total">
            <dl><dt>商品件数：</dt><dd>{{checkoutInfo.summary.goodsCount}}件</dd></dl>
            <dl><dt>商品总价：</dt><dd>¥{{checkoutInfo.summary.totalPrice}}</dd></dl>
            <dl><dt>运<i></i>费：</dt><dd>¥{{checkoutInfo.summary.postFee}}</dd></dl>
            <dl><dt>应付总额：</dt><dd class="price">¥{{checkoutInfo.summary.totalPayPrice}}</dd></dl>
          </div>
```

- 渲染地址组件
`src/member/pay/components/checkout-address.vue`

- 接收数据
```js
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
```
- 得到默认显示地址
```js
  setup (props) {
    // 1. 找到默认收货地址
    // 2. 没有默认收货地址，显示第一条收货地址
    // 3. 如果没有数据 => 请添加一条数据
    const showAddress = ref(null)
    if (props.list.length) {
      const defaultAddress = props.list.find(item => item.isDefault === 1)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        // 在子组件中获取参数值的时候，是会使得这个参数丢失响应式属性的，
        // 要通过 props 来直接引用，官方提供有 toRefs 方法可以转化为响应式数据。可以直接用这个方法转化
        // 可以写成计算属性 => 计算属性不能修改
        /**
         * toRef和ref一样都是生成影响式数据的API，但是toRef和ref又有一定的区别
         * toRef和传入的数据形成引用关系，修改toRef会影响之的数据，但是不会更新UI
         * ref是单纯的复制,影响不影响之前复制的数据，取决于复制的数据类型，但是会更新UI
         * ref 数据会引起监听行为，而 toRef 不会
         */
        showAddress.value = computed(() => props.list[0])
      }
    }

    return {
      showAddress
    }
  }
```

- 渲染组件

```vue
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
```

### 对话框组件封装