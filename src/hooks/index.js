/*
 * @Author: hidari
 * @Date: 2022-04-18 13:03:19
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 15:12:29
 * @FilePath: \shopping-centre-management\src\hooks\index.js
 * @Description: 提供复用逻辑的函数（钩子）
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'
/**
 * 数据懒加载函数
 * @param {Element} target - Dom 对象
 * @param {Function} apiFn - API 函数
 */
export const useLazyData = (apiFn) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)

  const res = ref([])
  // stop 是停止观察是否进入或移出可视区域的行为
  const { stop } = useIntersectionObserver(
    // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
    target,
    // isIntersecting 是否进入可视区域，true是进入 false是移出
    // observerElement 被观察的dom
    ([{ isIntersecting }], observerElement) => {
      // 在此处可根据isIntersecting来判断，然后做业务
      if (isIntersecting) {
        stop()
        console.log('进入可视区')
        // 调用 api 函数获取数据
        apiFn().then(data => {
          res.value = data.result
        })
      }
    },
    // 配置选项 => 相交比例 > 0 触发
    {
      threshold: 0
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, res }
}

/**
 * 支付倒计时函数
 */
export const usePayTime = () => {
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(() => {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    if (time.value <= 0) {
      pause()
    }
  }, 1000, false)

  // 组件销毁清除倒计时
  onUnmounted(() => {
    pause()
  })

  /**
   * 定时器开始
   * @param {*} countdowm - 倒计时秒数
   */
  const start = (countdowm) => {
    time.value = countdowm
    // 开启定时器
    // 将时间戳转化格式
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }
  return {
    start,
    timeText
  }
}
