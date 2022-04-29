<!--
 * @Author: hidari
 * @Date: 2022-04-29 09:14:35
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 15:59:01
 * @FilePath: \shopping-centre-management\src\components\library\xtx-tabs.vue
 * @Description: tabs标签页组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<script>
import { useVModel } from '@vueuse/core'
import { provide } from '@vue/runtime-core'
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['tab-click'],
  setup (props, { emit }) {
    // 把 modelValue 传给 panels 组件
    // 响应式数据 activeName 接收 v-model 的值
    const activeName = useVModel(props, 'modelValue', emit)

    // 点击选项卡触发函数
    const tabClick = (name, index) => {
      activeName.value = name
      // 提供一个 tab-click 自定义事件
      emit('tab-click', { name, index })
    }

    // 传递给后代 给每一个 panel 传递当前选的 name
    provide('activeName', activeName)
    return {
      activeName,
      tabClick
    }
  },
  render () {
    // jsx语法，它能够让我们创建节点和写html一样
    // 1. 动态插值表达式{} 2. 尽量三元表示式做判断，使用map来遍历 3.事件使用原始方式绑定
    // 默认插槽节点
    const panels = this.$slots.default()
    // 动态的 panels 组件集合
    const dynamicPanels = []
    // 判断是否为动态 / 静态节点 type.name 是否为 panel组件的name
    panels.forEach(item => {
      if (item.type.name === 'XtxTabsPanel') {
        // 静态
        dynamicPanels.push(item)
      } else {
        item.children.forEach(item => {
          // 动态
          dynamicPanels.push(item)
        })
      }
    })
    // 返回的内容会进行渲染
    // 在 babel 的帮助下 可以在 vue 中写 jsx 语法
    // 1. tabs 组件大容器
    // 2. 选项卡导航菜单结构
    // 3. 内容容器
    const nav = <nav>
      {dynamicPanels.map((dynamicPanel, i) => {
        return <a onClick={() => this.tabClick(dynamicPanel.props.name, i)} class={{ active: dynamicPanel.props.name === this.activeName }} href="javascript:;">{dynamicPanel.props.label}</a>
      })}
    </nav>
    return <div class="xtx-tabs">{[nav, dynamicPanels]}</div>
  }
}
</script>
<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
