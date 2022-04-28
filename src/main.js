/*
 * @Author: hidari
 * @Date: 2022-04-13 17:36:23
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 16:27:23
 * @FilePath: \shopping-centre-management\src\main.js
 * @Description: 项目主入口
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自定义 ui 组件库
import UI from './components/library'

// 重置样式库
import 'normalize.css'
// 公用样式
import '@/assets/styles/common.less'
// 导入 mock
import './mock'

// 创建一个vue应用实例
createApp(App).use(store).use(router).use(UI).mount('#app')
