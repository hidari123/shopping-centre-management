<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [分类模块](#%E5%88%86%E7%B1%BB%E6%A8%A1%E5%9D%97)
  - [分类-面包屑组件](#%E5%88%86%E7%B1%BB-%E9%9D%A2%E5%8C%85%E5%B1%91%E7%BB%84%E4%BB%B6)
  - [分类-批量注册组件](#%E5%88%86%E7%B1%BB-%E6%89%B9%E9%87%8F%E6%B3%A8%E5%86%8C%E7%BB%84%E4%BB%B6)
  - [分类-激活头部导航](#%E5%88%86%E7%B1%BB-%E6%BF%80%E6%B4%BB%E5%A4%B4%E9%83%A8%E5%AF%BC%E8%88%AA)
  - [基础布局搭建](#%E5%9F%BA%E7%A1%80%E5%B8%83%E5%B1%80%E6%90%AD%E5%BB%BA)
  - [分类商品-布局](#%E5%88%86%E7%B1%BB%E5%95%86%E5%93%81-%E5%B8%83%E5%B1%80)
  - [切换分类时更新数据](#%E5%88%87%E6%8D%A2%E5%88%86%E7%B1%BB%E6%97%B6%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE)
  - [分类商品-展示](#%E5%88%86%E7%B1%BB%E5%95%86%E5%93%81-%E5%B1%95%E7%A4%BA)
    - [watch 方案](#watch-%E6%96%B9%E6%A1%88)
    - [onBeforeRouteUpdate 方案](#onbeforerouteupdate-%E6%96%B9%E6%A1%88)
  - [面包屑切换动画](#%E9%9D%A2%E5%8C%85%E5%B1%91%E5%88%87%E6%8D%A2%E5%8A%A8%E7%94%BB)
  - [处理跳转细节](#%E5%A4%84%E7%90%86%E8%B7%B3%E8%BD%AC%E7%BB%86%E8%8A%82)
  - [展示面包屑](#%E5%B1%95%E7%A4%BA%E9%9D%A2%E5%8C%85%E5%B1%91)
  - [筛选区展示](#%E7%AD%9B%E9%80%89%E5%8C%BA%E5%B1%95%E7%A4%BA)
  - [复选框组件封装](#%E5%A4%8D%E9%80%89%E6%A1%86%E7%BB%84%E4%BB%B6%E5%B0%81%E8%A3%85)
  - [排序组件](#%E6%8E%92%E5%BA%8F%E7%BB%84%E4%BB%B6)
  - [数据加载](#%E6%95%B0%E6%8D%AE%E5%8A%A0%E8%BD%BD)
  - [进行筛选](#%E8%BF%9B%E8%A1%8C%E7%AD%9B%E9%80%89)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-04-19 12:34:34
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-19 13:38:56
 * @FilePath: \shopping-centre-management\markdown\CATEGORY.md
 * @Description: 
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->

# 分类模块

## 分类-面包屑组件

> 目的： 封装一个高复用的面包屑组件，适用于多级场景。认识 render 选项和 h 函数。

- 参考element-ui的面包屑组件：
![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1619946353625.3c33cbbe.png)

大致步骤：

- 使用插槽和封装选项组件完成面包屑组件基本功能，但是最后一项多一个图标。
- 学习 render 选项，h 函数 的基本使用。
- 通过 render 渲染，h 函数封装面包屑功能。



落地代码：

- 我们需要两个组件，`xtx-bread` 和 `xtx-bread-item` 才能完成动态展示。

定义单项面包屑组件 `src/components/library/xtx-bread-item.vue`

```vue
<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
```

在 `library/index.js`注册

```diff
+import 'XtxBreadItem' from './xtx-bread-item.vue'
export default {
  install (app) {
+      app.component(XtxBreadItem.name, XtxBread)
```

- 过渡版，你发现结构缺少风格图标，如果在item中加上话都会有图标，但是最后一个是不需要的。

```vue
<template>
  <div class='xtx-bread'>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'XtxBread'
}
</script>
<!-- 去掉scoped全局作用 -->
<style lang='less'>
```

```vue
<!-- 面包屑 -->
<XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem to="/category/1005000">电器</XtxBreadItem>
    <XtxBreadItem >空调</XtxBreadItem>
</XtxBread>
```

- 终极版，使用render函数自己进行拼接创建。

createElement (https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)render (https://cn.vuejs.org/v2/api/#render)`render选项与h函数`

- 指定组件显示的内容：`new Vue({选项})`
    - el 选项，通过一个选择器找到容器，容器内容就是组件内容
    - template 选项，`<div>组件内容</div>` 作为组件内容
    - render选项，它是一个函数，函数回默认传人createElement的函数（h），这个函数用来创建结构，再render函数返回渲染为组件内容。它的优先级更高。

```js
//import App from './App.vue'
//new Vue({
//    render:h=>h(App)
//}).mount('#app')
// h() =====>  createElement()
// h(App) =====>  根据APP组件创建html结构
// render的返回值就是html结构，渲染到#app容器
// h() 函数参数，1.节点名称  2. 属性|数据 是对象  3. 子节点
```

`xtx-bread-item.vue`

```diff
<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
-    <i class="iconfont icon-angle-right"></i>
  </div>
</template>
```

`xtx-bread.vue`

```vue
<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 需求
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除xtx-bread-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再xtx-bread标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang='less'>
// 去除 scoped 属性，目的：然样式作用到xtx-bread-item组件
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素，找到所有的子元素，找到最后一个，判断是不是LI，是就是选中，不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素，找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>
```

- 使用代码

```vue
<!-- 面包屑 -->
<XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem to="/category/1005000">电器</XtxBreadItem>
    <XtxBreadItem >空调</XtxBreadItem>
</XtxBread>
```

- **总结：**
    - `render` 是vue提供的一个渲染函数，优先级大于`el`,`template`等选项，用来提供组件结构。
    - **注意：**
        - vue2.0 `render`函数提供`h`（createElement）函数用来创建节点
        - vue3.0 `h`（createElement）函数有 vue 直接提供，需要按需导入
    - `this.$slots.default()` 获取默认插槽的`node`结构，按照要求拼接结构。
    - h函数的传参 `tag` 标签名|组件名称, `props` 标签属性 | 组件属性, `node` 子节点 | 多个节点
- **注意：**不要在 `xtx-bread` 组件插槽写注释，也会被解析。


## 分类-批量注册组件
> 目的： 自动的批量注册组件。

大致步骤：

- 使用 `require` 提供的函数 `context` 加载某一个目录下的所有 `app 开头.vue 后缀`的文件。
- 然后 `context` 函数会返回一个导入函数 `importFn`
    - 它有一个属性 `keys()` 获取所有的文件路径
- 通过文件路径数组，通过遍历数组，再使用 `importFn` 根据路径导入组件对象
- 遍历的同时进行全局注册即可

落地代码：

`src/components/library/index.js`

```js
// 导入library文件夹下的所有组件

// 批量导入需要使用一个函数 require.context(dir,deep,matching)

/** 参数
 * 1. 目录
 * 2. 是否加载子目录
 * 3. 加载的正则匹配
 */
const importFn = require.context('./', false, /^\.\/xtx-.*\.vue$/)

export default {
  install (app) {
    // 在 app 上进行扩展 app 提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式

    // 根据 keys 批量注册
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      // 注册组件
      app.component(component.name, component)
    })
  }
}
```

**总结：**
- `require.context()` 是webpack提供的一个自动导入的API
    - 参数1：加载的文件目录
    - 参数2：是否加载子目录
    - 参数3：正则，匹配文件
    - 返回值：导入函数 fn
- `keys()` 获取读取到的所有文件列表


## 分类-激活头部导航

> 目标：完成激活 router-link 的样式

大致步骤：

- 从官网文档知道激活`router-link`组件方式
- 添加自己的样式类名，组件使用该类名



具体内容：

- `router-link` 激活时候默认加上的类名 `router-link-active`
  - https://router.vuejs.org/zh/api/#active-class
  - `active-class` 可以修改默认类名的，为自己样式写的类名

- 添加激活样式

```diff
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
+      // 当a链接上有active的时候会有激活样式
+      &.active {
+          color: @xtxColor;
+          border-bottom: 1px solid @xtxColor;
+      }
    }
```

有&  `a.active`  交集选择器  没有& `a .active  ` 后代选择器



- 设置激活类名 && 优化点击为 undefined 体验

```diff
+      <router-link :to="`/category/${item.id}`"  @click="hide(item.id)" active-class="active" exact>{{item.name}}</router-link>
      <div class="layer" :class="{open: item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(item.id)" v-if="item.id">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </router-link>
+            <!-- 在没有加载数据的时候可以看到分类，没有加载完数据不让点击 -->
+            <a v-else href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
      </div>
```



**总结：**

- 当要实现 路由链接 激活时候，可以使用激活类名来实现。
  - `active-class` 设置一个 激活样式的类名即可




## 基础布局搭建

> 目的： 完成顶级分类的，面包屑+轮播图+所属全部子级分类展示。

大致步骤：

- 准备基础结构，获取轮播图数据给组件使用
- 获取面包屑和所有分类数据给子级分类展示使用

落地代码：

基本结构和轮播图渲染 `src/views/category/index.vue`

```vue
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>空调</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in 8" :key="i">
            <a href="javascript:;">
              <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(9).png" >
              <p>空调</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
    </div>
  </div>
</template>
<script>
import { findBanner } from '@/api/home'
export default {
  name: 'TopCategory',
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    return { sliders }  
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
}
</style>
```

从vuex获取分类数据，进行渲染。
```js
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
```
```js
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

return {
    sliders,
    topCategory,
}
```
```vue
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{topCategory.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
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
    </div>
  </div>
</template>
```

## 分类商品-布局

> 目的： 展示各个子级分类下推荐的商品基础布局

大致步骤：

- 准备单个商品组件
- 完成推荐商品区块布局

落地代码：

商品信息组件 `src/views/category/components/goods-item.vue`

```vue
<template>
  <RouterLink :to="`/product/${goods.id}`" class='goods-item'>
  <!-- 如果没有数据 => 展示默认图片 -->
    <img :src="goods.picture || require(''@/assets/images/200.png'')" alt="">
    <!-- 如果没有数据，展示空白 -->
    <p class="name ellipsis">{{goods.name || "&nbsp;" }}</p>
    <p class="desc ellipsis">{{goods.desc || "&nbsp;" }}</p>
    <p class="price">&yen;{{goods.price || "&nbsp;" }}</p>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang='less'>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>

```
**总结：**

- vuecli中，在模板语法中，可以使用 `require('地址')` 动态插入图片


- 完成渲染 `views/category/index.vue`

```vue
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
```
```diff
.body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
+    .none {
+        height: 220px;
+        text-align: center;
+        width: 100%;
+        line-height: 220px;
+        color: #999;
+    }
}
```

- 顶级分类组件，进行布局 `src/views/category/index.vue`

```diff
+import GoodsItem from './components/goods-item'
export default {
  name: 'TopCategory',
  components: {
+    GoodsItem
},
```

```html
<!-- 分类关联商品 -->
<div class="ref-goods">
<div class="head">
    <h3>- 海鲜 -</h3>
    <p class="tag">温暖柔软，品质之选</p>
    <XtxMore />
</div>
<div class="body">
    <GoodsItem v-for="i in 5" :key="i" />
</div>
</div>
```
```less
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
    }
}
```

## 切换分类时更新数据

> 目标：通过路由的钩子函数监听改变更新数据

大致步骤：

- 发现动态路由参数改变不会初始化组件
  - 通过路由切换组件（初始化组件）：路由规则发生改变
- 使用 `onBeforeRouteUpdate` 可以监听参数改变
- 切换分类跟下轮播图数据（重新请求，每个分类下的轮播图都不一样）



具体代码：

-  `onBeforeRouteUpdate`  用法

```js
    onBeforeRouteUpdate((to, from, next) => {
      // to 去哪里，路由对象
      // from 哪里来，路由对象
      // next() 下一步
      next();
    });
```

- 更新轮播图数据（后台数据一样，打乱一下模拟下）

```js
import { onMounted, ref } from "vue";
import { getSliders } from "@/api/home";
import { onBeforeRouteUpdate } from "vue-router";
export default {
  name: "TopCategory",
  setup() {
      
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

    return { sliders };
  },
};
```



**总结：**

- 当路由只是参数改变不会渲染组件，需要路由规则改变
- 使用`onBeforeRouteUpdate`  可以监听到参数改变，去更新组件数据



## 分类商品-展示
### watch 方案
> 根据切换路由的时候，根据分类ID获取数据，渲染分类商品。

大致步骤：

- 定义API，组件初始化要去加载数据，但是动态路由不会重新初始化组件。
- 如果监听地址栏id的变化，然后变化了就去加载数据，但是初始化有不会加载了。
- 不过watch提供了 immediate: true 可让watch初始化的时候主动触发一次。

落地代码：

定义API `src/api/category.js`

```js
/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
```

使用watch加载数据 `src/views/category/index.vue`
```js
// 推荐商品
const subList = ref([])
const getSubList = () => {
    findTopCategory(route.params.id).then(data => {
    subList.value = data.result.children
    })
}
watch(() => route.params.id, (newVal) => {
    newVal && getSubList()
}, { immediate: true })

return {
    sliders,
    topCategory,
    subList
}
```
开始渲染 `src/views/category/index.vue`
```vue
<template>
  <RouterLink to="/" class='category-goods'>
    <img :src="goods.picture" alt="">
    <p class="name ellipsis">{{goods.name}}</p>
    <p class="desc ellipsis">{{goods.tag}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </RouterLink>
</template>

<script>
export default {
  name: 'CategoryGoods',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  }
}
</script>    
```

### onBeforeRouteUpdate 方案

> 根据切换路由的时候，根据分类ID获取数据，渲染分类商品。

大致步骤：

- 定义API，组件初始化要去加载数据，但是动态路由不会重新初始化组件。
- 发现，切换分类的时候，只是参数的改变（id的改变），没有切换路由规则，组件没有更新
- 需要监听到路由参数的改变，路由提供一个 onBeforeRouteUpdate 监听

落地代码：

- 使用 `onBeforeRouteUpdate` 加载数据 `src/views/category/index.vue`

```js
  setup () {

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

    return { topCategory, subList }
  }
```

## 面包屑切换动画

> 目的： 由于切换顶级类目，面包屑文字瞬间完成，体验差，给切换的文字加上动画。

大致步骤：

- 给面包屑ITEM组件加上Transition组件并且创建 动画条件
- 定义动画css样式

落地代码：

- 加transition和name属性，以及加上key属性关联ID才会创建和移除。

```vue
<transition name="fade-right" mode="out-in">
    <XtxBreadItem :key="currCategory.id">{{currCategory.name}}</XtxBreadItem>
</transition>
```

- 写动画样式 `common.less` 做为公用
```less
.fade-right-enter-to,
.fade-right-leave-from{
  opacity: 1;
  transform: none;
}
.fade-right-enter-active,
.fade-right-leave-active{
  transition: all .5s;
}
.fade-right-enter-from,
.fade-right-leave-to{
  opacity: 0;
  transform: translate3d(20px,0,0);
}
```
**总结：** 不同的key可以创建移除元素，创造触发动画条件。


## 处理跳转细节

> 目的： 在路由跳转的时候，优化跳转的细节。

大致需求：

- 现在的路由跳转默认在当前浏览的位置（卷曲的高度），我们需要会到顶部。
- 在点击二级类目的时候，页面滚动到顶部，造成进入一级类名事件触发，显示其对应二级弹窗，需要处理。
- 切换到二级类目路由的时候也有ID，但是也触发了watch导致发送了请求，需要处理。

落地代码：

每次切换路由的时候滚动到顶部 `src/router/index.js`
```js
// vue2 => new VueRouter({}) 创建路由实例
// vue3 => createRouter({}) 创建路由实例
const router = createRouter({
  // hash路由模式
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    // vue2.0 => x,y
    // vue3.0 => left,top
    return { left: 0, top: 0 }
  }
})
```

- 滚动到顶部，鼠标有时候会进入一级类目上，触发弹出二级类目。改成在一级类目上移动弹出二级类目。
`src/components/app-header-nav.vue`
```diff
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
+    <li @mousemove="show(item)"
```

- 切换到二级类目路由的时候也有ID，但是也触发了watch导致发送了请求，需要处理。 
`src/views/category/index.vue`

```diff
watch(() => route.params.id, (newVal) => {
-      newVal && getSubList()
+      if (newVal && `/category/${newVal}` === route.path) getSubList()
}, { immediate: true })
```

**总结：** 跳转的时候需要注意些细节


## 展示面包屑

> 目的：根据二级类目ID展示多级面包屑

大致思路：

- 封装一个独立的组件来完成，因为需要加动画。

- 使用组合API的方式通过计算属性得到所需数据

逻辑代码：

- 从vuex中通过计算属性得到面包屑所需数据 `src/views/category/sub-bread.vue`

```vue
<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup () {
    // 注意：setup中this不是当前vue实例

    // 1. 获取二级分类的ID，在地址在路由中
    // route ===> this.$route
    const route = useRoute()
    console.log(route.params.id)
    // 2. 获取vuex中的类目数据
    // store ===> this.$store
    const store = useStore()
    console.log(store)
    // 3. 通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
    const category = computed(() => {
      const obj = {}
      store.state.category.list.forEach(top => {
        top.children && top.children.forEach(sub => {
          if (sub.id === route.params.id) {
            // 设置二级类目
            obj.sub = { id: sub.id, name: sub.name }
            // 设置一级类目
            obj.top = { id: top.id, name: top.name }
          }
        })
      })
      return obj
    })
    // 模版需要使用的东西需要setup返回
    return { category }
  }
}
</script>
<style scoped lang="less"></style>
```

- 将该组件在 `src/views/category/sub-bread.vue` 中使用

```vue
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
export default {
  name: 'SubCategory',
  components: { SubBread}
}
</script>
```


## 筛选区展示

> 目的：根据后台返回的筛选条件展示筛选区域。

大致步骤：

- 定义一个组件来展示筛选区域
- 获取数据进行品牌和属性的渲染

落地代码：

- 基础布局：`src/views/category/sub-filter.vue`

```vue
<template>
	<!-- 筛选区 -->
   <div class="sub-filter">
     <div class="item" v-for="i in 4" :key="i">
       <div class="head">品牌：</div>
       <div class="body">
         <a href="javascript:;">全部</a>
         <a href="javascript:;" v-for="i in 4" :key="i">小米</a>
       </div>
     </div>
   </div>
</template>
<script>
export default {
  name: 'SubFilter'
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;  
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
```

在 `sub` 组件使用
```diff
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
+      <SubFilter />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
+import SubFilter from './components/sub-filter'
export default {
  name: 'SubCategory',
+  components: { SubBread, SubFilter}
}
</script>
```

- 获取数据：在地址栏二级类目ID改变的时候去加载筛选条件数据
`src/api/category.js` 定义API

```js
/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
```

`src/views/category/sub-filter.vue` 获取数据，组装数据，加上骨架效果

```vue
<template>
    <!-- 筛选区 -->
   <div class="sub-filter" v-if="filterData && !filterLoding">
     <div class="item">
       <div class="head">品牌：</div>
       <div class="body">
         <a @click="filterData.brands.selectedBrand = item.id" :class="{active: item.id === filterData.brands.selectedBrand}" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{item.name}}</a>
       </div>
     </div>
      <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
       <div class="head">{{item.name}}</div>
       <div class="body">
         <a href="javascript:;" @click="item.selectedAttr = attr.id" :class="{active: attr.id === item.selectedAttr}" v-for="attr in item.properties" :key="attr.id">{{attr.name}}</a>
       </div>
     </div>
   </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { reqFindSubCategoryFilter } from '@/api/category.js'
export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()
    const filterLoding = ref(false)
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    watch(() => route.params.id, (newVal) => {
      // 变化后 ID 有值且处在二级类名路由下
      if (newVal && `/category/sub/${newVal}` === route.path) {
        filterLoding.value = true
        // 发请求获取数据
        reqFindSubCategoryFilter(route.params.id).then(({ result }) => {
          // 每一组可选的筛选条件缺失 全部 条件
          // 给每一组数据加上一个选中的 id
          // 1. 品牌
          result.brands.unshift({ id: null, name: '全部' })
          result.brands.selectedBrand = null
          // 2. 属性
          result.saleProperties.forEach(item => {
            item.properties.unshift({ id: null, name: '全部' })
            item.selectedAttr = null
          })
          // 设置修改的数据
          filterData.value = result
          filterLoding.value = false
        })
      }
    }, {
      immediate: true
    })
    return {
      filterData,
      filterLoding
    }
  }
}
</script>
```

## 复选框组件封装

> 目的：实现一个自定义复选框组件。

大致步骤：

- 实现组件本身的选中与不选中效果
- 实现组件的v-model指令
- 改造成 @vueuse/core 的函数写法

落地代码：

- 实现组件功能
```vue
<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 如果插槽内容存在则显示 -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
/**
 * v-model => :modelValue + @update:modelValue
 */
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      // 使用 emit 通知父组件状态改变
      emit('update:modelValue', checked.value)
    }
    // 使用侦听器 得到父组件传递数据 给 checked 传递数据
    watch(() => props.modelValue, () => {
      checked.value = props.modelValue
    }, {
      immediate: true
    })
    return {
      checked,
      changeChecked
    }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
```

- 实现双向绑定
vue3.0中v-model会拆解成 属性 `modelValue` 和 事件 `update:modelValue`
```js
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      // 使用emit通知父组件数据的改变
      emit('update:modelValue', checked.value)
    }
    // 使用侦听器，得到父组件传递数据，给checked数据
    watch(() => props.modelValue, () => {
      checked.value = props.modelValue
    }, { immediate: true })
    return { checked, changeChecked }
  }
}
```

- 补充 `@vueuse/core` 的实现

```js
import { useVModel } from '@vueuse/core'
// v-model  ====>  :modelValue  +   @update:modelValue
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 使用useVModel实现双向数据绑定v-model指令
    // 1. 使用props接收modelValue
    // 2. 使用useVModel来包装props中的modelValue属性数据
    // 3. 在使用checked.value就是使用父组件数据
    // 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件
      checked.value = newVal
      // 让组件支持change事件
      emit('change', newVal)
    }
    return { checked, changeChecked }
  }
}
```

**总结：** useVModel 工具函数可实现双向绑定。

## 排序组件

> 目的：封装排序组件，完成排序切换效果

大致步骤：

- 定义一个组件 sub-sort，完成基础布局
- 在 sub.vue 组件使用
- 完成切换排序时候的交换效果

落地代码：

1. 基础布局： `src/views/category/components/sub-sort.vue`

```vue
<template>
  <div class='sub-sort'>
    <div class="sort">
      <a href="javascript:;">默认排序</a>  
      <a href="javascript:;">最新商品</a>
      <a href="javascript:;">最高人气</a>
      <a href="javascript:;">评论最多</a>
      <a href="javascript:;">
        价格排序
        <i class="arrow up" />
        <i class="arrow down" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox>仅显示有货商品</XtxCheckbox>
      <XtxCheckbox>仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubSort'
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
```

使用组件：`src/views/category/sub.vue`

```diff
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <!-- 结果区域 -->
+      <div class="goods-list">
+        <!-- 排序 -->
+        <SubSort />
+        <!-- 列表 -->
+      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
+import SubSort from './components/sub-sort'
export default {
  name: 'SubCategory',
+  components: { SubBread, SubFilter, SubSort}
}
</script>

<style scoped lang='less'>
+.goods-list {
+  background: #fff;
+  padding: 0 25px;
+  margin-top: 25px;
+}
</style>
```

2. 交互效果：
```vue
<template>
  <div class='sub-sort'>
    <div class="sort">
  <a :class="{active:sortParams.sortField===null}" @click="changeSort(null)" href="javascript:;">默认排序</a>
      <a :class="{active:sortParams.sortField==='publishTime'}" @click="changeSort('publishTime')" href="javascript:;">最新商品</a>
      <a :class="{active:sortParams.sortField==='orderNum'}" @click="changeSort('orderNum')" href="javascript:;">最高人气</a>
      <a :class="{active:sortParams.sortField==='evaluateNum'}" @click="changeSort('evaluateNum')" href="javascript:;">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{active:sortParams.sortField==='price' && sortParams.sortMethod === 'asc'}" />
        <i class="arrow down" :class="{active:sortParams.sortField==='price' && sortParams.sortMethod === 'desc'}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from '@vue/reactivity'
import { onBeforeRouteUpdate } from 'vue-router'
export default {
  name: 'SubSort',
  emits: ['change-sort'],
  setup (props, { emit }) {
    // 实现交互
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // 切换效果
    // 1. 组件初始化的时候，查询是默认的排序，默认排序需要激活
    // 2. 查看后台排序数据的约定：
    // 2.1 sortField 参数 publishTime 最新商品 ,orderNum 最高人气 ,evaluateNum 评论最多, price价格
    // 2.2 sortMethod 参数 desc 降序  asc 升序  (sortField是价格)
    // 2.3 默认排序 sortField 为 null 即可，如果不是价格排序sortMethod需要是null
    // 这个组件产生的数据是最作为查询条件发给后台，字段需要和后台保持一致
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null
    })

    // 搜索参数（关键字）改变后效果重置
    onBeforeRouteUpdate((to, from, next) => {
      sortParams.sortField = null
      sortParams.sortMethod = null
      next()
    })

    // 提供给模板使用
    // 需要绑定按钮的点击事件修改排序字段和排序方式
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        // 点击价格
        sortParams.sortField = sortField
        // 处理排序
        if (sortParams.sortField !== 'price') {
          // 第一次点击 price
          sortParams.sortMethod = 'desc'
        } else {
          // 多次点击
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 当你点击的是已经激活的按钮，不做任何事情
        if (sortParams.sortField === sortField) return
        // 不是点击价格
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
    }

    return {
      sortParams,
      changeSort
    }
  }
}
</script>
```

## 数据加载

> 目的：实现结果区域商品展示。

大致步骤：

- 完成结果区域商品布局
- 完成 `xtx-infinite-loading` 组件封装
- 使用 `xtx-infinite-loading` 完成数据加载和渲染

落地代码：`src/views/category/sub.vue`

1. 基础布局

```vue
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort />
        <!-- 列表 -->
        <ul>
          <li v-for="i in 20" :key="i" >
            <GoodsItem :goods="{}" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
```

2. 无限列表加载组件 `src/components/xtx-infinite-loading.vue`

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616743745379.53c10663.png)

```vue
<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'XtxInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const target = ref(null)
    // 监听 target 是否进入可视区
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          console.log(111)
          // 触发加载事件条件
          // 请求加载完成，数据加载完毕
          if (!props.loading && !props.finished) {
            emit('infinite')
          }
        }
      },
      { threshold: 0 })
    return {
      target
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
```

3. 定义获取数据的API `src/api/category.js`

```js

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */
export const reqFindSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
```

4. 在`src/views/category/sub.vue` 使用组件

```diff
<!-- 结果区域 -->
<div class="goods-list">
<!-- 排序 -->
<GoodsSort />
<!-- 列表 -->
<ul>
    <li v-for="item in list" :key="item.id" >
    <GoodsItem :goods="item" />
    </li>
</ul>
<!-- 加载 -->
+   <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
</div>
```
```vue
<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref } from '@vue/reactivity'
import { reqFindSubCategoryGoods } from '@/api/category.js'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = async () => {
      loading.value = true
      // 设置二级分类ID
      reqParams.categoryId = route.params.categoryId
      const { result } = await reqFindSubCategoryGoods(reqParams)
      // 数据获取成功
      if (result.items.length) {
        // 有数据追加数据
        goodsList.value.push(...result.items)
        // 把 page 改为下一页
        reqParams.page++
        loading.value = false
      } else {
        // 没有数据 代表加载完成
        finished.value = true
      }
    }

    // 在更改二级分类时重新加载数据
    onBeforeRouteUpdate((to, from, next) => {
      if (to.path === `/category/sub/${to.params.id}`) {
        finished.value = false
        goodsList.value = [] // 列表为空 加载更多组件顶上来 进入可视区 加载数据
        reqParams = {
          page: 1,
          pageSize: 20
        }
        next()
      }
    })

    return {
      getData,
      loading,
      finished,
      goodsList
    }
  }
}
</script>
```

## 进行筛选

> 目的：在做了筛选和排序的时候重新渲染商品列表。

大致步骤：

- 排序组件，当你点击了排序后 或者 复选框改变后 触发自定义事件 `sort-change` 传出排序参数
- 筛选组件，当你改了品牌，或者其他筛选添加，触发自定义事件 `filter-change` 传出筛选参数
- 在sub组件，分别绑定 `sort-change` `filter-change` 得到参数和当前参数合并，回到第一页，清空数据，设置未加载完成，触发加载。


落地代码：

组件：`src/views/category/components/sub-sort.vue`

```diff
    // 改变排序
    const changeSort = (sortField) => {
      // 省略代码....
+      emit('sort-change', sortParams)
    }    
```

```vue
<div class="check">
    <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
    <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
</div>
```

```js
const changeCheck = (sortField) => {
    emit('sort-change', sortParams)
}
```

组件 `src/views/category/components/sub-filter.vue`


```vue
<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { reqFindSubCategoryFilter } from '@/api/category.js'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterLoding = ref(false)
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    watch(() => route.params.id, (newVal) => {
      // 变化后 ID 有值且处在二级类名路由下
      if (newVal && `/category/sub/${newVal}` === route.path) {
        filterLoding.value = true
        // 发请求获取数据
        reqFindSubCategoryFilter(route.params.id).then(({ result }) => {
          // 每一组可选的筛选条件缺失 全部 条件
          // 给每一组数据加上一个选中的 id
          // 1. 品牌
          result.brands.unshift({ id: null, name: '全部' })
          result.brands.selectedBrand = null
          // 2. 属性
          result.saleProperties.forEach(item => {
            item.properties.unshift({ id: null, name: '全部' })
            item.selectedAttr = null
          })
          // 设置修改的数据
          filterData.value = result
          filterLoding.value = false
        })
      }
    }, {
      immediate: true
    })

    // 获取筛选参数的函数
    const getFilterParams = () => {
      // 参考数据
      // {brandId: '', attrs: [{groupName: '', propertyName: ''}, {}]}
      const filterParams = { brandId: null, attrs: [] }
      // 品牌
      filterParams.brandId = filterData.value.brands.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedAttr) {
          const attr = item.properties.find(attr => attr.id === item.selectedAttr)
          filterParams.attrs.push({ groupName: item.name, propertyName: attr.name })
        }
      })
      if (filterParams.attrs.length === 0) filterParams.attrs = null
      return filterParams
    }

    // 记录当前选择的品牌
    const changeBrand = (brandId) => {
      if (filterData.value.brands.selectedBrand === brandId) return
      filterData.value.brands.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }

    // 记录选择的销售属性
    const changeAttr = (item, attrId) => {
      if (item.selectedAttr === attrId) return
      item.selectedAttr = attrId
      emit('filter-change', getFilterParams())
    }
    return {
      filterData,
      filterLoding,
      changeBrand,
      changeAttr
    }
  }
}
</script>
```

组件 `src/views/category/sub.vue`

```vue
<SubFilter @sort-change="changeFilter" />
```

```vue
<GoodsSort @filter-change="changeSort"/>
```

```js
// 更改排序组件的排序属性 重新请求
const sortChange = (sortParams) => {
    reqParams = { ...reqParams, ...sortParams }
    // 合并请求参数 保留之前参数
    reqParams.page = 1
    goodsList.value = [] // 列表为空 加载更多组件顶上来 进入可视区 加载数据
    finished.value = false
}
// 更改筛选组件的筛选属性 重新请求
const filterChange = (filterParams) => {
    finished.value = false
    // 合并请求参数 保留之前参数
    reqParams.page = 1
    goodsList.value = [] // 列表为空 加载更多组件顶上来 进入可视区 加载数据
    reqParams = { ...reqParams, ...filterParams }
}

return { loading, finished, goodsList, getData, changeFilter, changeSort }
```