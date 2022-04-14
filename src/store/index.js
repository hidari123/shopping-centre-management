import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

// 模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

// vue2 => new Vue.store({})
// vue3 => createStore({})
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  // 配置插件
  plugins: [createPersistedstate({
    // 本地存储名字
    key: 'shopping-centre-management-store',
    // 指定需要存储的模块
    paths: ['user', 'cart']
  })]
})
