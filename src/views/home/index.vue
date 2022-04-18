<!--
 * @Author: OBKoro1
 * @Date: 2022-04-14 13:48:28
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-04-18 16:27:10
 * @FilePath: \shopping-centre-management\src\views\home\index.vue
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
-->
<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category />
        <!-- 轮播图 -->
        <home-banner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <home-new />
    <!-- 人气推荐 -->
    <home-hot />
    <!-- 品牌组件 -->
    <home-brand />
    <!-- 产品区块 -->
    <home-product />
    <!-- 最新专题 -->
    <home-special />
  </div>
</template>
<script>
import HomeBanner from './components/home-banner.vue'
import HomeBrand from './components/home-brand.vue'
import HomeCategory from './components/home-category.vue'
import HomeHot from './components/home-hot.vue'
import HomeNew from './components/home-new.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct, HomeSpecial }
}
</script>
<style scoped lang="less"></style>
