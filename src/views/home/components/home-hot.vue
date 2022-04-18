<!--
 * @Author: OBKoro1
 * @Date: 2022-04-18 11:21:03
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-18 17:04:14
 * @FilePath: \shopping-centre-management\src\views\home\components\home-hot.vue
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
-->
<template>
  <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
      <div style="position: relative;height: 426px;" ref="target">
      <Transition name="fade">
        <ul v-if="goods.length" class="goods-list">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img v-lazy="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
       <home-skeleton v-else />
      </Transition>
    </div>
  </home-panel>
</template>

<script>
import { reqFindHot } from '@/api/home'
import { useLazyData } from '@/hooks'
import HomeSkeleton from './home-skeleton.vue'
import HomePanel from './home-panel.vue'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    const { target, res } = useLazyData(reqFindHot)
    return { goods: res, target }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
