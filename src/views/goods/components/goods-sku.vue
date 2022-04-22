<!--
 * @Author: hidari
 * @Date: 2022-04-21 18:34:13
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 13:51:53
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
    if (sku.inventory > 0) {
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

// 遍历每一行按钮是否被点击，点击的拿到当前选中的值，未点击是undefined，组成数组
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach(item => {
    const selectedValue = item.values.find(val => val.selected)
    arr.push(selectedValue ? selectedValue.name : undefined)
  })
  return arr
}

// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 约定每个按钮的状态为本身的 disable 数据控制
  specs.forEach((item, i) => {
    // 遍历每一行时拿到当前选中的值的数组
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // 判断当前是否选中，是选中 => 不用判断
      if (val.selected) return
      // 拿当前的值按照顺序套入选中的值数组
      selectedValues[i] = val.name
      // 去除 undefined 数据，按照分隔符拼读key
      const key = selectedValues.filter(value => value).join(spliter)
      // 拿着key去路径字典中查找是否有数据 有可以点击 没有就禁用（true）
      val.disabled = !pathMap[key]
    })
  })
}

// 默认选中
const initDefaultSelected = (goods, skuId) => {
  // 找出 sku 信息
  const sku = goods.skus.find(sku => sku.id === skuId)
  // 遍历每一个按钮，按钮的值和 sku 记录的值相同，则选中
  goods.specs.forEach((item, i) => {
    const val = item.values.find(val => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)

    // 根据 skuId 初始化选中
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
    }

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
      updateDisabledStatus(props.goods.specs, pathMap)

      // 将选择的 sku 信息传递给父组件 { skuId, price, oldPrice, inventory, specsText}
      // 选择完整的 sku 组合按钮 才可以拿到信息 传递给父组件
      // 不是完整的 sku 组合按钮 提交空对象给父组件
      // 遍历每一行时拿到当前选中的值的数组
      // => 当前选中的数组 去掉无效值之后的数组
      const validSelectedValues = getSelectedValues(props.goods.specs).filter(v => v)
      if (validSelectedValues.length === props.goods.specs.length) {
        // 选择完整
        // 拿到信息 传递给父组件
        const skuIds = pathMap[validSelectedValues.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          /**
           * reduce() 方法对数组中的每个元素执行一个由您提供的reduce函数(升序执行)，将其结果汇总为单个返回值。
           * reduce方法可做的事情特别多，就是循环遍历能做的，reduce都可以做，比如数组求和、数组求积、数组中元素出现的次数、数组去重等等。
           * /
          /**
           * arr.reduce(function(prev,cur,index,arr){
           * ...
           * }, init);
           */
          /**
           * prev 必需。累计器累计回调的返回值; 表示上一次调用回调时的返回值，或者初始值 init;
           * cur 必需。表示当前正在处理的数组元素；
           * index 可选。表示当前正在处理的数组元素的索引，若提供 init 值，则起始索引为- 0，否则起始索引为1；
           * arr 可选。表示原数组；
           * init 可选。表示初始值。
           */
          /**
           * 没有设置函数的初始迭代值
           * const arr = [1,2,3,4,5];
           * const sum = arr.reduce(function(prev,cur,index,arr){
           *     return prev + cur;
           * });
           * console.log('sum:',sum);
           * 结果 => sum: 15
           * 分析：在这里reduce的作用就是对这个数组进行求和，迭代了4次，函数迭代的初始值是1，也就是默认值（数组的第一项），prev的值是每次计算后的值。
           */
          // 属性名：属性值 属性名2：属性值2 属性名3：属性值3... 这样的字符串
          // 第一个是空字符串 要 trim() 去除
          specsText: sku.specs.reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, '').trim()
        })
      } else {
        // 不是完整的 sku 组合按钮 提交空对象给父组件
        // 让父组件判断是否选择完整，不完整不能加入购物车
        emit('change', {})
      }
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
