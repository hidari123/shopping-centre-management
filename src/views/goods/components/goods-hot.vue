<!--
 * @Author: hidari
 * @Date: 2022-04-22 17:21:05
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 17:40:10
 * @FilePath: \shopping-centre-management\src\views\goods\components\goods-hot.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item"/>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import GoodsItem from '../../category/components/goods-item'
import { reqFindHotGoods } from '@/api/product'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsHot',
  components: { GoodsItem },
  props: {
    // 热榜类型
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    // 处理标题
    // 类型数据字典
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })

    // 商品列表
    const goodsList = ref([])
    const route = useRoute()
    // 发请求获取数据
    reqFindHotGoods({ id: route.params.id, type: props.type }).then(data => {
      goodsList.value = data.result
    })
    return {
      title,
      goodsList
    }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :depp(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}</style>
