<!--
 * @Author: OBKoro1
 * @Date: 2022-04-18 14:01:59
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-18 17:03:41
 * @FilePath: \shopping-centre-management\src\views\home\components\home-brand.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari/公司名, All Rights Reserved.
-->
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a @click="toggle(-1)" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
        <transition name="fade">
            <ul class="list" :style="{transform: `translateX(${-index * 1240}px)`}"  v-if="brands.length">
                <li v-for="item in brands" :key="item.id">
                <RouterLink to="/">
                    <img v-lazy="item.picture" alt="">
                </RouterLink>
                </li>
            </ul>
                <div v-else class="skeleton">
                <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
                </div>
        </transition>
    </div>
  </HomePanel>
</template>

<script>
import { reqFindBrand } from '@/api/home.js'
import { useLazyData } from '@/hooks'
import HomePanel from './home-panel'
import { ref } from '@vue/reactivity'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // 获取数据
    // 如果传 reqFindBrand(10) 相当于传了一个 promise(对象) 需要的是 function
    // () => reqFindBrand(10) 返回一个函数
    // 注意：useLazyData需要的是API函数，如果遇到要传参的情况，自己写函数在函数中调用API
    const { target, res } = useLazyData(() => reqFindBrand(10))
    // 切换效果 只有 index === 0，index === 1
    const index = ref(0)
    // 1 ： 点击上一页
    // 2 ： 点击下一页
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return true
      index.value = newIndex
    }
    return {
      brands: res, target, toggle, index
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
</style>
