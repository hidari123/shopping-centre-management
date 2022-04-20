<!--
 * @Author: hidari
 * @Date: 2022-04-19 15:20:56
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-20 12:27:34
 * @FilePath: \shopping-centre-management\src\views\category\components\goods-item.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <RouterLink :to="`/product/${goods.id}`" class='goods-item'>
  <!-- 如果没有数据 => 展示默认图片 -->
    <img :src="goods.picture || require('@/assets/images/200.png')" alt="">
    <!-- 如果没有数据，展示空白 -->
    <p class="name ellipsis">{{goods.name || "&nbsp;" }}</p>
    <p class="desc ellipsis">{{goods.desc || "&nbsp;" }}</p>
    <p class="price">&yen;{{goods.price || "&nbsp;" }}</p>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang='less'>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
