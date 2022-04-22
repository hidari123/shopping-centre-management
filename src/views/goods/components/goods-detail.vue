<!--
 * @Author: hidari
 * @Date: 2022-04-22 17:13:24
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 17:53:56
 * @FilePath: \shopping-centre-management\src\views\goods\components\goods-detail.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{item.name}}</span>
        <span class="dd">{{item.value}}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in goods.details.pictures" :key="item" :src="item" alt="">
  </div>
</template>
<script>
import { inject } from '@vue/runtime-core'
export default {
  name: 'GoodsDetail',
  setup () {
    // goods 详情数据
    const goods = inject('goods')
    return {
      goods
    }
  }
}
</script>
<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
