<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [分类模块](#%E5%88%86%E7%B1%BB%E6%A8%A1%E5%9D%97)
  - [分类-面包屑组件](#%E5%88%86%E7%B1%BB-%E9%9D%A2%E5%8C%85%E5%B1%91%E7%BB%84%E4%BB%B6)
  - [分类-激活头部导航](#%E5%88%86%E7%B1%BB-%E6%BF%80%E6%B4%BB%E5%A4%B4%E9%83%A8%E5%AF%BC%E8%88%AA)
    - [03-分类-切换分类时更新数据](#03-%E5%88%86%E7%B1%BB-%E5%88%87%E6%8D%A2%E5%88%86%E7%B1%BB%E6%97%B6%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE)
    - [04-分类-渲染面包屑](#04-%E5%88%86%E7%B1%BB-%E6%B8%B2%E6%9F%93%E9%9D%A2%E5%8C%85%E5%B1%91)
    - [05-分类-商品分类布局](#05-%E5%88%86%E7%B1%BB-%E5%95%86%E5%93%81%E5%88%86%E7%B1%BB%E5%B8%83%E5%B1%80)
    - [06-分类-商品分类渲染](#06-%E5%88%86%E7%B1%BB-%E5%95%86%E5%93%81%E5%88%86%E7%B1%BB%E6%B8%B2%E6%9F%93)
  - [搜索模块](#%E6%90%9C%E7%B4%A2%E6%A8%A1%E5%9D%97)
    - [07-搜索-头部搜索跳转](#07-%E6%90%9C%E7%B4%A2-%E5%A4%B4%E9%83%A8%E6%90%9C%E7%B4%A2%E8%B7%B3%E8%BD%AC)
    - [08-搜索-路由与组件结构](#08-%E6%90%9C%E7%B4%A2-%E8%B7%AF%E7%94%B1%E4%B8%8E%E7%BB%84%E4%BB%B6%E7%BB%93%E6%9E%84)
    - [09-搜索-排序组件](#09-%E6%90%9C%E7%B4%A2-%E6%8E%92%E5%BA%8F%E7%BB%84%E4%BB%B6)
    - [10-搜索-分页切换](#10-%E6%90%9C%E7%B4%A2-%E5%88%86%E9%A1%B5%E5%88%87%E6%8D%A2)
    - [11-搜索-条件改变更新数据（作业）](#11-%E6%90%9C%E7%B4%A2-%E6%9D%A1%E4%BB%B6%E6%94%B9%E5%8F%98%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE%E4%BD%9C%E4%B8%9A)

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
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
+      &.active {
+        color: var(--xtx-color);
+        border-bottom: 1px solid var(--xtx-color);
+      }
    }
```

有&  `a.active`  交集选择器  没有& `a .active  ` 后代选择器



- 设置激活类名

```diff
      <RouterLink
        v-if="item.id"
+        active-class="active"
        :to="`/category/${item.id}`"
      >
        {{ item.name }}
      </RouterLink>
```



**总结：**

- 当要实现 路由链接 激活时候，可以使用激活类名来实现。
  - active-class 设置一个 激活样式的类名即可



### 03-分类-切换分类时更新数据

> 目标：通过路由的钩子函数监听改变跟下数据

大致步骤：

- 去发现，动态路由参数改变不会初始化组件
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
  name: "xtx-category-page",
  setup() {
    // 获取随机轮播图
    const sliders = ref([]);
    const initSliders = async () => {
      const data = await getSliders();
      sliders.value = data.result.sort(() => Math.random() - 0.5);
    };
    onMounted(initSliders);
    onBeforeRouteUpdate((to, from, next) => {
      initSliders();
      next();
    });

    return { sliders };
  },
};
```



**总结：**

- 当路由只是参数改变不会渲染组件，需要路由规则改变
- 使用`onBeforeRouteUpdate`  可以监听到参数改变，去更新组件数据





### 04-分类-渲染面包屑

> 目的：获取分类属性，渲染面包屑

大致步骤：

- 定义API
- 组件初始化和参数更新获取数据
- 渲染面包屑
- 加上动切换画



落地代码：

- 定义API `api/goods.js`

```js
import request from "@/utils/request";
// 商品分类
export const getTopCategory = (id) => request("/category", "get", { id });
```

- 组件初始化和参数更新获取数据

```js
import { getTopCategory } from "@/api/goods";
```

```js
   // 获取分类信息
    const category = ref({});
    const initCategory = async (id) => {
      const data = await getTopCategory(id);
      category.value = data.result;
    };
    const route = useRoute();
    onMounted(() => {
      initCategory(route.params.id);
    });
    onBeforeRouteUpdate((to, from, next) => {
      initCategory(to.params.id);
      next();
    });

    return { sliders, category };
```

- 渲染面包屑，加切换动画

```vue
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.id">{{ category.name }}</XtxBreadItem>
        </Transition>
```



**总结：**

- key可以让元素或组件更新（移除和创建）
- `mode="out-in"` 让动画先出后进





### 05-分类-商品分类布局

> 目标：完成全部分类渲染和分类商品渲染

大致步骤

- 全局单个商品组件
- 基础布局



具体代码：

- 全局单个商品组件

组件 `components/goods-item`

```vue
<template>
  <RouterLink to="/" class="goods-item">
    <img
      src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_2.jpg"
      alt=""
    />
    <p class="name ellipsis">红功夫 麻辣小龙虾 19.99/500g 实惠到家</p>
    <p class="desc ellipsis">火锅食材</p>
    <p class="price">&yen;19.99</p>
  </RouterLink>
</template>

<script>
export default {
  name: "GoodsItem",
};
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  background: #fff;
  transition: all 0.5s;
  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }
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
    color: var(--price-color);
    font-size: 20px;
  }
}
</style>
```

注册 `main.js`

```js
// 导入组件
import GoodsItem from "@/components/goods-item";

// 创建一个vue应用
const app = createApp(App);
// 通过app注册 (directive，component) 都是在app实例上
app.component(GoodsItem.name, GoodsItem);
// 使用仓库vuex，使用路由，使用组件库，挂载到app容器
app.use(store).use(router).use(ErabbitUI).mount("#app");
```



- 基础布局 `views/category/index.vue`

```vue
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in 6" :key="i">
            <a href="javascript:;">
              <img
                src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(9).png"
              />
              <p>空调</p>
            </a>
          </li>
        </ul>
      </div>
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
.xtx-category-page {
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
            color: var(--xtx-color);
          }
        }
      }
    }
  }
}
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
```



**总结：**

- 在vue3中全局注册组件 `app.component()`
- 在vue3中全局注册指令 `app.directive()`





### 06-分类-商品分类渲染

> 目标：完成商品分类渲染

大致步骤：

- 单个商品组件支持传递商品对象
- 完成渲染



落地代码：

- 单个商品组件 `goods-item.vue`

```vue
<template>
  <RouterLink to="/" class="goods-item">
    <img :src="goods.picture || require('@/assets/200.png')" />
    <p class="name ellipsis">{{ goods.name || "&nbsp;" }}</p>
    <p class="desc ellipsis">{{ goods.name || "&nbsp;" }}</p>
    <p class="price">
      {{ goods.price ? `&yen;${goods.price}` : "&nbsp;" }}
    </p>
  </RouterLink>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
```



- 完成渲染 `views/category/index.vue`

```vue
     <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in category.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in category.children" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="item in sub.goods" :key="item.id" :goods="item" />
          <div v-if="!sub.goods.length" class="none">暂无商品</div>
        </div>
      </div>
```



**总结：**

- vuecli中，在模板语法中，可以使用 `require('地址')` 动态插入图片



## 搜索模块

### 07-搜索-头部搜索跳转

> 目标：搜索框输入框后回车跳转搜索

大致步骤：

- 双向绑定输入框
- 绑定按键且enter事件
- 跳转搜索地址，携带搜索关键字
- 清空输入框，失去焦点



具体代码：`components/app-header.vue`

```vue
        <input
          v-model="keyword"
          type="text"
          placeholder="搜一搜"
          @keyup.enter="search"
        />
```

```js
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppHeaderNav from "./app-header-nav.vue";
export default {
  name: "AppHeader",
  components: { AppHeaderNav },
  setup() {
    const router = useRouter();
    const keyword = ref("");
    const search = (e) => {
      // 为了查询更多数据，允许空字符串跳过，实际开发需要校验
      router.push(`/search?keyword=${keyword.value}`);
      keyword.value = "";
      e.target.blur();
    };
    return { search, keyword };
  },
};
```



### 08-搜索-路由与组件结构

> 目的：准备路由规则和组件基础布局

![image-20220321231613106](./images/image-20220321231613106.png)

大致步骤：

- 基础组件
- 路由规则
- 渲染面包屑



代码落地：

- 组件  `views/search/index.vue`

```vue
<template>
  <div class="xtx-search-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>搜索 "xxx" 的结果：</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 筛选区 -->
        <!-- 结果区 -->
        <!-- 分页区 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xtx-search-page",
};
</script>

<style lang="less" scoped>
.xtx-search-page {
  .wrapper {
    background-color: #fff;
    padding: 0 25px;
    .goods-list {
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
}
</style>
```

- 规则 `router/index.js`

```js
const Search = () => import("@/views/search/index");
```

```diff
    children: [
      { path: "/", component: Home },
      { path: "/category/:id", component: Category },
+      { path: "/search", component: Search },
    ],
```

- 面包屑文字  `views/search/index.vue`

```vue
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>搜索 "{{ $route.query.keyword }}" 的结果：</XtxBreadItem>
      </XtxBread>
```





### 09-搜索-排序组件

> 目的：实现排序按钮切换效果

大致步骤：

- 组件布局
- 理解后台参数规则
- 切换效果



具体代码：

- 基础布局

```vue
<template>
  <div class='search-sort'>
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
  </div>
</template>
<script>
export default {
  name: 'SubSort'
}
</script>
<style scoped lang='less'>
.search-sort {
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
        background: var(--xtx-color);
        border-color: var(--xtx-color);
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
            border-bottom-color: var(--xtx-color);
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: var(--xtx-color);
          }
        }
      }
    }
  }
}
</style>
```

使用组件 `search/index.vue`

```js
import SearchSort from "./components/search-sort.vue";
export default {
  name: "xtx-search-page",
  components: { SearchSort },
}
```

```vue
      <div class="wrapper">
        <!-- 筛选区 -->
        <SearchSort />
        <!-- 结果区 -->
      </div>  
```

- 后台参数

```js
    // sortField====>publishTime,orderNum,price,evaluateNum
    // sortMethod====>asc为正序 desc为倒序
		// 传递后台的时候，不需要的值需要至null
```

- 切换效果 （按钮写死，如果优化数据遍历）

```vue
<a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >评论最多</a
      >
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'desc',
          }"
        />
      </a>
```

```js
import { reactive } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
export default {
  name: "SubSort",
  emits: ["change-filter"],
  setup(props, { emit }) {
    // 1. 根据后台需要的参数定义数据对象
    // sortField====>publishTime,orderNum,price,evaluateNum
    // sortMethod====>asc为正序 desc为倒序
    const sortParams = reactive({
      sortField: null,
      sortMethod: null,
    });
    // 2.改变排序
    const changeSort = (sortField) => {
      if (sortField === "price") {
        sortParams.sortField = sortField;
        if (sortParams.sortMethod === null) {
          // 第一次点击，默认是降序
          sortParams.sortMethod = "desc";
        } else {
          // 其他情况根据当前排序取反
          sortParams.sortMethod =
            sortParams.sortMethod === "desc" ? "asc" : "desc";
        }
      } else {
        // 如果排序未改变停止逻辑
        if (sortParams.sortField === sortField) return;
        sortParams.sortField = sortField;
        sortParams.sortMethod = null;
      }
    };

    return { sortParams, changeSort };
  },
};
```

注意：现在没有和查询联动，大家可以思考下如何联动。



### 10-搜索-分页切换

> 目的：完成商品列表分页切换

大致步骤：

- 知道分页组件用法
- 初始化查询参数
- 准备API
- 组件渲染后，发请求，渲染列表
- 监听分页改变，更新列表



具体落地：

- 知道分页组件用法 `XtxPagination`

props

| 名称                   | 类型   | 默认值 |
| ---------------------- | ------ | ------ |
| total 总条数           | Number | 100    |
| pageSize 每页条数      | Number | 10     |
| currentPage 当前第几页 | Number | 1      |

events

| 名称           | 触发时机     | 默认参     |
| -------------- | ------------ | ---------- |
| current-change | 改变分页页码 | 点击的页码 |

- 初始化查询参数

```js
import { useRoute } from "vue-router";
```

```js
  setup() {
    const route = useRoute();
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      keyword: route.query.keyword,
      sortField: null,
      sortMethod: null,
    });
    return { reqParams } 
  }
```

- 准备API `api/goods.js`

```js
// 搜索商品
export const getSearchGoods = (params) =>
  request("/search/all", "post", params);
```

- 组件渲染后，发请求，渲染列表

```js
    const list = ref([]);
    const total = ref(0);
    const loadData = async () => {
      const { result } = await getSearchGoods(reqParams);
      list.value = result.pageData.items;
      total.value = result.pageData.counts;
    };
    onMounted(() => {
      loadData();
    });
		return { list, total, reqParams }
```

```vue
        <!-- 结果区 -->
        <ul class="goods-list">
          <li v-for="item in list" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 分页 -->
        <XtxPagination
          :total="total"
          :current-page="reqParams.page"
          :page-size="reqParams.pageSize"
          @current-change="changePager"
        ></XtxPagination>
```

- 监听分页改变，更新列表

```js
    const changePager = (p) => {
      reqParams.page = p;
      loadData();
    };
```





### 11-搜索-条件改变更新数据（作业）

> 目标：排序条件改变，搜索关键字改变，更新数据

大致步骤：

- 处理下没有数据的情况
- 排序条件改变更新数据
- 搜索关键字改变更新数据
  - 重置排序组件显示效果



具体代码：

- 处理没有数据

```vue
        <div v-if="!total" class="none">
          <img src="../../assets/none.png" alt="" />
          暂无数据
        </div>
        <!-- 分页 -->
        <XtxPagination
          v-if="total"
```

```less
  .none {
    padding: 100px 0;
    text-align: center;
    color: #999;
    img {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      object-fit: contain;
    }
  }
```



- 排序条件改变更新数据

`search-sort.vue`

```diff
    // 改变排序
    const changeSort = (sortField) => {
			// ... 省略
+      emit("change-filter", sortParams);
    };
```

`search/index.vue`

```vue
<SearchFilter @change-filter="changeFilter" />
```

```js
    // 改变筛选条件
    const changeFilter = (filterParams) => {
      reqParams.page = 1;
      reqParams.sortField = filterParams.sortField;
      reqParams.sortMethod = filterParams.sortMethod;
      loadData();
    };
```

```js
return { list, total, reqParams, changePager, changeFilter };
```

- 搜索关键字改变更新数据

```js
import { onBeforeRouteUpdate } from "vue-router";
```

```js
    // 关键字改变
    onBeforeRouteUpdate((to, from, next) => {
      reqParams.page = 1;
      reqParams.keyword = to.query.keyword;
      reqParams.sortField = null;
      reqParams.sortMethod = null;
      loadData();
      next();
    });
```

- 重置排序组件显示效果

```js
   // 还原排序
    onBeforeRouteUpdate((to, from, next) => {
      sortParams.sortField = null;
      sortParams.sortMethod = null;
      next();
    });
```
