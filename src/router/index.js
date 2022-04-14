import { createRouter, createWebHashHistory } from 'vue-router'
import { Layout } from './route/layout.route'

const routes = [
  ...Layout
]

// vue2 => new VueRouter({}) 创建路由实例
// vue3 => createRouter({}) 创建路由实例
const router = createRouter({
  // hash路由模式
  history: createWebHashHistory(),
  routes
})

export default router
