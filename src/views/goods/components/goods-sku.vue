<!--
 * @Author: hidari
 * @Date: 2022-04-21 18:34:13
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-21 20:28:12
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
              <img :class="{selected: val.selected, disabled: val.disabled}" @click="changeSku(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
              <span :class="{selected: val.selected, disabled: val.disabled}" @click="changeSku(item,val)" v-else>{{val.name}}</span>
          </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = (skus) => {
  // 得到所有 sku 集合 props.goods.skus
  // 从所有 sku 中 选出有效 sku
  // 根据有效的 sku 使用 power-set 算法得到子集
  // 根据子集往路径字典对象中存储 key-value
  const pathMap = {}
  skus.forEach(sku => {
    // 1. 过滤出有库存有效的sku
    if (sku.inventory) {
      // 计算当前有库存的 sku 子集
      // 2. 得到sku属性值数组
      const valueArr = sku.specs.map(val => val.valueName)
      // 3. 得到sku属性值数组的子集
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历子集 往 pathMap 中加数据
      // 4. 设置给路径字典对象
      valueArrPowerSet.forEach(arr => {
        // 根据 arr 得到字符串 key 约定 key 是 ['蓝色','35'] => '蓝色★35'
        // 把数组以spliter为分割拼起来
        const key = arr.join(spliter)
        // 给 pathMap 设置数据
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id)
        } else {
          // 没有key设置一个数组
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 约定每个按钮的状态为本身的 disable 数据控制
  specs.forEach(item => {
    item.values.forEach(val => {
      // 去路径字典中查找是否有数据 有可以点击 没有就禁用（true）
      val.disabled = !pathMap[val.name]
    })
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    // ☆ 组件初始化更新按钮状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 选中与取消选中
    // 约定每个按钮都有自己的选中状态数据 => selected
    // 排他思想 点击已选中 => 取消选中 点击未选中 => 同一个规格的按钮改为未选中，当前选中
    const changeSku = (item, val) => {
      // 当按钮是禁用时 阻止程序运行
      if (val.disabled) return
      // 如果不是禁用
      // 1. 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(val => {
          val.selected = false
        })
        val.selected = true
      }
      // ☆ 点击按钮时更新按钮禁用状态
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
