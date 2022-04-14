import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'

// 重置样式库
import 'normalize.css'
// 公用样式
import '@/assets/styles/common.less'

// 创建一个vue应用实例
createApp(App).use(store).use(router).mount('#app')
