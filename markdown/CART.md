<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [购物车模块](#%E8%B4%AD%E7%89%A9%E8%BD%A6%E6%A8%A1%E5%9D%97)
  - [功能分析](#%E5%8A%9F%E8%83%BD%E5%88%86%E6%9E%90)
  - [加入购物车-本地](#%E5%8A%A0%E5%85%A5%E8%B4%AD%E7%89%A9%E8%BD%A6-%E6%9C%AC%E5%9C%B0)
    - [头部购物车](#%E5%A4%B4%E9%83%A8%E8%B4%AD%E7%89%A9%E8%BD%A6)
      - [基础布局](#%E5%9F%BA%E7%A1%80%E5%B8%83%E5%B1%80)
      - [商品列表-本地](#%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8-%E6%9C%AC%E5%9C%B0)
      - [删除操作-本地](#%E5%88%A0%E9%99%A4%E6%93%8D%E4%BD%9C-%E6%9C%AC%E5%9C%B0)
    - [购物车页面](#%E8%B4%AD%E7%89%A9%E8%BD%A6%E9%A1%B5%E9%9D%A2)
      - [基础布局](#%E5%9F%BA%E7%A1%80%E5%B8%83%E5%B1%80-1)
      - [列表展示-本地](#%E5%88%97%E8%A1%A8%E5%B1%95%E7%A4%BA-%E6%9C%AC%E5%9C%B0)
      - [单选操作-本地](#%E5%8D%95%E9%80%89%E6%93%8D%E4%BD%9C-%E6%9C%AC%E5%9C%B0)
      - [全选操作-本地](#%E5%85%A8%E9%80%89%E6%93%8D%E4%BD%9C-%E6%9C%AC%E5%9C%B0)
      - [删除操作-本地](#%E5%88%A0%E9%99%A4%E6%93%8D%E4%BD%9C-%E6%9C%AC%E5%9C%B0-1)
      - [确认框组件](#%E7%A1%AE%E8%AE%A4%E6%A1%86%E7%BB%84%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-04-26 11:10:53
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 11:46:26
 * @FilePath: \shopping-centre-management\markdown\CART.md
 * @Description: 购物车模块
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->

# 购物车模块

## 功能分析

> 目的：了解购物车两种状态下的操作逻辑，方便后续的开发理解。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1614324821761.861aa767.png)

总结：

- 购物车的各种操作都会有两种状态的区分，但是不会在组件中去区分。
- 而是在封装在vuex中的actions中去区分，在组件上只需调用actions即可。
- 在actions中通过user信息去区分登录状态
    - 未登录，通过mutations修改vuex中的数据即可，vuex已经实现持久化，会同步保持在本地。
    - 已登录，通过api接口去服务端操作，响应成功后通过mutations修改vuex中的数据即可，它也会同步在本地。
- 不管何种操作何种状态返回一个promise，然后组件能够判断操作是否完毕是否成功，再而去做其他事情。
注意：

- 登录后，需要合并本地购物车到服务端。
- 退出后，清空vuex数据也会同步清空本地数据。

## 加入购物车-本地

> 目的：完成商品详情的添加购物车操作，支持未登录状态。

大致步骤：

- 约定本地存储的信息内容
- 编写mutaions添加购物车逻辑
- 编写actions进行添加操作
- 在商品详情页实现添加逻辑

落地代码：

- vuex中的修改数据，获取数据 `src/store/module/cart.js`

```js
  mutations: {
    /**
     * 加入购物车
     * @param {*} state
     * @param {Object} payload => 需要添加到购物车的商品
     */
    insertCart (state, payload) {
      // payload 字段
      // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
      // 线上：比上面多 isCollect 有用 discount 无用 两项项信息
      // 插入数据规则：先找是否有相同商品
      // 1. 有相同商品 => 查询数量，数量累加，再保存在最新的位置，原来商品删除
      // 2. 没有相同商品 => 保存在最新位置
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      // 如果找到了
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    }
  },
    actions: {
    /**
     * 加入购物车
     * @param {*} ctx 执行上下文 包含 context 等
     * @param {*} payload 需要添加到购物车中的商品
     */
    insertCart (ctx, payload) {
      // 区分已登录和未登录
      // 已登录 => 异步，未登录 => 同步
      return new Promise((resolve, reject) => {
        // rootState => 所有模块
        if (ctx.rootState.user.profile.token) {
        // TODO 已登录
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          // promise 要有 resolve 拿到信息
          resolve()
        }
      })
    }
  }
```

商品详情点击加入购物车 `src/views/goods/index.vue`

```diff
    const changeSku = (sku) => {
      // 修改商品的现价 / 原价信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
+      // 记录选择后的 sku 可能有数据 可能是空对象
+      currSku.value = sku
    }
```
```js
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
```

### 头部购物车

#### 基础布局

> 目的：在网站头部购物车图片处，鼠标经过展示购物车列表。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1614736222931.60b42d5c.png)

大致步骤：

- 提取头部购物车组件，完成基础布局。
- 通过`getters`返回有效商品总数，和有效商品列表。
- 渲染组件。

落地代码：

新建组件 `src/components/app-header-cart.vue`

```vue
<template>
  <div class="cart">
    <a class="curr" href="#"> <i class="iconfont icon-cart"></i><em>2</em> </a>
  </div>
</template>
<script>
export default {
  name: 'AppHeaderCart'
}
</script>
<style scoped lang="less">
.cart {
  width: 50px;
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
    .icon-cart {
      font-size: 22px;
    }
    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: @helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }
}
</style>
```

- 使用组件，和**删除迁移过的代码** `src/components/app-header.vue`

```diff
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
+      <AppHeaderCart />
    </div>
  </header>
</template>

<script>
import AppHeaderNav from './app-header-nav'
+import AppHeaderCart from './app-header-cart'
export default {
  name: 'AppHeader',
+  components: { AppHeaderNav, AppHeaderCart }
}
</script>
```

- 基础布局和弹出效果 `src/components/app-header-cart.vue`

```vue
<template>
  <div class="cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i><em>2</em>
    </a>
    <div class="layer">
      <div class="list">
        <div class="item" v-for="i in 4" :key="i">
          <RouterLink to="">
            <img src="https://yanxuan-item.nosdn.127.net/ead73130f3dbdb3cabe1c7b0f4fd3d28.png" alt="">
            <div class="center">
              <p class="name ellipsis-2">和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
              <p class="attr ellipsis">颜色：修复绿瓶 容量：150ml</p>
            </div>
            <div class="right">
              <p class="price">&yen;45.00</p>
              <p class="count">x2</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 3 件商品</p>
          <p>&yen;135.00</p>
        </div>
        <XtxButton type="plain">去购物车结算</XtxButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppHeaderCart'
}
</script>
<style scoped lang="less">
.cart {
  width: 50px;
  position: relative;
  z-index: 600;
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
    .icon-cart {
      font-size: 22px;
    }
    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: @helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }
  &:hover {
    .layer {
      opacity: 1;
      transform: none
    }
  }
  .layer {
    opacity: 0;
    transition: all .4s .2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;
    &::before {
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6,1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0,0,0,0.1);
    }
    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;
      .total {
        padding-left: 10px;
        color: #999;
        p {
          &:last-child {
            font-size: 18px;
            color: @priceColor;
          }
        }
      }
    }
  }
  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;
    &::-webkit-scrollbar{
      width:10px;
      height:10px;
    }
    &::-webkit-scrollbar-track{
      background: #f8f8f8;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb{
      background: #eee;
      border-radius:10px;
    }
    &::-webkit-scrollbar-thumb:hover{
      background: #ccc;
    }
    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;
      i {
          position: absolute;
          bottom: 38px;
          right: 0;
          opacity: 0;
          color: #666;
          transition: all .5s;
      }
      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }
      a {
        display: flex;
        align-items: center;
        img {
          height: 80px;
          width: 80px;
        }
        .center {
          padding: 0 10px;
          width: 200px;
          .name {
            font-size: 16px;
          }
          .attr {
            color: #999;
            padding-top: 5px;
          }
        }
        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;
          .price {
            font-size: 16px;
            color: @priceColor;
          }
          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
```

- 使用getters得到有效商品列表和期种件数

```js
  getters: {
    // 有效商品列表
    validList (state) {
      // 库存 > 1，有效商品标识为 true
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal (state, getters) {
      return getters.validList.reduce(
        (p, c) => p + c.count, 0
      )
    },
    // 有效商品总金额
    validAmount (state, getters) {
      // 处理计算结果（浮点数）
      return getters.validList.reduce((p, c) => p + Math.round((c.nowPrice * 100) * c.count), 0) / 100
    }
  }
```

- 渲染头部购物车信息

```vue
<template>
  <div class="cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i><em>{{$store.getters['cart/validTotal']}}</em>
    </a>
    <div class="layer">
      <div class="list">
        <div class="item" v-for="item in $store.getters['cart/validList']" :key="item.skuId">
          <RouterLink to="">
            <img :src="item.picture" alt="">
            <div class="center">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="attr ellipsis">{{item.attrsText}}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{item.nowPrice}}</p>
              <p class="count">x{{item.count}}</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{$store.getters['cart/validTotal']}} 件商品</p>
          <p>&yen;{{$store.getters['cart/validAmount']}}</p>
        </div>
        <XtxButton type="plain">去购物车结算</XtxButton>
      </div>
    </div>
  </div>
</template>
```

#### 商品列表-本地

> 目的：根据本地存储的商品获取最新的库存价格和有效状态。

大致步骤：

- 定义获取最新信息的API
- 定义修改购物车商品信息的mutations
- 定义获取购物车列表信息的actions
- 在头部购物车组件初始化的时候更新列表信息

落地代码：

定义获取最新信息的API `src/api/cart.js`

```js
import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
```

- 定义修改购物车商品信息的mutations `src/store/module/cart.js`

```js
    /**
     * 修改购物车商品
     * @param {*} state
     * @param {*} goods => 需要修改的购物车的商品信息 => nowPrice stock isEffective
     */
    updateCart (state, goods) {
      // goods 商品对象的字段不固定，有哪些字段就改哪些字段，字段的值合理就改
      // goods 商品对象中必须有 skuId
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    }
```

- 定义获取购物车列表信息的actions `src/store/module/cart.js`
```js
    /**
     * 获取商品列表
     * @param {*} ctx 执行上下文 包含 context 等
     * @returns Promise
     */
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 同时发送请求，有几件商品发送几个请求，所有请求成功后一并修改本地数据
          // Promise.all(promise数组).then((dataList) => {}) 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race(promise数组).then((data) => {}) 可以并列发送多个请求，等最快的请求成功，调用then
          const promiseArr = ctx.state.list.map(goods => {
            return reqGetNewCartGoods(goods.skuId)
          })
          // dataList => 成功结果的集合 数据顺序和promiseArr 一致
          // promiseArr 根据 state.list
          // dataList 和 state.list index顺序一致
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用 resolve 代表操作成功
            resolve()
          })
        }
      })
    }
```

- 在头部购物车组件初始化的时候更新列表信息 `src/components/app-header-cart.vue`
```js
  setup () {
    const store = useStore()
    const instance = getCurrentInstance()
    store.dispatch('cart/findCart').then(() => {
      instance.proxy.$message({ text: '更新本地购物车成功', type: 'success' })
    }).catch(e => {
      instance.proxy.$message({ text: '更新本地购物车失败', type: 'error' })
    })
  }
```

#### 删除操作-本地

> 目的：完成头部购物车删除操作，支持未登录状态。

大致步骤：

- 编写mutaions删除购物车商品逻辑
- 编写actions进行删除操作
- 在头部购物车进行删除逻辑

落地代码：

vuex的mutations和actions代码 `src/store/module/cart.js`

```js
mutations: {
    /**
     * 删除购物车商品
     * @param {*} state
     * @param {*} skuId => 需要删除的商品的唯一标识
     */
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    }
}
```
```js
 actions: {
    /**
     * 删除单条购物车数据
     * @param {*} ctx
     * @param {*} skuId => 要删除的购物车数据的唯一标识
     */
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    }
 }
```

- 控制头部组件显示和隐藏
```diff
    <!-- 购物车弹出层 -->
+    <div class="layer" v-if="show">
```
```js
    // 控制头部购物车显示和隐藏
    const store = useStore()
    const show = ref(true)
    // 监听validTotal变化 如果购物车为空 不弹出对话框
    watch(() => store.getters['cart/validTotal'], (newVal) => {
      if (newVal === 0) {
        show.value = false
      } else {
        show.value = true
      }
    }, {
      immediate: true
    })
    // 监听路由变化 如果去的是购物车或者去的是商品详情页 不弹出对话框
    onBeforeRouteUpdate((to, from, next) => {
      if (to.path === '/cart') {
        show.value = false
      } else if (store.getters['cart/validList'].find(item => item.id === to.params.id)) {
        show.value = false
      } else {
        show.value = true
      }
      next()
    })
```
- 头部组件实现删除逻辑 `src/components/app-header-cart.vue`
```diff
+ 绑定点击事件传入skuId
+<i @click="deleteCart(item.skuId)" class="iconfont icon-close-new"></i>
```
```js
    // 删除单条购物车数据
    const deleteCart = (skuId) => {
      store.dispatch('cart/deleteCart', skuId).then(() => {
        instance.proxy.$message({ text: '删除商品成功', type: 'success' })
      }).catch(e => {
        instance.proxy.$message({ text: '删除商品失败', type: 'error' })
      })
    }
```

### 购物车页面

#### 基础布局

> 目的：完成购物车组件基础布局和路由配置与跳转链接。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1614736760455.7a380589.png)

大致步骤：

- 完成头部组件，购物车图标，购物车结算按钮，点击跳转购物车路由。商品点击跳转详情的操作。
- 配置购物车路由和组件，完成基础布局。

落地代码：

跳转功能 `src/components/app-header-cart.vue`

```diff
    <RouterLink to="/cart" class="curr">
+      <i class="iconfont icon-cart"></i><em>{{$store.getters['cart/validTotal']}}</em>
    </RouterLink>
```
```diff
        <div class="item" v-for="item in $store.getters['cart/validList']" :key="item.skuId">
+          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
```
```diff
+  <XtxButton type="plain" @click="$router.push('/cart')">去购物车结算</XtxButton>
```

- 组件与路由 `src/views/cart/index.vue`
```vue
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
              <th width="120"><XtxCheckbox>全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="i in 3" :key="i">
              <td><XtxCheckbox /></td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img src="https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
                    <!-- 选择规格组件 -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;200.00</p>
                <p>比加入时降价 <span class="red">&yen;20.00</span></p>
              </td>
              <td class="tc">
                <XtxNumbox />
              </td>
              <td class="tc"><p class="f16 red">&yen;200.00</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="i in 3" :key="i">
              <td><XtxCheckbox style="color:#eee;" /></td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img src="https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
                    <p class="attr">颜色：粉色 尺寸：14cm 产地：中国</p>
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;200.00</p></td>
              <td class="tc">1</td>
              <td class="tc"><p>&yen;200.00</p></td>
              <td class="tc">
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox>全选</XtxCheckbox>
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 7 件商品，已选择 2 件，商品合计：
          <span class="red">¥400</span>
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
export default {
  name: 'XtxCartPage',
  components: { GoodRelevant }
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
```

#### 列表展示-本地

> 目的：实现本地状态下的，购物车商品列表展示功能。

大致步骤：

- 准备失效商品列表数据。已选择商品列表数据。已选择商品件数数据。需要支付的金额数据。
- 渲染模版

落地代码：

准备数据 `src/store/module/cart.js`

```js
    // getters
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round((c.nowPrice * 100) * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.selectedList.length !== 0 && getters.validList.length === getters.selectedList.length
    }
```
```diff
      <div class="cart">
        <table>
          <thead>
            <tr>
+              <th width="120"><XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
+            <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
+              <td><XtxCheckbox :modelValue="item.selected" /></td>
              <td>
                <div class="goods">
+                  <RouterLink :to="`/product/${item.id}`">
+                    <img :src="item.picture" alt="">
                  </RouterLink>
                  <div>
+                    <p class="name ellipsis">{{item.name}}</p>
                    <!-- 选择规格组件 -->
+                    <p class="attr">{{item.attrsText}}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
+                <p>&yen;{{item.nowPrice}}</p>
+                <p v-if="item.price-item.nowPrice>0">
                  比加入时降价
+                  <span class="red">&yen;{{item.price-item.nowPrice}}</span>
                </p>
              </td>
              <td class="tc">
+                <XtxNumbox :modelValue="item.count" />
              </td>
+              <td class="tc"><p class="f16 red">&yen;{{item.nowPrice*100*item.count/100}}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length>0">
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
              <td><XtxCheckbox style="color:#eee;" /></td>
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
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
+          <XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox>
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
+          共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedTotal']}} 件，商品合计：
+          <span class="red">¥{{$store.getters['cart/selectedAmount']}}</span>
          <XtxButton type="primary">下单结算</XtxButton>
        </div>
      </div>
```

#### 单选操作-本地

> 目的：实现本地状态下的，选中商品操作。

大致步骤：

- 使用购物车商品修改信息的mutations（已实现）
- 定义购物车商品选中状态的actions
- 在购物车页面绑定单选的复选框change事件
- 在事件中调用actions的修改函数

落地代码：

定义修改购物车商品选中状态的mutations `src/store/module/cart.js`

```js
    /**
     * 修改购物车商品
     * @param {*} state
     * @param {*} goods => 需要修改的购物车的商品信息 => nowPrice stock isEffective
     */
    updateCart (state, goods) {
      // goods 商品对象的字段不固定，有哪些字段就改哪些字段，字段的值合理就改
      // goods 商品对象中必须有 skuId
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    }
```

- 定义修改购物车商品的actions `src/store/module/cart.js`

```js
    /**
     * 修改购物车（选中状态，数量）
     * @param {*} ctx
     * @param {*} goods => 需要修改的商品 必须包含 skuId 可能包含 selected count
     * @returns
     */
    updateCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    }
```

- 在购物车页面绑定单选的复选框change事件并处理选中 `src/views/cart/index.vue`
```vue
<!-- 不能直接操作 store 中的 state 用 :modelValue 绑定 给组件传值 -->
<!-- getters 动态改变 -->
<th width="120"><XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']" @change="checkAll">全选</XtxCheckbox></th>
```
```vue
<td><XtxCheckbox @change="$event=>checkOne(item.skuId,$event)" :modelValue="item.selected" /></td>
```
```js
    const store = useStore()
    // 单选
    const checkOne = (skuId, selected) => {
      // 想要拿到默认参数，也想传参 可以返回一个函数
      // 传一下 $event 再接收一下
      // ($event) => checkOne(goods.skuId,$event)
      store.dispatch('cart/updateCart', { skuId, selected })
    }
```

#### 全选操作-本地

> 目的：实现本地状态下的，全选商品操作。

大致步骤：

- 修改购物车所有有效商品选中状态的actions
- 在购物车页面修改调用actions的代码
- 在购物车页面绑定全选的复选框change事件
- 在事件中调用actions的修改函数

落地代码

修改购物车商品选中状态的actions让其支持全选 `src/store/module/cart.js`

```js
    /**
     * 有效商品的全选&反选
     * @param {*} ctx
     * @param {*} selected 状态（全选/取消全选）
     * @returns
     */
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    }
```

- 在购物车页面修改调用actions的代码 `src/views/cart/index.vue`

```js
    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAllCart', selected)
    }
    return { checkOne, checkAll }
```

- 在购物车页面绑定全选的复选框change事件并处理选中 `src/views/cart/index.vue`

```vue
<!-- 两处都需要加 --> 
<XtxCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox>
```

#### 删除操作-本地

> 目的：实现本地状态下，购物车商品删除

大致步骤：

- 绑定删除点击事件指定处理函数，调用删除actions
- 处理无商品展示界面

落地代码：

绑定删除点击事件指定处理函数，调用删除actions `src/views/cart/index.vue`

```vue
<!-- 两处删除都绑定 -->
  <p><a @click="deleteCart(item.skuId)" class="green" href="javascript:;">删除</a></p>
```

```js
    // 删除
    const deleteCart = (skuId) => {
      store.dispatch('cart/deleteCart', skuId)
    }
    return { checkOne, checkAll, deleteCart }
```

- 处理无商品展示界面

组件 `src/views/cart/components/cart-none.vue`
```vue
<template>
  <div class="cart-none">
    <img src="@/assets/images/none.png" alt="" />
    <p>购物车内暂时没有商品</p>
    <div class="btn">
      <XtxButton type="primary" @click="$router.push('/')">继续逛逛</XtxButton>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartNone'
}
</script>
<style scoped lang="less">
.cart-none {
  text-align: center;
  padding: 150px 0;
  background: #fff;
  img {
    width: 180px;
  }
  p {
    color: #999999;
    padding: 20px 0;
  }
}
</style>
```

使用 `src/views/cart/index.vue`
```diff
+import XtxConfirm from '@/components/library/xtx-confirm'
import { useStore } from 'vuex'
export default {
  name: 'XtxCartPage',
+  components: { GoodRelevant, CartNone },
```
```vue
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="$store.getters['cart/validList'].length===0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
```

#### 确认框组件

> 目的：通过vue实例调用$confirm函数弹出确认框。import导入函数使用也需要支持。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1614930412684.ae937353.png)

大致步骤：

- 实现组件基础结构和样式。
- 实现函数式调用组件方式和完成交互。
- 加上打开时动画效果。
- 给购物车删除加上确认框。
- 给vue挂载原型函数$confirm。

落地代码：

- 实现组件基础结构和样式。
组件 `src/components/library/xtx-confirm.vue`

```vue
<template>
  <div class="xtx-confirm">
    <div class="wrapper">
      <div class="header">
        <h3>温馨提示</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>您确认从购物车删除该商品吗？</span>
      </div>
      <div class="footer">
        <XtxButton size="mini" type="gray">取消</XtxButton>
        <XtxButton size="mini" type="primary">确认</XtxButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XtxConfirm'
}
</script>
<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0,0,0,.5);
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .header,.footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
```

- 实现函数式调用组件方式和完成交互。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1614911568181.1a3735c5.png)

定义函数 `src/components/library/confirm.js`

```js
// 不属于 vue 管理 函数调用无法用到 vue 的全局组件
import { createVNode, render } from 'vue'

// 1. 导入被创建的组件
import XtxConfirm from './xtx-confirm.vue'

// 3. 准备一个 dom 容器装载组件
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

/**
 * 返回一个 promise 对象 cancel，confirm => 销毁组件
 */
export default ({ title, text }) => {


  // 4. 使用 render 函数渲染组件到容器
  return new Promise((resolve, reject) => {
    // props 可以传递方法
    // cancel 回调
    const cancelCallback = () => {
      // 销毁组件
      render(null, div)
      reject(new Error('点击取消'))
    }

    const submitCallback = () => {
      // 销毁组件
      render(null, div)
      resolve()
    }

    // 将方法传递给组件
    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    // 3. 点击取消按钮，触发reject同时销毁组件
    // 2. 使用 createVNode 创建虚拟节点
    /**
     * createVNode()
     * 参数1： 组件
     * 参数2： 属性对象（props）
     */
    const vn = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    render(vn, div)
  })
}
```

- 组件逻辑 `src/components/library/xtx-confirm.vue`
```vue
<template>
<!-- :class="{fade}" fade 简写 => fade: fade -->
  <div class="xtx-confirm" :class="{fade}">
    <div class="wrapper" :class="{fade}">
      <div class="header">
        <h3>{{title}}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="cancel"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{text}}</span>
      </div>
      <div class="footer">
        <XtxButton size="mini" type="gray" @click="cancel">取消</XtxButton>
        <XtxButton size="mini" type="primary" @click="submit">确认</XtxButton>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
// 当前组件不是在APP下进行渲染，无法使用APP下的环境（全局组件，全局指令，原型属性函数）
import XtxButton from './xtx-button.vue'
export default {
  name: 'XtxConfirm',
  components: { XtxButton },
  // props 可以传函数
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    text: {
      type: String,
      default: ''
    },
    cancelCallback: {
      type: Function
    },
    submitCallback: {
      type: Function
    }
  },
  setup (props) {
    // 动画效果
    const fade = ref(false)
    // 组件渲染完毕
    onMounted(() => {
      // 过渡效果需要在元素创建完毕后延迟一会儿才会触发
      setTimeout(() => {
        fade.value = true
      }, 0)
    })

    // 取消
    const cancel = () => {
      props.cancelCallback()
    }

    // 确认
    const submit = () => {
      props.submitCallback()
    }
    return {
      fade,
      cancel,
      submit
    }
  }
}
</script>
<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0,0,0,0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0,0,0,.5);
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%,-50%);
      opacity: 1;
    }
    .header,.footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
```

- 给vue挂载原型函数

实现：`src/components/library/index.js`
```js
import Confirm from './Confirm'
```
```diff
    // 如果你想挂载全局的属性，能够通过组件实例调用的属性   this.$message
    app.config.globalProperties.$message = Message
+    app.config.globalProperties.$confirm = Confirm
```

- 加上打开时动画效果 `src/components/library/xtx-confirm.vue`

```diff
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
+  background: rgba(0,0,0,0);
+  &.fade {
+    transition: all 0.4s;
+    background: rgba(0,0,0,.5);
+  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
+    transform: translate(-50%,-60%);
+    opacity: 0;
+    &.fade {
+      transition: all 0.4s;
+      transform: translate(-50%,-50%);
+      opacity: 1;
+    }
```

- 使用函数 `src/views/cart/index.vue`

```js
    // 删除
    const deleteCart = (skuId) => {
      instance.proxy.$confirm({ text: '您确定从购物车删除该商品吗？' }).then(() => {
        store.dispatch('cart/deleteCart', skuId).then(() => {
          instance.proxy.$message({ type: 'success', text: '删除成功' })
        })
      }).catch(e => {
        console.log('cancel')
      })
    }
```