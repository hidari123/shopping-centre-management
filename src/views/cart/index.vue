<!--
 * @Author: hidari
 * @Date: 2022-04-26 16:55:46
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 14:32:30
 * @FilePath: \shopping-centre-management\src\views\cart\index.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
                <!-- 不能直接操作 store 中的 state 用 :modelValue 绑定 给组件传值 -->
                <!-- getters 动态改变 -->
              <th width="120"><XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']" @change="checkAll">全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="$store.getters['cart/validList'].length===0">
              <td colspan="6">
                <cart-none />
              </td>
            </tr>
            <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
            <!-- 想要拿到默认参数，也想传参 可以返回一个函数 -->
            <!-- ($event) => checkOne(item.skuId,$event) -->
              <td><XtxCheckbox :modelValue="item.selected" @change="($event) => checkOne(item.skuId,$event)" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="">
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <!-- 选择规格组件 -->
                    <!-- 子组件传来的值不全 只有5个 需要拼接上未改变的旧值 从 item.skuId中取得 -->
                    <cart-sku :attrs-text="item.attrsText" :skuId="item.skuId" @change="$event => updateCartSku(item.skuId,$event)"/>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{item.nowPrice}}</p>
                <p v-if="item.price-item.nowPrice > 0">
                  比加入时降价
                  <span class="red">&yen;{{item.price-item.nowPrice}}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumbox @update:modelValue="$event => updateCount(item.skuId, $event)" :max="item.stock" :modelValue="item.count" />
              </td>
              <td class="tc"><p class="f16 red">&yen;{{Math.round(item.nowPrice*100*item.count/100)}}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;" @click="deleteCart(item.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length > 0">
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
              <td><XtxCheckbox style="color:#eee;" @change="checkAll" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="">
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <p class="attr">{{item.attrsText}}</p>
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;{{item.nowPrice}}</p></td>
              <td class="tc">{{item.count}}</td>
              <td class="tc"><p>&yen;{{item.nowPrice*100*item.count/100}}</p></td>
              <td class="tc">
                <p><a class="green" href="javascript:;"  @click="deleteCart(item.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']" @change="checkAll">全选</XtxCheckbox>
          <a href="javascript:;" @click="batchDeleteCart(false)">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedTotal']}} 件，商品合计：
          <span class="red">¥{{$store.getters['cart/selectedAmount']}}</span>
          <XtxButton type="primary">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/goods/components/goods-relevant'
import { useStore } from 'vuex'
import { getCurrentInstance } from '@vue/runtime-core'
import CartNone from './components/cart-none.vue'
import CartSku from './components/cart-sku.vue'
export default {
  name: 'Cart',
  components: { GoodRelevant, CartNone, CartSku },
  setup () {
    const instance = getCurrentInstance()
    const store = useStore()
    // 单选
    const checkOne = (skuId, selected) => {
      // 想要拿到默认参数，也想传参 可以返回一个函数
      // 传一下 $event 再接收一下
      // ($event) => checkOne(goods.skuId,$event)
      store.dispatch('cart/updateCart', { skuId, selected })
    }

    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAllCart', selected)
    }

    // 删除
    const deleteCart = (skuId) => {
      instance.proxy.$confirm({ text: '您确定从购物车删除该商品吗？' }).then(() => {
        store.dispatch('cart/deleteCart', skuId).then(() => {
          instance.proxy.$message({ type: 'success', text: '删除成功' })
        })
      }).catch(e => {
        instance.proxy.$message({ type: 'warn', text: '取消删除' })
      })
    }

    // 批量删除选中商品，也支持清空无效商品
    const batchDeleteCart = (isClear) => {
      instance.proxy.$confirm({ text: `您确定从购物车删除${isClear ? '失效' : '选中'}的商品吗？` }).then(() => {
        store.dispatch('cart/batchDeleteCart', isClear).then(() => {
          instance.proxy.$message({ type: 'success', text: '批量删除成功' })
        })
      }).catch(e => {
        instance.proxy.$message({ type: 'warn', text: '批量取消删除' })
      })
    }

    // 修改数量
    const updateCount = (skuId, count) => {
      store.dispatch('cart/updateCart', { skuId, count })
    }

    // 修改规格
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }
    return {
      checkOne,
      checkAll,
      deleteCart,
      batchDeleteCart,
      updateCount,
      updateCartSku
    }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
