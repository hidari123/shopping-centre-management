/*
 * @Author: hidari
 * @Date: 2022-04-14 11:40:58
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 18:22:29
 * @FilePath: \shopping-centre-management\src\store\modules\cart.store.js
 * @Description: 购物车模块
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

import { reqGetNewCartGoods } from '@/api/cart'

// 购物车状态
export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      // 库存 > 1，有效商品标识为true
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal (state, getters) {
      return getters.validList.reduce(
        (p, c) => p + c.count, 0
      )
    },
    // 有效商品总金额
    validAmount (state, getters) {
      // 处理计算结果（浮点数）
      return getters.validList.reduce((p, c) => p + Math.round((c.nowPrice * 100) * c.count), 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round((c.nowPrice * 100) * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.selectedList.length !== 0 && getters.validList.length === getters.selectedList.length
    }
  },
  mutations: {
    /**
     * 加入购物车
     * @param {*} state
     * @param {Object} payload => 需要添加到购物车的商品
     */
    insertCart (state, payload) {
      // payload 字段
      // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
      // 线上：比上面多 isCollect 有用 discount 无用 两项项信息
      // 插入数据规则：先找是否有相同商品
      // 1. 有相同商品 => 查询数量，数量累加，再保存在最新的位置，原来商品删除
      // 2. 没有相同商品 => 保存在最新位置
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      // 如果找到了
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    },

    /**
     * 修改购物车商品
     * @param {*} state
     * @param {*} goods => 需要修改的购物车的商品信息 => nowPrice stock isEffective
     */
    updateCart (state, goods) {
      // goods 商品对象的字段不固定，有哪些字段就改哪些字段，字段的值合理就改
      // goods 商品对象中必须有 skuId
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    /**
     * 删除购物车商品
     * @param {*} state
     * @param {*} skuId => 需要删除的商品的唯一标识
     */
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    /**
     * 加入购物车
     * @param {*} ctx 执行上下文 包含 context 等
     * @param {*} payload 需要添加到购物车中的商品
     */
    insertCart (ctx, payload) {
      // 区分已登录和未登录
      // 已登录 => 异步，未登录 => 同步
      return new Promise((resolve, reject) => {
        // rootState => 所有模块
        if (ctx.rootState.user.profile.token) {
        // TODO 已登录
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          // promise 要有 resolve 拿到信息
          resolve()
        }
      })
    },

    /**
     * 获取商品列表
     * @param {*} ctx 执行上下文 包含 context 等
     * @returns Promise
     */
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 同时发送请求，有几件商品发送几个请求，所有请求成功后一并修改本地数据
          // Promise.all(promise数组).then((dataList) => {}) 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race(promise数组).then((data) => {}) 可以并列发送多个请求，等最快的请求成功，调用then
          const promiseArr = ctx.state.list.map(goods => {
            return reqGetNewCartGoods(goods.skuId)
          })
          // dataList => 成功结果的集合 数据顺序和promiseArr 一致
          // promiseArr 根据 state.list
          // dataList 和 state.list index顺序一致
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用 resolve 代表操作成功
            resolve()
          })
        }
      })
    },

    /**
     * 修改购物车（选中状态，数量）
     * @param {*} ctx
     * @param {*} goods => 需要修改的商品 必须包含 skuId 可能包含 selected count
     * @returns
     */
    updateCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    /**
     * 删除单条购物车数据
     * @param {*} ctx
     * @param {*} skuId => 要删除的购物车数据的唯一标识
     */
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    /**
     * 有效商品的全选&反选
     * @param {*} ctx
     * @param {*} selected 状态（全选/取消全选）
     * @returns
     */
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    }
  }
}
