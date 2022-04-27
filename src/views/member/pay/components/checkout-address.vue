<!--
 * @Author: hidari
 * @Date: 2022-04-27 18:09:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 18:51:01
 * @FilePath: \shopping-centre-management\src\views\member\pay\components\checkout-address.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <!-- 手机号分成3段 $1 => 第一段 **** => 第二段 $2 => 第三段 -->
        <li><span>联系方式：</span>{{showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
export default {
  name: 'CheckoutAddress',
  props: {
    // 收货地址列表
    list: {
      type: Array,
      default: () => []
    }
  },
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
