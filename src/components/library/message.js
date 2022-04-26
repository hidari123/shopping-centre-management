/*
 * @Author: hidari
 * @Date: 2022-04-25 09:09:58
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 11:05:52
 * @FilePath: \shopping-centre-management\src\components\library\message.js
 *
 * @Description: 消息提示 xtx-message 组件函数 可以导入直接使用也可以挂载到vue原型
 * import Message from 'message.js' 使用 Message({ type: 'error', text: '提示文字' })
 * this.$message({ type: 'error', text: '提示文字' })
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

// 实现使用函数调用xtx-message组件的逻辑
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// 准备dom容器
const div = document.createElement('div')
// 标识
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

// 定时器标识
let timer = null

export default ({ type, text }) => {
  // 渲染组件
  // 1. 导入消息提示组件
  // 2. 将消息组件编译为虚拟节点(dom节点)
  /**
   * createVNode()
   * 参数1： 组件
   * 参数2： 属性对象（props）
   */
  const vnode = createVNode(XtxMessage, { type, text }) // => 内存中
  // 3. 准备一个装载消息提示的dom容器(真实dom)
  // 4. 将虚拟节点渲染到DOM容器中
  /**
   * render
   * 参数1：虚拟节点
   * 参数2：DOM容器
   */
  render(vnode, div)

  // 5. 3s后销毁组件，移出DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
