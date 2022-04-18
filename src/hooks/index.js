// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
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
