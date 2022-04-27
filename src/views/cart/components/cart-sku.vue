<!--
 * @Author: hidari
 * @Date: 2022-04-27 13:04:53
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 14:37:43
 * @FilePath: \shopping-centre-management\src\views\cart\components\cart-sku.vue
 * @Description: 商品规格
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
        <goods-sku @change="changeSku" v-if="goods" :skuId="skuId" :goods="goods"  />
      <XtxButton v-if="goods" type="primary" size="mini" style="margin-left:60px" @click="submit">确认</XtxButton>
      <div v-else class="loading"></div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { reqGetSpecsAndSkus } from '@/api/cart'
import goodsSku from '@/views/goods/components/goods-sku.vue'
export default {
  components: { goodsSku },
  name: 'CartSku',
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  emits: {
    change: null
  },
  setup (props, { emit }) {
    const visible = ref(false)
    const goods = ref(null)
    // 打开
    const open = () => {
      visible.value = true
      // 获取当前spec和sku数据
      reqGetSpecsAndSkus(props.skuId).then(data => {
        goods.value = data.result
      })
    }
    // 关闭
    const close = () => {
      visible.value = false
      goods.value = null
    }
    // 切换
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击其他地方关闭
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    // 监听 sku 改变的函数 记录 sku 信息
    const currSku = ref(null)
    const changeSku = (sku) => {
      currSku.value = sku
    }

    // 点击确认 => 更改后的 sku 信息传递给父组件（购物车组件）
    const submit = () => {
      console.log(currSku.value)
      // 给购物车组件数据的前提：有sku信息，sku信息完整，sku中的skuId不能现有props.skuId一样
      if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        // 通知父组件
        emit('change', currSku.value)
        close()
      }
    }
    return {
      visible,
      open,
      close,
      toggle,
      target,
      goods,
      changeSku,
      submit
    }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
