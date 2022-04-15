import { reqFindAllCategory } from '@/api/category'
import { topCategory } from '@/api/constants'

// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合，依赖topCategory重新设置，保证初始化就改变数据，不至于白屏
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    // payload 所有的分类集合
    setList (state, payload) {
      state.list = payload
    },
    // show 和 hide 函数控制当前分类的二级分类显示和隐藏
    show (state, id) {
      // 找到当前分类
      const currCategory = state.list.find(item => item.id === id)
      // 修改当前一级分类下的open数据为true
      currCategory.open = true
    },
    hide (state, id) {
      // 找到当前分类
      const currCategory = state.list.find(item => item.id === id)
      // 修改当前一级分类下的open数据为false
      currCategory.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const data = await reqFindAllCategory()
      // 给每个分类加上控制二级分类显示和隐藏的字段
      data.result.forEach(top => {
        top.open = false
      })
      // 修改分类数据
      commit('setList', data.result)
    }
  }
}
