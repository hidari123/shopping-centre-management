/*
 * @Author: hidari
 * @Date: 2022-04-27 08:57:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 09:33:43
 * @FilePath: \shopping-centre-management\src\components\library\confirm.js
 * @Description: 确认框组件函数调用
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

// 不属于 vue 管理 函数调用无法用到 vue 的全局组件
import { createVNode, render } from 'vue'

// 1. 导入被创建的组件
import XtxConfirm from './xtx-confirm.vue'

// 3. 准备一个 dom 容器装载组件
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

/**
 * 返回一个 promise 对象 cancel，confirm => 销毁组件
 */
export default ({ title, text }) => {
  // 2. 使用 createVNode 创建虚拟节点
  /**
   * createVNode()
   * 参数1： 组件
   * 参数2： 属性对象（props）
   */

  // 4. 使用 render 函数渲染组件到容器
  return new Promise((resolve, reject) => {
    // props 可以传递方法
    // cancel 回调
    const cancelCallback = () => {
      // 销毁组件
      render(null, div)
      reject(new Error('点击取消'))
    }

    const submitCallback = () => {
      // 销毁组件
      render(null, div)
      resolve()
    }

    // 将方法传递给组件
    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    // 3. 点击取消按钮，触发reject同时销毁组件
    const vn = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    render(vn, div)
  })
}
