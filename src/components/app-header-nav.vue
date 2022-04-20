<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in list" :key="item.id" @mousemove="show(item.id)" @mouseleave="hide(item.id)">
      <router-link :to="`/category/${item.id}`"  @click="hide(item.id)" active-class="active" exact>{{item.name}}</router-link>
      <div class="layer" :class="{open: item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(item.id)" v-if="item.id">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </router-link>
            <!-- 在没有加载数据的时候可以看到分类，没有加载完数据不让点击 -->
            <a v-else href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
// 1. 渲染nav中的一级分类
// 1.1 在API层，定义接口函数
// 1.2 在vuex的category模块，定义mutations函数和actions函数
// 1.3 Layout组件调用
// 1.4 当前组件拿出vuex中数据，进行渲染即可
// 2. 优化初始化无数据展示（局部白屏）
// 2.1 定义9个分类的常量数据
// 2.2 在vuex状态初始化的时候，使用常量数据（和后台数据结构一致）
// 2.3 在没有加载数据的时候可以看到分类，没有加载完数据不让点击
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    // 拿到 vuex 中的分类列表
    const list = computed(() => {
      return store.state.category.list
    })
    // 问题：跳转时不会关闭二级类目，通过数据控制
    // 1. vuex 每个分类加上 open 数据
    // 2. vuex 提供显示隐藏函数，修改 open 数据
    // 3. 在组件中使用 vuex 中的函数，使用事件绑定，提供一个类名显示和隐藏
    const show = (id) => {
      store.commit('category/show', id)
    }
    const hide = (id) => {
      store.commit('category/hide', id)
    }
    return {
      list,
      show,
      hide
    }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
      // 当a链接上有active的时候会有激活样式
      &.active {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
      }
    }
    &:hover {
        > a{
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
        }
    }
  }
}
.layer {
    &.open {
        height: 132px;
        opacity: 1;
    }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
