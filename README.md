<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [PC端电商项目](#pc%E7%AB%AF%E7%94%B5%E5%95%86%E9%A1%B9%E7%9B%AE)
  - [项目介绍](#%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D)
  - [配套资源](#%E9%85%8D%E5%A5%97%E8%B5%84%E6%BA%90)
  - [使用技术](#%E4%BD%BF%E7%94%A8%E6%8A%80%E6%9C%AF)
  - [地址](#%E5%9C%B0%E5%9D%80)
  - [目录调整](#%E7%9B%AE%E5%BD%95%E8%B0%83%E6%95%B4)
  - [拆分vuex模块](#%E6%8B%86%E5%88%86vuex%E6%A8%A1%E5%9D%97)
  - [实现vuex持久化](#%E5%AE%9E%E7%8E%B0vuex%E6%8C%81%E4%B9%85%E5%8C%96)
  - [request封装-axios配置](#request%E5%B0%81%E8%A3%85-axios%E9%85%8D%E7%BD%AE)
  - [request封装-工具函数](#request%E5%B0%81%E8%A3%85-%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0)
  - [路由规则](#%E8%B7%AF%E7%94%B1%E8%A7%84%E5%88%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# PC端电商项目

## 项目介绍
目标功能：

- 首页模块：顶部通栏，吸顶导航，网站头部，左侧分类，轮播图，新鲜好物，人气推荐，热门品牌，分类商品推荐，专题推荐，网站底部。
- 一级分类：面包屑，轮播图，全部二级分类，二级分类推荐商品。
- 二级分类：筛选区域，排序功能，商品列表，无限加载。
- 商品详情：商品图片展示，基本信息展示，配送城市选择，SKU选择，库存选择，商品详情展示，商品评价展示，24小时热销，相关专题，加入购物车。
- 购物车
    - 头部购物车：展示商品数量和列表，删除商品，跳转购物车页面。
    - 购物车页面：购物车商品展示，选择商品，修改数量，修改商品规格，价格计算，跳转下单
- 登录模块：表单校验，账户密码登录，手机号登录，第三方登录，绑定手机，完善信息
- 填写订单：订单商品展示，收货地址选择，收货地址修改，支付方式选择，生成订单。
- 进行支付：订单信息展示，跳转支付网关，提示正在支付，等待支付结果，跳转支付成功页面。
- 个人中心
    - 中心首页：展示个人信息，近期收藏商品，近期足迹，猜你喜欢
    - 订单管理：全部订单，待付款，待发货，待收货，待评价，已完成，已取消。立即付款，取消订单，确认收货，删除订单，查看物流。
    - 订单详情：订单状态，订单进度，详细信息。
总结：完成电商支付闭环。

## 配套资源
- [设计图](https://user.mockplus.cn/signin?next=http://app.mockplus.cn/app/MLUPlO1_G/design)
- [原型稿](https://app.mockplus.cn/run/prototype/QO7BCWlUKB/IWlj1dabSw/c-f4gj1smb0?cps=expand&ha=1&ps=1)
- [接口文档](https://zhoushugang.gitee.io/erabbit-client-pc-document/api.html)

## 使用技术
项目基于vue技术来实现，大概会使用以下技术：

- vue3.0 (使用组合api的方式来开发)
- vue-cli (项目脚手架)
- axios (请求接口)
- vue-router (单页路由)
- vuex (状态管理)
- vuex-persistedstate (vuex数据持久化)
- normalize.css (初始化样式)
- @vueuse/core (组合api常用工具库)
- 算法 Power Set(opens new window)
- dayjs (日期处理)
- vee-validate （表单校验）

***重点：*** 电商常见业务和解决方案，掌握基于vue3.0的组合api开发模式。

***说明：*** 由于前台项目，没有合适的UI组件库（没有适用vue3.0的ui库），所有组件基本自己封装。

- 轮播图组件
- 面包屑组件 render+createVnode
- 查看更多组件
- 骨架屏组件
- 复选框组件
- 单选框组件
- 对话框组件
- 消息提示组件 函数调用
- 消息确认组件 函数调用
- 分页组件
- 步骤条组件
- 时间线组件
- 标签页组件 render + jsx
- 城市选择组件
总结：基于vue3.0的技术栈，大量的组件封装。

## 地址
https://zhoushugang.gitee.io/erabbit-client-pc-document/guide/00-vue3pre.html
https://gitee.com/zhoushugang/projects

## 目录调整

> 了解生成的默认代码，按照功能调整目录

核心要点：

- 解读调整默认生成的代码
- 按照项目功能调整目录



具体内容：

1. 解读默认生成的代码

`src/router/index.js`  路由代码

```js
import { createRouter, createWebHashHistory } from "vue-router";

// 写路由规则
const routes = [];

// createRouter 创建路由实例 
const router = createRouter({
  // 路由模式：createWebHashHistory() 创建hash模式路由
  history: createWebHashHistory(),
  routes,
});

export default router;
```



`store/index.js` vuex的代码

```js
import { createStore } from "vuex";

// createStore 创建一个vuex仓库
export default createStore({
  // 状态
  state: {},
  // vuex的计算属性
  getters: {},
  // 修改数据
  mutations: {},
  // 异步操作
  actions: {},
  // 模块
  modules: {},
});
```

`main.js` 入口文件

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 创建app实例，使用store插件，使用router插件，挂载到app容器
createApp(App).use(store).use(router).mount("#app");
```



2. 调整项目目录 

assets 下的logo删除，components下组件删除，views下组件删除，App组件代码删除。

```bash
src
|-- assets
|-- components
|-- router
|-- store
|-- views
|-- App.vue
|-- main.js
```



**总结：**

- 怎么创建 router 实例？
  - createRouter()
- 怎么创建 store 仓库？
  - createStore()



## 拆分vuex模块

> 能够定义 cart 模块，category模块 和 user 模块在vuex中

核心内容：

- 介绍我们有三个模块需要vuex来存储数据
- 分别定义这三个模块，合并到store的 `modules` 选项中



代码落地：

- 三个模块
  - cart 存储购物车，头部组件要使用，购物车页面要使用。
  - category 存储分类，头部组件要使用，首页需要使用分类。
  - user 模块，用户信息，token信息，几乎所有页面需要使用。
- 代码

`store/modules/cart.js`

```js
// 购物车状态
export default {
  namespaced: true,
  state() {
    return {
      // 购物车列表
      list: [],
    };
  },
};
```

`store/modules/category.js`

```js
// 分类模块
export default {
  namespaced: true,
  state() {
    return {
      // 分类列表
      list: [],
    };
  },
};
```

`store/modules/user.js`

```js
// 用户模块
export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        id: null,
        avatar: null,
        nickname: null,
        account: null,
        mobile: null,
        token: null,
      },
    };
  },
};
```

`store/index.js`

```js
import { createStore } from "vuex";

import cart from "./modules/cart";
import category from "./modules/category";
import user from "./modules/user";

export default createStore({
  modules: {
    cart,
    category,
    user,
  },
});
```



**总结：**

- 使用 modules 选项，关联三个vuex模块。



## 实现vuex持久化

> 掌握，为项目配置vuex数据持久化插件

核心内容：

- 理解 `user` 模块  `cart` 模块需要本地存储
- 在项目中使用 `vuex-persistedstate`  持久化 `cart` 模块 和 `user` 模块
- 测试 通过修改 user 模块的数据验证是否生效



具体落地：

- 为什么要本地存储 user 和 cart ？
  - user 信息保存登录token，刷新页面还需要存在
  - cart 信息在没有登录的时候要存储，存储在哪里本地
- 为什么要用户插件？
  - 如果不使用插件，操作了vuex还需要手动的去更新下本地存储，非常麻烦
-  `vuex-persistedstate` 插件作用？
  - 在更新vuex数据的时候，插件会自动去更新本地存储，方便
- 使用步骤：



安装：

```bash
yarn add vuex-persistedstate
```

使用：`store/index.js`

```js
// 创建插件函数
import createPersistedstate from "vuex-persistedstate";

export default createStore({
  modules: {
    cart,
    category,
    user,
  },
  plugins: [
    // 使用插件
    createPersistedstate({
      // 本地存储key
      key: "erabbit-store",
      // 存储哪些modules
      paths: ["cart", "user"],
    }),
  ],
});
```

测试：

`store/modules/user.js`

```js
  mutations: {
    setProfile(state, payload) {
      // 保留原来数据，合并新数据
      state.profile = payload;
    },
  },
```

`App.vue`

```vue
<template>
  <div>App 组件</div>
  <div>nikename值：{{ $store.state.user.profile.nickname }}</div>
  <button @click="$store.commit('user/setProfile', { nickname: '测试2' })">
    改值
  </button>
</template>
```





## request封装-axios配置

> 掌握，request的axios配置

核心要点：

- 创建一个axios实例，添加基础配置
- 请求头有token的时候携带token
- 剥离一层数据，响应401的时候拦截到登录



安装：

```bash
yarn add axios
```

代码落地：

`utils/request.js`

```js
import axios from "axios";
import store from "@/store";
import router from "@/router";

// 1. 创建axios和基本配置
const instance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net/",
  timeout: 5000,
});

// 2. 请求拦截器，携带token
instance.interceptors.request.use(
  (config) => {
    const { profile } = store.state.user;
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// 3. 响应拦截器，取出内ret中的data，处理401错误
instance.interceptors.response.use(
  (ret) => ret.data,
  (err) => {
    if (err.response && err.response.status === 401) {
      // 清除用户信息
      store.commit("user/setProfile", {});
      // 跳转登录页
      router.push("/login");
    }
    return Promise.reject(err);
  }
);

```



**总结：**

- 创建axios实例，使用 `axios.create({...})`
- 拦截器和之前写一样，剥离一层数据是为了组件中使用方便。



## request封装-工具函数

> 掌握，使用配置好的axios封装请求工具函数给api接口函数使用

核心要点：

- 回顾之前调用接口的套路
- 封装一个调用接口相对简洁的函数（便捷）导出给 api 层使用



主要内容：

- 回顾之前调用接口的套路

![image](https://gitee.com/zhoushugang/vue3-note/raw/master/images/image-20220318235157128-7618720.png)

- 封装一个调用接口相对简洁的函数（便捷）导出给 api 层使用

```js
/**
 * 请求工具函数
 * @param {string} url 请求地址
 * @param {string} method 请求方式
 * @param {object} submitData 请求传参
 * @returns Promise
 */
const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    // 1. get 请求 params 传参
    // 2. 其他请求使用 data 传参
    // 3. [js表达式] 是动态使用key
    // 4. toLowerCase() 处理大小写，程序健壮
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
  });
};

export default request;
```



**总结：**

- 封装request工具函数的目的是提供复用，调用接口代码更简洁。



## 路由规则

> 理解，路由设计的依据，提前约定好路由规则

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1605599713484.0e555306.png)

路由设计依据：

- （全部切换）首页 与 登录
- （部分切换）首页框架容器不变，内容变化
  - 首页内容
  - 分类内容
  - 商品内容
  - ...
- 会变化的地方就是路由出口，写 `router-view` 的 地方，根据嵌套关系分为 1 2 级路由。



约定路由规则：

| 路径          | 组件（功能）       | 嵌套级别 |
| ------------- | ------------------ | -------- |
| /             | 首页布局容器Layout | 1级      |
| /             | 首页               | 2级      |
| /category/:id​ | 分类               | 2级      |
| /search       | 搜索               | 2级      |
| /product/:id  | 商品详情           | 2级      |
| /login        | 登录               | 1级      |
| /cart         | 购物车             | 2级      |
| /checkout     | 填写订单           | 2级      |
| /pay          | 支付               | 2级      |
| /pay/result   | 支付结果           | 2级      |



**总结：**

- 路由规则约定好之后，可以按照路由去开发对应的页面。