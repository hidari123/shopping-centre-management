<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [首页](#%E9%A6%96%E9%A1%B5)
  - [首页-路由与组件](#%E9%A6%96%E9%A1%B5-%E8%B7%AF%E7%94%B1%E4%B8%8E%E7%BB%84%E4%BB%B6)
  - [首页-less的自动化导入](#%E9%A6%96%E9%A1%B5-less%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%AF%BC%E5%85%A5)
  - [首页-样式重置与公用](#%E9%A6%96%E9%A1%B5-%E6%A0%B7%E5%BC%8F%E9%87%8D%E7%BD%AE%E4%B8%8E%E5%85%AC%E7%94%A8)
  - [首页-小兔鲜组件库](#%E9%A6%96%E9%A1%B5-%E5%B0%8F%E5%85%94%E9%B2%9C%E7%BB%84%E4%BB%B6%E5%BA%93)
  - [首页-css变量](#%E9%A6%96%E9%A1%B5-css%E5%8F%98%E9%87%8F)
  - [首页-顶部通栏渲染](#%E9%A6%96%E9%A1%B5-%E9%A1%B6%E9%83%A8%E9%80%9A%E6%A0%8F%E6%B8%B2%E6%9F%93)
  - [首页-头部和底部布局](#%E9%A6%96%E9%A1%B5-%E5%A4%B4%E9%83%A8%E5%92%8C%E5%BA%95%E9%83%A8%E5%B8%83%E5%B1%80)
  - [首页-头部导航抽离](#%E9%A6%96%E9%A1%B5-%E5%A4%B4%E9%83%A8%E5%AF%BC%E8%88%AA%E6%8A%BD%E7%A6%BB)
  - [首页模块](#%E9%A6%96%E9%A1%B5%E6%A8%A1%E5%9D%97)
  - [首页-商品分类渲染](#%E9%A6%96%E9%A1%B5-%E5%95%86%E5%93%81%E5%88%86%E7%B1%BB%E6%B8%B2%E6%9F%93)
  - [首页-头部分类导航交互](#%E9%A6%96%E9%A1%B5-%E5%A4%B4%E9%83%A8%E5%88%86%E7%B1%BB%E5%AF%BC%E8%88%AA%E4%BA%A4%E4%BA%92)
  - [首页-头部吸顶效果](#%E9%A6%96%E9%A1%B5-%E5%A4%B4%E9%83%A8%E5%90%B8%E9%A1%B6%E6%95%88%E6%9E%9C)
  - [首页-头部吸顶vueuse实现](#%E9%A6%96%E9%A1%B5-%E5%A4%B4%E9%83%A8%E5%90%B8%E9%A1%B6vueuse%E5%AE%9E%E7%8E%B0)
  - [首页-左侧分类布局](#%E9%A6%96%E9%A1%B5-%E5%B7%A6%E4%BE%A7%E5%88%86%E7%B1%BB%E5%B8%83%E5%B1%80)
  - [首页-左侧分类渲染](#%E9%A6%96%E9%A1%B5-%E5%B7%A6%E4%BE%A7%E5%88%86%E7%B1%BB%E6%B8%B2%E6%9F%93)
  - [首页-左侧分类品牌](#%E9%A6%96%E9%A1%B5-%E5%B7%A6%E4%BE%A7%E5%88%86%E7%B1%BB%E5%93%81%E7%89%8C)
  - [首页-左侧分类骨架](#%E9%A6%96%E9%A1%B5-%E5%B7%A6%E4%BE%A7%E5%88%86%E7%B1%BB%E9%AA%A8%E6%9E%B6)
  - [首页-轮播图](#%E9%A6%96%E9%A1%B5-%E8%BD%AE%E6%92%AD%E5%9B%BE)
  - [首页-面板组件](#%E9%A6%96%E9%A1%B5-%E9%9D%A2%E6%9D%BF%E7%BB%84%E4%BB%B6)
  - [首页-新鲜好物](#%E9%A6%96%E9%A1%B5-%E6%96%B0%E9%B2%9C%E5%A5%BD%E7%89%A9)
  - [首页-人气推荐](#%E9%A6%96%E9%A1%B5-%E4%BA%BA%E6%B0%94%E6%8E%A8%E8%8D%90)
  - [首页-补充vue动画](#%E9%A6%96%E9%A1%B5-%E8%A1%A5%E5%85%85vue%E5%8A%A8%E7%94%BB)
  - [首页-骨架动画效果](#%E9%A6%96%E9%A1%B5-%E9%AA%A8%E6%9E%B6%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C)
  - [首页-数据懒加载](#%E9%A6%96%E9%A1%B5-%E6%95%B0%E6%8D%AE%E6%87%92%E5%8A%A0%E8%BD%BD)
  - [首页-热门品牌（作业）](#%E9%A6%96%E9%A1%B5-%E7%83%AD%E9%97%A8%E5%93%81%E7%89%8C%E4%BD%9C%E4%B8%9A)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 首页

## 首页-路由与组件

> 编写：首页路由规则代码，和页面框架结构

大致步骤：

- App定义一级路由出口
- Layout布局容器，二级路由出口
- Home页面组件
- 配置路由规则


落地代码：

- 根组件下定义一级路由组件出口 `src/App.vue`

```vue
<template>
  <!-- 一级路由 -->
  <router-view></router-view>
</template>
```

- 一级路由布局容器 `src/views/Layout.vue`

```vue
<template>
  <nav>顶部通栏</nav>
  <header>头部</header>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
export default {
  name: 'xtx-layout'
}
</script>

<style scoped lang='less'></style>
```

- 二级路由首页组件 `src/views/home/index.vue`

```vue
<template>
  <div class='xtx-home-page'>
    首页
  </div>
</template>

<script>
export default {
  name: 'xtx-home-page'
}
</script>

<style scoped lang='less'></style>
```

- 配置路由规则 `src/router/index.js`

```diff
import { createRouter, createWebHashHistory } from 'vue-router'

+const Layout = () => import('@/views/Layout')
+const Home = () => import('@/views/home/index')

const routes = [
+  {
+    path: '/',
+    component: Layout,
+    children: [
+      { path: '/', component: Home }
+    ]
+  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

**总结：** 

- 配置首页的路由规则，由Layout和首页组件组成。


## 首页-less的自动化导入
> **目的：** 准备常用less变量，混入代码，完成自动导入。

1. 准备要用的变量和混入代码

- 变量 `src/assets/styles/variables.less`

```less
// 主题
@xtxColor:#27BA9B;
// 辅助
@helpColor:#E26237;
// 成功
@sucColor:#1DC779;
// 警告
@warnColor:#FFB302;
// 价格
@priceColor:#CF4444;
```
混入 `src/assets/styles/mixins.less`
```less
// 鼠标经过上移阴影动画
.hoverShadow () {
  transition: all .5s;
  &:hover {
    transform: translate3d(0,-3px,0);
    box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  }
}
```
less混入就是，申明一段css代码（选择器包裹的代码）或者函数，在其他css选择器调用，可复用包裹的代码。
2. 完成自动注入公用变量和混入
**遇到问题：** 每次使用公用的变量和mixin的时候需要单独引入到文件中。
**解决方法：** 使用vuecli的style-resoures-loader插件来完成自动注入到每个less文件或者vue组件中style标签中。
- 在当前项目下执行一下命令`vue add style-resources-loader`，添加一个vuecli的插件
![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1605607316835.2f409ff6.png)
- 安装完毕后会在`vue.config.js`中自动添加配置
- 把你需要注入的文件配置一下后，重启服务即可。
```js
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 哪些文件自动引入，使用绝对路径
      // 需要使用 path.join 拼接完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/minxins.less')
      ]
    }
  }
}

```
**总结：** 知道如何定义less变量和混入代码并使用他们，通过vue-resources-loader完成代码注入再每个less文件和vue组件中。


## 首页-样式重置与公用
> 目的： 准备网站所需的重置样式代码，以及一些公用样式代码。
- 重置样式
执行 `npm i normalize.css` 安装重置样式的包，然后在 `main.js` 导入 `normalize.css` 即可。
```js
import 'normalize.css'
```
- 公用样式
新建文件 `src/assets/styles/common.less` 在该文件写入常用的样式，然后在 `main.js` 导入即可。
`src/assets/styles/common.less`
```less
// 重置样式
* {
  box-sizing: border-box;
 }
 
 html {
   height: 100%;
   font-size: 14px;
 }
 body {
   height: 100%;
   color: #333;
   min-width: 1240px;
   font: 1em/1.4 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', 'STHeiti', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif
 }
 
 ul,
 h1,
 h3,
 h4,
 p,
 dl,
 dd {
   padding: 0;
   margin: 0;
 }
 
 a {
   text-decoration: none;
   color: #333;
   outline: none;
 }
 
 i {
   font-style: normal;
 }
 
 input[type="text"],
 input[type="search"],
 input[type="password"], 
 input[type="checkbox"]{
   padding: 0;
   outline: none;
   border: none;
   -webkit-appearance: none;
   &::placeholder{
     color: #ccc;
   }
 }
 
 img {
   max-width: 100%;
   max-height: 100%;
   vertical-align: middle;
 }
 
 ul {
   list-style: none;
 }
 
 #app {
   background: #f5f5f5;
   user-select: none;
 }
 
 .container {
   width: 1240px;
   margin: 0 auto;
   position: relative;
 }
 
 .ellipsis {
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
 }
 
 .ellipsis-2 {
   word-break: break-all;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
   overflow: hidden;
 }
 
 .fl {
   float: left;
 }
 
 .fr {
   float: right;
 }
 
 .clearfix:after {
   content: ".";
   display: block;
   visibility: hidden;
   height: 0;
   line-height: 0;
   clear: both;
 }
```
src/main.js
```js
import '@/assets/styles/common.less'
```


## 首页-小兔鲜组件库

> 知道，如何导入小兔鲜组件库

注意：这个UI组件库服务于小兔鲜项目，组件业务特性很明显，不是很通用。

安装：

```bash
yarn add erabbit-ui
```

图标：`public/index.html`

```html
<link rel="stylesheet" href="https://at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">
```

![image](https://gitee.com/zhoushugang/vue3-note/raw/master/images/image-20220319160116137.png)

全局使用：

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ErabbitUI from 'erabbit-ui'
import 'erabbit-ui/packages/theme/index.less'

// 创建一个vue应用，使用仓库vuex，使用路由，使用小兔鲜儿组件库，挂载到app容器
createApp(App).use(store).use(router).use(ErabbitUI).mount("#app");
```

测试：

```vue
<xtx-button type="plain">按钮</xtx-button>
```

文档：https://www.npmjs.com/package/erabbit-ui



## 首页-css变量

> 理解：css变量的作用和使用

核心要点：

- css变量定义
- css变量使用
- 介绍小兔鲜css变量



具体内容：

- css变量定义

```css
:root{
  --main-color: #4d4e53;
}  
```

为什么选择两根连词线（`--`）表示变量？因为`$foo`被 Sass 用掉了，`@foo`被 Less 用掉了。为了不产生冲突，官方的 CSS 变量就改用两根连词线了。

- css变量使用

```css
a {
  color: var(--main-color)
}
```

`var()`函数用于读取变量

- 介绍小兔鲜css变量

```css
:root {
  --xtx-color: #27ba9b;
  --help-color: #e26237;
  --suc-color: #1dc779;
  --warn-color: #ffb302;
  --price-color: #cf4444;
}
```

主题色，帮助色，成功色，警告色，价格色



## 首页-顶部通栏渲染

> 完成：顶部通栏

核心要点：

- 顶部通栏组件
- 动态展示通栏信息（登录|未登录）



落地代码：

- 顶部通栏组件

`src/styles/index.less`

```less
// 共用的样式
body {
  margin: 0;
}
```

在 `src/components/` 下新建 `app-topnav.vue` 组件

```vue
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
        <li><a href="javascript:;">退出登录</a></li>
        <li><a href="javascript:;">请先登录</a></li>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'AppTopnav'
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: var(--xtx-color);
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
```

在 `src/views/Layout.vue` 中导入使用。

```diff
<template>
+  <AppTopnav/>
  <header>头部</header>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
+import AppTopnav from '@/components/app-topnav'
export default {
  name: 'XtxLayout',
+  components: { AppTopnav }
}
</script>

<style scoped lang='less'></style>
```

- 动态展示通栏信息（登录|未登录）

```vue
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'    
export default {
  name: 'AppTopnav',
  setup () {
      const store = useStore()
      const profile = computed(()=>{
          return store.state.user.profile
      })
      return { profile }
  }
}
</script>
```

```vue
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account}}</a></li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
```



**总结：** 

- 完成基础布局，根据用户信息动态展示导航菜单。



## 首页-头部和底部布局

> 完成：头部和底部布局，静态

核心要点：

- 头部组件
- 底部组件



落地代码：

- 头部组件

在 `src/components/` 下新建 `app-header.vue` 组件，基础布局如下：

```vue
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <ul class="navs">
        <li class="home"><RouterLink to="/">首页</RouterLink></li>
        <li><a href="#">美食</a></li>
        <li><a href="#">餐厨</a></li>
        <li><a href="#">艺术</a></li>
        <li><a href="#">电器</a></li>
        <li><a href="#">居家</a></li>
        <li><a href="#">洗护</a></li>
        <li><a href="#">孕婴</a></li>
        <li><a href="#">服装</a></li>
        <li><a href="#">杂货</a></li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped lang='less'>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/logo.png) no-repeat center 18px / contain;
    }
  }
  .navs {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        a {
          color: var(--xtx-color);
          border-bottom: 1px solid var(--xtx-color);
        }
      }
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
  .cart {
    width: 50px;
    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart{
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: var(--help-color);
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
```

在 `src/views/Layout.vue` 中导入使用

```diff
<template>
  <AppTopnav/>
+  <AppHeader/>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
+import AppHeader from '@/components/app-header'
export default {
  name: 'XtxLayout',
+  components: { AppTopnav, AppHeader }
}
</script>

<style scoped lang='less'></style>
```

- 底部组件

在 `src/components/` 下新建 `app-footer.vue` 组件，基础布局如下：

```vue
<template>
  <footer class="app-footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="../assets/qrcode.jpg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang='less'>
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }
      &:hover {
        .iconfont {
          color:  var(--xtx-color);
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }
    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: var(--xtx-color);
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #333;
  }
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
```

在 `src/views/Layout.vue` 中导入使用。

```diff
<template>
  <AppTopnav/>
  <AppHeader/>
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
+  <AppFooter/>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
+import AppFooter from '@/components/app-footer'
export default {
  name: 'XtxLayout',
+  components: { AppTopnav, AppHeader, AppFooter }
}
</script>

<style scoped lang='less'>
+.app-body {
+  min-height: 600px;
+}
</style>
```



**总结：**

- 完成 头部组件 和 底部组件 基础布局



## 首页-头部导航抽离

> 完成：提取头部分类导航组件，提供给头部，和将来的吸顶头部使用



- 新建`src/components/app-header-nav.vue` 组件。

```vue
<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li><a href="#">美食</a></li>
    <li><a href="#">餐厨</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li>
  </ul>
</template>

<script>
export default {
  name: 'AppHeaderNav'
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      a {
          color: var(--xtx-color);
          border-bottom: 1px solid var(--xtx-color);
      }
    }
  }
}
</style>
```

- 在 `app-header.vue` 中使用组件。注意，删除结构和样式。

```diff
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
+      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
+import AppHeaderNav from './app-header-nav'
export default {
  name: 'AppHeader',
+  components: { AppHeaderNav }
}
</script>
```

## 首页模块



## 首页-商品分类渲染

> 实现：商品分类渲染，数据存储在vuex中。



基本步骤：

- 在API目录定义接口函数
- 在vuex中的category模块，定义修改分类列表函数，定义获取数据函数。
- 在Layout组件获取调用actions获取数据，在头部导航组件渲染即可。
- 优化：定义一个常量数据和后台保持一致（约定好9大分类）
  - 这样不请求后台就能展示一级分类，不至于白屏。



落地代码：

- 定义API函数 `src/api/home.js`

```js
import request from "@/utils/request";
// 获取分类导航含推荐商品
export const getCategory = () => request("/home/category/head", "get");
```

- vuex在category模块，提供修改和获取的函数。 `src/store/modules/category.js`

```js
// 商品分类vuex模块
import { getCategory } from "@/api/home";
export default {
  namespaced: true,
  state() {
    return {
      // 分类列表
      list: [],
    };
  },
  mutations: {
    // 修改列表
    setList(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    // 获取列表
    async getList({ commit }) {
      const data = await getCategory();
      commit("setList", data.result);
    },
  },
};
```

- 获取数据在 `src/views/Layout.vue` 初始化的时候

```diff
+import { useStore } from "vuex";
export default {
  name: "XtxLayout",
  components: { AppTopnav, AppHeader, AppFooter },
+  setup() {
+    const store = useStore();
+    store.dispatch("category/getList");
+  },
};
```

- 在头部导航组件渲染 `src/compotents/app-header-nav.vue`

```vue
<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in $store.state.category.list" :key="item.name">
      <RouterLink :to="`category/${item.id}`">{{
        item.name
      }}</RouterLink>
    </li>
  </ul>
</template>
```

- 优化，处理白屏

`api/constants.js`

```js
export const topCategory = [
  "居家",
  "美食",
  "服饰",
  "母婴",
  "个护",
  "严选",
  "数码",
  "运动",
  "杂货",
];
```

`store/modules/category.js`

```diff
// 商品分类vuex模块
+import { topCategory } from "@/api/constants";
import { getCategory } from "@/api/home";
export default {
  namespaced: true,
  state() {
    return {
      // 分类列表
+      list: topCategory.map((item) => ({ name: item })),
    };
  },
```

`app-header-nav.vue`

```vue
    <li v-for="item in $store.state.category.list" :key="item.name">
      <RouterLink v-if="item.id" :to="`/category/${item.id}`">
        {{ item.name }}
      </RouterLink>
      <a v-else href="javascript:;">{{ item.name }}</a>
    </li>
```



**总结：**

- request ====>  api  ====>  vuex(action) ====> 组件，数据请求逻辑。

## 首页-头部分类导航交互
> 目的：实现点击的时候跳转，且能关闭二级分类弹窗。

描述：由于是单页面路由跳转不会刷新页面，css的hover一直触发无法关闭分类弹窗。

大致逻辑：
- 配置路由组件支持分类跳转
- 鼠标进入一级分类展示对应的二级分类弹窗
- 点击一级分类，二级分类，隐藏二级分类弹窗
- 离开一级分类，二级分类，隐藏二级分类弹窗
落地代码：

1. 配置路由和组件实现跳转

- 配置路由规则 `layout.route.js`
```diff
export const Layout = [
  // 一级路由布局容器
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        // 首页
        path: '/',
        name: 'HomePage',
        component: () => import('@/views/home')
      },
+      {
+        // 顶级菜单
+        path: 'category/:id',
+        name: 'TopCategory',
+        component: () => import('@/views/category')
+      },
+      {
+        // 二级菜单
+        path: '/category/sub/:id',
+        name: 'SubCategory',
+        component: () => import('@/views/category/sub')
+      }
    ]
  }
]

```
- 创建分类组件 `src/views/category/index.vue`
```vue
<template>
  <div>Top-Category</div>
</template>
<script>
export default {
  name: 'TopCategory'
}
</script>
<style scoped lang="less"></style>
```
`src/views/category/sub.vue`
```vue
<template>
  <div>Sub-Category</div>
</template>
<script>
export default {
  name: 'SubCategory'
}
</script>
<style scoped lang="less"></style>
```
2. 跳转后关闭二级分类弹窗
- 给每一个一级分类定义控制显示隐藏的数据，open 布尔类型，通过open设置类名控制显示隐藏。
- 当进入一级分类的时候，将open改为true
- 当离开一级分类的时候，将open改为false
- 点击一级分类，二级分类，将open改为false
在vuex种给一级分类加open数据 `src/store/modules/category.store.js`
```diff
  // 获取分类函数
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const data = await reqFindAllCategory()
+      // 给每个分类加上控制二级分类显示和隐藏的字段
+      data.result.forEach(top => {
+        top.open = false
+      })
      // 修改分类数据
      commit('setList', data.result)
    }
  }
```
添加了 show hide vuex的mutations函数修改 open
```diff
// 加载数据成功后需要修改list所以需要mutations函数
mutations: {
    // payload 所有的分类集合
    setList (state, payload) {
        state.list = payload
    },
+    // show 和 hide 函数控制当前分类的二级分类显示和隐藏
+    show (state, id) {
+        // 找到当前分类
+        const currCategory = state.list.find(item => item.id === id)
+        // 修改当前一级分类下的open数据为true
+        currCategory.open = true
+    },
+    hide (state, id) {
+        // 找到当前分类
+        const currCategory = state.list.find(item => item.id === id)
+        // 修改当前一级分类下的open数据为false
+        currCategory.open = false
+s    }
}
```
头部导航组件 实现显示和隐藏 `src/components/app-header-nav.vue`
```js
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
```
```diff
<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
+    <li v-for="item in list" :key="item.id" @mouseenter="show(item.id)" @mouseleave="hide(item.id)">
+      <router-link :to="`/category/${item.id}`"  @click="hide(item.id)">{{item.name}}</router-link>
+      <div class="layer" :class="{open: item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
+            <router-link :to="`/category/sub/${sub.id}`" @click="hide(item.id)">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
```
```diff
-      // > .layer {
-      //   height: 132px;
-      //   opacity: 1;
-      // }
    }
  }
}
.layer {
+  &.open {
+    height: 132px;
+    opacity: 1;
+  }
```

## 首页-头部吸顶效果

> 目标：头部吸顶组件准备，吸顶效果实现

实现步骤：

- 准备好静态组件，Layout使用组件
- 理解吸顶效果的样式实现
- 监听滚动事件，卷曲高度大于78px滑入，否则隐藏



具体代码：

- 新建 `src/components/app-header-sticky.vue` 组件完成布局

```vue
<template>
  <div class="app-header-sticky">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from './app-header-nav'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/logo.png) no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid var(--xtx-color);
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: var(--xtx-color);
      }
    }
  }
}
</style>
```

- 准备滑入效果的样式，添加show就滑入

```diff
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
+  transform: translateY(-100%);
+  opacity: 0;
+  &.show {
+    transition: all 0.3s linear;
+    transform: none;
+    opacity: 1;
+  }
```

- 组件渲染后，监听滚动距离超过78px显示，否则隐藏

```js
import { onMounted, onUnmounted, ref } from "vue";
import AppHeaderNav from "./app-header-nav";
export default {
  name: "AppHeaderSticky",
  components: { AppHeaderNav },
  setup() {
    const y = ref(0);
    const toggle = () => {
      y.value = document.documentElement.scrollTop;
    };
    onMounted(() => {
      window.addEventListener("scroll", toggle);
    });
    // 组件销毁需要注销事件
    onUnmounted(() => {
      window.removeEventListener("scroll", toggle);
    });
    return { y };
  },
};
```

```vue
<!-- 滑入滑出 --> 
<div class="app-header-sticky" :class="{show:y>=78}">
```



**总结：**

- 实现吸顶效果，监听滚动距离去操作JS的代码挺多考虑的也挺多，如果有库就好了。



## 首页-头部吸顶vueuse实现

> 使用@vuesue/core库的API实现监听滚动距离，实现头部吸顶效果

大致过程：

- 了解vueuse这个库作用
- 使用vueuse改造吸顶代码



主要内容：

- vueuse介绍
  - 作者：Anthony Fu ，是 vue vite 的团队成员
  - 200+ 工具函数 （hook函数）
  - 主要是把JS的一些API返回的信息转换成响应式数据，提高开发效率
  - https://vueuse.org/
- 使用vueuse改造吸顶代码

```bash
yarn add @vueuse/core
```

```diff
+import { useWindowScroll } from "@vueuse/core";
import AppHeaderNav from "./app-header-nav";
export default {
  name: "AppHeaderSticky",
  components: { AppHeaderNav },
  setup() {
+    const { y } = useWindowScroll();
    return { y };
  },
};
```



**总结：**

- 今后浏览器信息相关，或者一些工具函数，可以先考虑下 @vueuse/core 是否提供



## 首页-左侧分类布局

> 目标：完成左侧分类布局和样式调整

大致步骤：

- 准备首页分类组件
- 使用组件
- 主体内容样式调整



落地代码：

- 准备组件：`src/views/home/components/home-category.vue`

```vue
<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="i in 10" :key="i">
        <RouterLink to="/">居家</RouterLink>
        <a href="javascript:;">洗漱</a>
        <a href="javascript:;">清洁</a>
        <!-- 弹层 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in 9" :key="i">
              <RouterLink to="/">
                <img
                  src="https://yanxuan-item.nosdn.127.net/5a115da8f2f6489d8c71925de69fe7b8.png"
                  alt=""
                />
                <div class="info">
                  <p class="name ellipsis-2">
                    【定金购】严选零食大礼包（12件）
                  </p>
                  <p class="desc ellipsis">超值组合装，满足馋嘴欲</p>
                  <p class="price"><i>¥</i>100.00</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeCategory",
};
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    > li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: var(--xtx-color);
      }
      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              &:hover {
                background: #e3f9f4;
              }
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                width: 190px;
                .name {
                  font-size: 16px;
                  color: #666;
                }
                .desc {
                  color: #999;
                }
                .price {
                  font-size: 22px;
                  color: var(--price-color);
                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
      &:hover {
        .layer {
          display: block;
        }
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
```

- 使用组件 `src/views/home/index.vue`

```vue
<template>
  <div class="xtx-home-page">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategory from "./components/home-category";
export default {
  name: "XtxHomePage",
  components: { HomeCategory },
};
</script>

```

- 内容主体设置灰色

`Layout.vue`

```vue
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
```

`styles/index.less`

```css
.app-body {
  background-color: #f5f5f5;
  min-height: 600px;
}
```





## 首页-左侧分类渲染

> 目的：基于vuex数据通过计算属性得到要求数据进行渲染

大致步骤：

- 定义计算属性获取符合要求的数据，子分类2个即可。
- 使用数据进行渲染



落地代码：

 `scr/views/home/components/home-category.vue`

- 准备数据

```js
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "HomeCategory",
  setup() {
    const store = useStore();
    const categoryList = computed(() => {
      const list = store.state.category.list.map((item) => {
        // 保留子分类的前两项
        const { id, name, children, goods } = item;
        return { id, name, children: children && children.slice(0, 2), goods };
      });
      return list;
    });
    return { categoryList };
  },
};
```

- 渲染组件

```vue
<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryList" :key="item.name">
        <RouterLink :to="item.id ? `/category/${item.id}` : '/'">
          {{ item.name }}
        </RouterLink>
        <a href="javascript:;" v-for="sub in item.children" :key="sub.id">
          {{ sub.name }}
        </a>
        <!-- 弹层 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="pro in item.goods" :key="pro.id">
              <RouterLink :to="`/product/${pro.id}`">
                <img :src="pro.picture" />
                <div class="info">
                  <p class="name ellipsis-2">{{ pro.name }}</p>
                  <p class="desc ellipsis">{{ pro.desc }}</p>
                  <p class="price"><i>¥</i>{{ pro.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
```



## 首页-左侧分类品牌

> 目的：给左侧分类添加品牌数据并且展示

大致步骤：

- 定义品牌数据，给计算属性添加品牌
- 定义API函数，组件渲染后获取设置给品牌列表
- 准备结构和样式
- 通过数据渲染



落地代码：

- 定义品牌数据，给计算属性添加品牌   `scr/views/home/components/home-category.vue`

```js
import { reactive } from "vue";
```

```js
    // 品牌数据
    const brand = reactive({
      name: "品牌",
      children: [{ name: "品牌推荐" }],
      brands: [],
    });
```

```diff
      const list = store.state.category.list.map((item) => {
        // 保留子分类的前两项
        const { id, name, children, goods } = item;
        return { id, name, children: children && children.slice(0, 2), goods };
      });
+      // 添加品牌数据
+      list.push(brand);
      return list;
```

- 定义API函数，组件渲染后获取设置给品牌列表

`src/api/home.js`

```js
// 获取品牌数据
export const getBrand = (limit) => request("/home/brand", "get", { limit });
```

 `scr/views/home/components/home-category.vue`

```js
    onMounted(async () => {
      const data = await getBrand(6);
      brand.brands = data.result;
    });
```

- 准备结构和样式

```vue
<ul>
  <li class="brand" v-for="i in 6" :key="i">
    <RouterLink to="/">
      <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_1.jpg" alt="">
      <div class="info">
        <p class="place"><i class="iconfont icon-dingwei"></i>北京</p>
        <p class="name ellipsis">DW</p>
        <p class="desc ellipsis-2">DW品牌闪购</p>
      </div>
    </RouterLink>
  </li>
</ul>
```

```less
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
```

- 渲染品牌列表

```diff
        <!-- 弹层 -->
        <div class="layer">
          <h4>
+            {{ item.brands ? "品牌" : "分类" }}推荐
            <small>根据您的购买或浏览记录推荐</small>
          </h4>
+          <ul v-if="item.brands">
+            <li class="brand" v-for="bra in item.brands" :key="bra.id">
+              <RouterLink to="/">
+                <img :src="bra.picture" />
+                <div class="info">
+                  <p class="place">
+                    <i class="iconfont icon-dingwei"></i>{{ bra.place }}
+                  </p>
+                  <p class="name ellipsis">{{ bra.name }}</p>
+                  <p class="desc ellipsis-2">{{ bra.desc }}</p>
+                </div>
+              </RouterLink>
+            </li>
+          </ul>
+          <ul v-else>
            <li v-for="pro in item.goods" :key="pro.id">
              <RouterLink :to="`/product/${pro.id}`">
                <img :src="pro.picture" />
                <div class="info">
                  <p class="name ellipsis-2">{{ pro.name }}</p>
                  <p class="desc ellipsis">{{ pro.desc }}</p>
                  <p class="price"><i>¥</i>{{ pro.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
```



**总结：**

- 计算属性依赖响应式数据，数据改变计算属性才改变。



## 首页-左侧分类骨架

> 目的：在加载过程使用骨架降低用户等待焦虑

大致步骤：

- 理解加载过程中使用骨架提高体验
- 知道 `XtxSkeleton` 组件基本使用
- 使用 `XtxSkeleton` 组件，添加动画



具体代码：

- 理解加载过程中使用骨架提高体验

![image-20220320135120913](./images/image-20220320135120913-7755483.png)

- 知道 `XtxSkeleton` 组件基本使用

| 名称            | 类型    | 默认值  |
| --------------- | ------- | ------- |
| bg 背景         | String  | #efefef |
| width 宽        | String  | 100px   |
| height 高       | String  | 100px   |
| animated 闪动画 | Boolean | false   |

- 使用 `XtxSkeleton` 组件，添加动画

```vue
        <a href="javascript:;" v-for="sub in item.children" :key="sub.id">
          {{ sub.name }}
        </a>
        <template v-if="!item.children">
          <XtxSkeleton width="70px" height="18px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="40px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
        <!-- 弹层 -->
```

```less
.xtx-skeleton {
  animation: fade 1.5s linear infinite alternate;
  margin-right: 6px;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
```



**总结：**

- 骨架效果也是提高用户体验的方式之一



## 首页-轮播图

> 目标：使用轮播图组件完成首页轮播图功能

大致步骤：

- 知道 `XtxCarousel` 组件基本使用
- 使用 `XtxCarousel` 组件，样式覆盖
- 定义API，获取数据给轮播图



落地代码：

- 知道 `XtxCarousel` 组件基本使用

| 名称               | 类型                              | 默认值   |
| ------------------ | --------------------------------- | -------- |
| sliders 轮播图数据 | Array `[{imgUrl:'图片地址'},...]` | []       |
| autoPlay 自动播放  | Boolean                           | false    |
| duration  间隔时间 | Number                            | 3000毫秒 |

- 使用 `XtxCarousel` 组件，样式覆盖

```diff
        <!-- 左侧分类 -->
        <HomeCategory />
+        <div class="home-banner">
+          <!-- 轮播图 -->
+          <XtxCarousel :sliders="[]"></XtxCarousel>
+        </div>
```

```vue
<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    width: 100%;
    height: 100%;
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
```

- 定义API，获取数据给轮播图

`api/home.js`

```js
// 获取轮播图数据
export const getSliders = () => request("/home/banner", "get");
```

`home/index.vue`

```js
import { onMounted, ref } from "vue";
import HomeCategory from "./components/home-category";
import { getSliders } from "@/api/home";
export default {
  name: "XtxHomePage",
  components: { HomeCategory },
  setup() {
    // 获取轮播图数据
    const sliders = ref([]);
    onMounted(async () => {
      const data = await getSliders();
      sliders.value = data.result;
    });
    return { sliders };
  },
};
```

```vue
<XtxCarousel :sliders="sliders" autoPlay></XtxCarousel>
```



## 首页-面板组件

> 目的：提取首页面板组件进行复用

封装思路：

- 头部：标题和副标题由props传入，右侧内容通过#right插槽传入
- 主体：通过默认插槽传入

![image-20220320144743371](./images/image-20220320144743371.png)

落地代码：

`home/components/home-panel`

```vue
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
        <slot name="right" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePanel",
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
```



**总结：**

- 通过匿名，具名插槽提高组件结构复用




## 首页-新鲜好物

> 目标：新鲜好物板块布局和渲染

大致步骤：

- 布局样式
- 数据渲染



具体代码：

- 布局样式 

准备组件`home/components/home-new.vue`

```vue
<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right><XtxMore style="line-height: 22px" /></template>
    <!-- 面板内容 -->
    <div class="home-new">
      <ul class="goods-list">
        <li v-for="item in 4" :key="item">
          <RouterLink to="/">
            <img
              src="https://yanxuan-item.nosdn.127.net/b011048adc2bf3952c72e741e47d1419.jpg"
              alt=""
            />
            <p class="name ellipsis">电动红酒醒酒器分酒器取酒器</p>
            <p class="price">&yen;169.00</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>
<script>
import HomePanel from "./home-panel";
export default {
  name: "HomeNew",
  components: { HomePanel },
};
</script>
<style scoped lang="less">
.home-new {
  position: relative;
  height: 426px;
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: var(--price-color);
    }
  }
}
</style>
```

使用组件 `home/index.vue`

```diff
+import HomeNew from "./components/home-new";

+  components: { HomeCategory, HomeNew },
```

```vue
    <!-- 新鲜好物 -->
    <HomeNew />
```



- 数据渲染

`api/home.js`

```js
// 获取新鲜好物数据
export const getNewGoods = () => request("/home/new", "get");
```

`home/components/home-new.vue`

```js
import { onMounted, ref } from "vue";
import HomePanel from "./home-panel";
import { getNewGoods } from "@/api/home";
export default {
  name: "HomeNew",
  components: { HomePanel },
  setup() {
    const list = ref(0);
    onMounted(async () => {
      const data = await getNewGoods();
      list.value = data.result;
    });
    return { list };
  },
};
```

```vue
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
```





## 首页-人气推荐

> 目标：人气推荐板块布局和渲染

大致步骤：

- 布局样式
- 数据渲染



落地代码：

- 布局样式 

准备组件 `home/components/home-hot.vue`

```vue
<template>
  <HomePanel title="人气推荐" sub-title="人气推荐 不容错过">
    <!-- 面板内容 -->
    <div class="home-hot">
      <ul class="goods-list">
        <li v-for="item in 4" :key="item">
          <RouterLink to="/">
            <img src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_1.jpg" />
            <p class="name ellipsis">特惠推荐</p>
            <p class="desc">它们最实惠</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>
<script>
import HomePanel from "./home-panel";
export default {
  name: "HomeNew",
  components: { HomePanel }
};
</script>
<style scoped lang="less">
.home-hot {
  position: relative;
  height: 426px;
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
```

使用组件 `home/index.vue`

```diff
+import HomeNew from "./components/home-hot";

+  components: { HomeCategory, HomeNew, HomeHot },
```

```vue
    <!-- 人气推荐 -->
    <HomeHot />
```



- 数据渲染

`api/home.js`

```js
// 获取人气推荐数据
export const getHot = () => request("/home/hot", "get");
```

`home/components/home-hot.vue`

```js
import { onMounted, ref } from "vue";
import HomePanel from "./home-panel";
import { getHot } from "@/api/home";
export default {
  name: "HomeNew",
  components: { HomePanel },
  setup() {
    const list = ref(0);
    onMounted(async () => {
      const data = await getHot();
      list.value = data.result;
    });
    return { list };
  },
};
```

```vue
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" />
            <p class="name ellipsis">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
```



## 首页-补充vue动画

>目标：知道vue中如何使用动画，知道Transition组件使用。



在vue中，显示隐藏，创建移除，一个元素或者一个组件的时候，可以通过transition实现动画。

![image-20220320183625162](./images/image-20220320183625162.png)

6个状态对应6个类名：

- 进入（显示，创建）
  - v-enter-from 进入前 （vue2.0 v-enter）
  - v-enter-active 进入中
  - v-enter-to 进入后
- 离开（隐藏，移除）
  - v-leave-from 离开前 （vue2.0 v-leave）
  - v-leave-active 离开中
  - v-leave-to 离开后

多个transition使用不同动画，可以添加nam属性，name属性的值替换v即可。



如果元素或组件离开，完成一个淡入淡出效果：

```vue
<transition name="fade">
  <p v-if="show">100</p>
</transition>
```

 ```css
 .fade-enter-from {
     opacity: 0
 }
 .fade-enter-active {
     transition: all 2s;
 }
 .fade-enter-to {
     opcaity: 1
 }
 .fade-leave-from {
     opacity: 1
 }
 .fade-leave-active {
     transition: all 2s;
 }
 .fade-leave-to {
     opcaity: 0
 }
 ```





## 首页-骨架动画效果

> 使用transition组件添加骨架动画效果

大致步骤：

- 定义一个骨架组件
- 在 新鲜好物  人气推荐 分别使用
- 使用 transition 组件，动画名称 fade 在UI组件库中



落地代码：

- 定义一个骨架组件

```vue
<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSkeleton",
  props: {
    bg: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style scoped lang="less">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
```

- 在 新鲜好物  人气推荐 分别使用

`home-new.vue`

```diff
+      <Transition name="fade">
+        <ul class="goods-list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
+        <HomeSkeleton name="fade" v-else bg="#f0f9f4" />
+      </Transition>
```

`home-hot.vue`

```diff
+      <Transition name="fade">
+        <ul class="goods-list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" />
              <p class="name ellipsis">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
+        <HomeSkeleton v-else />
+      </Transition>
```



UI组件库代码：`erabbit-ui/packages/theme/index.less` 不用写，组件库提供

```less
 // 离开时候淡出动画
.fade{
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity .5s .2s;
      z-index: 1;
    }
    &-to {
      opacity: 0;
    }
  }
}
```





## 首页-数据懒加载

> 目标：使用vueuse提供的函数监听进入可视区，完成数据懒加载

大致步骤：

- 知道 [useIntersectionObserver](https://vueuse.org/core/useIntersectionObserver/) 使用方法
- 使用 `useIntersectionObserver` 实现数据懒加载（进入可视区发请求）
- 封装 `useLazyData` 函数，在 新鲜好物 人气推荐 组件使用



落地代码：

- 知道 `useIntersectionObserver`  使用

```js
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export default {
  setup() {
    const target = ref(null)
    const targetIsVisible = ref(false)

    // stop 停止观察函数
    const { stop } = useIntersectionObserver(
      // 需要观察的元素，通过ref获取的DOM元素或组件
      target,
      // isIntersecting 是否进入可视区 observerElement 被观察的元素
      ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting
      },
    )

    return {
      target,
      targetIsVisible,
    }
  },
}
```

- 使用 `useIntersectionObserver` 实现数据懒加载

```diff
+import { useIntersectionObserver } from "@vueuse/core";
export default {
  name: "HomeNew",
  components: { HomePanel, HomeSkeleton },
  setup() {
    const list = ref(0);
    
+    const target = ref(null);
+    const { stop } = useIntersectionObserver(
+      target,
+      async ([{ isIntersecting }]) => {
+        if (isIntersecting) {
+          stop();
+          const data = await getNewGoods();
+          list.value = data.result;
+        }
+      }
+    );

+    return { list, target };
  },
};
```

```vue
  <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
```

- 封装 `useLazyData` 函数，在 新鲜好物 人气推荐 组件使用

`utils/hooks.js`

```js
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

/**
 * 懒加载函数
 * @param {function} apiFn API函数
 * @returns
 */
export const useLazyData = (apiFn) => {
  const target = ref(null);
  const list = ref([]);
  const { stop } = useIntersectionObserver(
    target,
    async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop();
        const data = await apiFn();
        list.value = data.result;
      }
    }
  );
  return { target, list };
};
```

新鲜好物 `home-new`

```diff
import HomePanel from "./home-panel";
import { getNewGoods } from "@/api/home";
+import { useLazyData } from "@/utils/hooks";
import HomeSkeleton from "./home-skeleton";
export default {
  name: "HomeNew",
  components: { HomePanel, HomeSkeleton },
  setup() {
+    const { list, target } = useLazyData(getNewGoods);
    return { list, target };
  },
};
```

人气推荐 `home-hot`

```vue
<HomePanel ref="target" title="人气推荐" sub-title="人气推荐 不容错过">
```

```diff
import HomePanel from "./home-panel";
import { getHot } from "@/api/home";
+import { useLazyData } from "@/utils/hooks";
import HomeSkeleton from "./home-skeleton";
export default {
  name: "HomeNew",
  components: { HomePanel, HomeSkeleton },
  setup() {
+    const { list, target } = useLazyData(getHot);
+    return { list, target };
  },
};
```



**总结：**

- 体会组合API提高逻辑复用



## 首页-热门品牌（作业）

> 目标：使用懒加载函数和骨架完成热门品牌功能

大致步骤：

- 完成组件布局和样式
- 使用 `useLazyData` 加载数据，渲染列表
- 利用骨架组件完成加载效果
- 完成列表滑动效果



具体代码：

- 完成组件布局和样式

`home-brand.vue`

```vue
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left"></a>
      <a href="javascript:;" class="iconfont icon-angle-right"></a>
    </template>
    <div class="box" ref="box">
      <ul class="list">
        <li v-for="i in 10" :key="i">
          <RouterLink to="/">
            <img
              src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_1.jpg"
              alt=""
            />
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from "./home-panel";
export default {
  name: "HomeBrand",
  components: { HomePanel },
};
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: var(--xtx-color);
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
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
</style>
```

- 使用 `useLazyData` 加载数据，渲染列表

```js
import { useLazyData } from "@/utils/hooks";
import HomePanel from "./home-panel";
import { getBrand } from "@/api/home";
export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
    // 数据
    const { target, list } = useLazyData(() => getBrand(10));
    return { target, list };
  },
};
```

```vue
          <li v-for="item in list" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
```

- 利用骨架组件完成加载效果

```diff
+      <Transition name="fade">
+        <ul class="list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
+        <div v-else class="skeleton">
+          <XtxSkeleton
+            class="item"
+            v-for="i in 5"
+            :key="i"
+            animated
+            bg="#e4e4e4"
+            width="240px"
+            height="305px"
+          />
+        </div>
+      </Transition>
```

```less
.skeleton {
  display: flex;
  .xtx-skeleton {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
```



- 完成列表滑动效果

```diff
+import { ref } from "vue";
export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
+    // 切换
+    const translateX = ref(0);
+    const toggle = (x) => {
+      translateX.value = x;
+    };
    // 数据
    const { target, list } = useLazyData(() => getBrand(10));
+    return { target, list, translateX, toggle };
  },
};
```

```vue
      <a
        @click="toggle(0)"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: translateX === 0 }"
      ></a>
      <a
        @click="toggle(-1240)"
        href="javascript:;"
        class="iconfont icon-angle-right next"
        :class="{ disabled: translateX === -1240 }"
      ></a>
```

```vue
        <ul
          class="list"
          v-if="list.length"
          :style="{ transform: `translateX(${translateX}px)` }"
        >
```



**总结：**

- 综合 数据懒加上 骨架效果 完成该功能
