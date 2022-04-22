<!--
 * @Author: hidari
 * @Date: 2022-04-21 13:53:44
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 10:21:06
 * @FilePath: \shopping-centre-management\src\components\library\xtx-city.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active: visible}">
      <span class="value" v-if="fullLocation">{{fullLocation}}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" @click="changeItem(item)" v-for="item in currList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { computed } from '@vue/runtime-core'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      tyoe: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 显示隐藏数据
    // 控制展开收起,默认收起
    const visible = ref(false)

    // 所有省市区数据
    const allCityData = ref([])
    // 正在加载
    const loading = ref(false)

    // 提供打开和关闭的行为方法
    const open = () => {
      // 清空之前选择
      for (const key in changeResult) {
        changeResult[key] = ''
      }
      visible.value = true
      // 获取城市地区数据
      loading.value = true
      getCityData().then(data => {
        allCityData.value = data
        loading.value = false
      })
    }
    const close = () => {
      visible.value = false
    }

    // 提供切换函数给 select 使用
    const toggle = () => {
      visible.value ? close() : open()
    }
    const target = ref(null)
    // 点击组件外部元素 关闭 option
    // 参数1 => 被监听的元素
    // 参数2 => 点击该元素外的其他地方触发的函数
    onClickOutside(target, () => {
      close()
    })

    // 实现计算属性 获取当前显示的地区数组
    const currList = computed(() => {
      // 默认显示省级
      let list = allCityData.value
      // 可能市级
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 可能区级
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find(c => c.code === changeResult.cityCode).areaList
      }
      return list
    })

    // 定义选择的省市区数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    // 当点击按钮时记录
    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        // 最后一级 选完了 关闭对话框 通知父组件数据
        console.log(changeResult.fullLocation)
        close()
        emit('change', changeResult)
      }
    }
    return {
      toggle,
      visible,
      target,
      loading,
      currList,
      changeItem
    }
  }
}

// 获取 省 市 区 数据的函数
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
const getCityData = () => {
  // 获取城市数据
  // 这个位置可能有异步操作，封装成promise
  // 当本地没有缓存 发请求获取数据
  // 当本地有缓存 取出本地数据
  // 返回 promise 在 then 获取数据 原因 => 有可能是发请求的异步操作 有可能是本地的同步操作
  return new Promise((resolve, reject) => {
    // 约定：数据存储在 window 全局上的 cityData 字段
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(({ data }) => {
        // 缓存
        window.cityData = data
        resolve(window.cityData)
      })
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
