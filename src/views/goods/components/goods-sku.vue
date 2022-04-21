<!--
 * @Author: hidari
 * @Date: 2022-04-21 18:34:13
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 18:58:37
 * @FilePath: \shopping-centre-management\src\views\goods\components\goods-sku.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
          <template v-for="val in item.values" :key="val.name">
              <img :class="{active: val.selected}" @click="changeSku(val)" v-if="val.picture" class="selected" :src="val.picture" :title="val.name">
              <span :class="{active: val.selected}" @click="changeSku(val)" v-else>{{val.name}}</span>
          </template>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    // 选中与取消选中
    // 约定每个按钮都有自己的选中状态数据 => selected
    // 排他思想 点击已选中 => 取消选中 点击未选中 => 同一个规格的按钮改为未选中，当前选中
    const changeSku = (val) => {
      val.selected = !val.selected
    }
    return {
      changeSku
    }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
