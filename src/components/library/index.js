/*
 * @Author: hidari
 * @Date: 2022-04-15 16:49:52
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-18 17:05:27
 * @FilePath: \shopping-centre-management\src\components\library\index.js
 * @Description:
 * 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
 * 这就是插件
 * vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
 * vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
// 图片加载失败时显示
import defaultImg from '@/assets/images/200.png'

export default {
  install (app) {
    // 在 app 上进行扩展 app 提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)

    // 定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
  // 图片懒加载
  // 原理： 储存图片地址，不在 src 上，图片进入可视区，src地址换成所存储的地址
  app.directive('lazy', {
    // vue 2.0 监听使用指令的 dom 是否创建好 钩子函数 inserted
    // vue 3.0 指令所拥有的钩子和组建的一样 钩子函数 mounted
    mounted (el, binding) {
      // 创建一个观察对象 观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 加载失败时显示
          el.onerror = () => {
            el.src = defaultImg
          }
          // src地址换成所存储的地址
          // v-指令的值设置给 src
          // binding.value => 指令的值
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
