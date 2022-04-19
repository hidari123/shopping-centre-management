<!--
 * @Author: hidari
 * @Date: 2022-04-18 17:08:41
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-19 17:42:09
 * @FilePath: \shopping-centre-management\src\components\library\xtx-bread.vue
 * @Description: 面包屑组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // template 标签去除 单文件组件
    // vue2.0 h函数是传参 进来的
    /**
       * render: h => {
       *  return ''
       * }
       */
    //  vue3.0 的 h 导入进来
    // 返回值是组件内容

    /**
     * h 第一个参数 => 标签名
     * 第二个参数 => 标签的属性对象
     * 第三个参数 => 子节点
     */

    /** 需求
     * 1. 创建xtx-bread父容器
     * 2. 获取默认插槽内容
     * 3. 去除xtx-bread-item组件的i标签，应该由render函数来组织
     * 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
     * 5. 把动态创建的节点渲染再xtx-bread标签中
     */
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang='less'>
// 去除 scoped 属性，目的：然样式作用到xtx-bread-item组件
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素，找到所有的子元素，找到最后一个，判断是不是LI，是就是选中，不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素，找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>
