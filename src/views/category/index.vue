<!--
 * @Author: hidari
 * @Date: 2022-04-15 10:15:15
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-20 12:29:10
 * @FilePath: \shopping-centre-management\src\views\category\index.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <!-- mode="out-in" 先出后进 -->
      <!-- 不同的key可以创建移除元素，创造触发动画条件。 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" >
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{sub.name}} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`"/>
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods='goods'/>
          <!-- 如果没有数据 => 展示暂无商品 -->
          <div v-if="!sub.goods.length" class="none">暂无商品</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { reqFindBanner, reqFindTopCategory } from '@/api/home'
import GoodsItem from './components/goods-item'
export default {
  name: 'TopCategory',
  components: {
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    // 调用API获取数据
    const initSilders = async () => {
      // 实际：获取广告信息的时候传入分类的ID，模拟不同的轮播图数据，随机轮播图数据
      const { result } = await reqFindBanner()
      // sort(() => Math.random() - 0.5); 打乱数组的顺序
      sliders.value = result.sort(() => Math.random() - 0.5)
    }

    onMounted(initSilders)

    // 需求：切换分类的时候 轮播图数据更新（重新发请求）
    // 1. 发现，切换分类的时候，只是参数的改变（id的改变），没有切换路由规则，组件没有更新
    // 2. 需要监听到路由参数的改变，路由提供一个 onBeforeRouteUpdate 监听
    // 3. 三个参数，去哪里路由对象，哪里来路由对象，next()下一步，和beforeEach(全局)相似
    // 4. onBeforeRouteUpdate 仅在当前组件下生效

    onBeforeRouteUpdate((to, from, next) => {
      initSilders()
      next()
    })

    // 面包屑 + 所有子分类 => vuex
    const route = useRoute()
    const store = useStore()
    const topCategory = computed(() => {
      let cate = {}
      // 当前顶级分类 => 根据路由上的 id 去 vuex 中 category 模块的 list 中查找
      const item = store.state.category.list.find(item => item.id === route.params.id)
      if (item) cate = item
      return cate
    })

    // 获取各个子类目下的推荐商品
    const subList = ref([])
    const getSubList = (id) => {
      reqFindTopCategory(id).then(data => {
        subList.value = data.result.children
      })
    }

    // 需求：组件初始化，分类切换的时候，获取对应分类数据，渲染面包屑，加上动画
    // 1. 定义API函数
    // 2. 组件初始化获取数据，渲染面包屑
    // 3. 分类切换获取数据,更新数据
    // 4. 加上动画

    onMounted(() => {
      getSubList(route.params.id)
    })

    onBeforeRouteUpdate((to, from, next) => {
      // console.log(to.params.id); // 获取切换后分分类ID
      // 获取切换有的ID去发请求
      if (from.path === `/category/${from.params.id}`) {
        getSubList(to.params.id)
      }
      next()
    })

    return { sliders, topCategory, subList }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
        .none {
            height: 220px;
            text-align: center;
            width: 100%;
            line-height: 220px;
            color: #999;
        }
    }
  }
}

</style>
