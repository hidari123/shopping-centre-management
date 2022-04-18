<!--
 * @Author: OBKoro1
 * @Date: 2022-04-18 11:20:41
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-18 17:04:22
 * @FilePath: \shopping-centre-management\src\views\home\components\home-new.vue
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
-->
<template>
  <div class="home-new">
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <div style="position: relative;height: 406px;" ref="target">
      <Transition name="fade">
      <!-- 面板内容 -->
      <ul class="goods-list" v-if="goods.length">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img v-lazy="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <home-skeleton bg="#f0f9f4" v-else/>
    </Transition>
    </div>
    </home-panel>
  </div>
</template>
<script>
import { reqFindNew } from '@/api/home'
import { useLazyData } from '@/hooks'
import HomeSkeleton from './home-skeleton.vue'
import HomePanel from './home-panel.vue'
export default {
  name: 'HomeNew',
  components: { HomeSkeleton, HomePanel },
  setup () {
    const { target, res } = useLazyData(reqFindNew)
    return { goods: res, target }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
