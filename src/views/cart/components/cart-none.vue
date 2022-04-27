<!--
 * @Author: hidari
 * @Date: 2022-04-27 08:52:56
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 08:52:57
 * @FilePath: \shopping-centre-management\src\views\cart\components\cart-none.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
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
