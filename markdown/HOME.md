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

![image-20220319160116137](https://gitee.com/zhoushugang/vue3-note/raw/master/images/image-20220319160116137.png)

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



### 13-首页-顶部通栏渲染

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



### 14-首页-头部和底部布局

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



### 15-首页-头部导航抽离

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








