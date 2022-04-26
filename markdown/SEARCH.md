<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [搜索模块](#%E6%90%9C%E7%B4%A2%E6%A8%A1%E5%9D%97)
  - [头部搜索跳转](#%E5%A4%B4%E9%83%A8%E6%90%9C%E7%B4%A2%E8%B7%B3%E8%BD%AC)
  - [路由与组件结构](#%E8%B7%AF%E7%94%B1%E4%B8%8E%E7%BB%84%E4%BB%B6%E7%BB%93%E6%9E%84)
  - [排序组件](#%E6%8E%92%E5%BA%8F%E7%BB%84%E4%BB%B6)
  - [分页切换](#%E5%88%86%E9%A1%B5%E5%88%87%E6%8D%A2)
  - [条件改变更新数据](#%E6%9D%A1%E4%BB%B6%E6%94%B9%E5%8F%98%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-04-26 11:37:57
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 11:37:57
 * @FilePath: \shopping-centre-management\markdown\SEARCH.md
 * @Description: 搜索模块
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->

# 搜索模块

## 头部搜索跳转

> 目标：搜索框输入框后回车跳转搜索

大致步骤：

- 双向绑定输入框
- 绑定按键且`enter`事件
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

## 路由与组件结构

> 目的：准备路由规则和组件基础布局

![image](https://gitee.com/zhoushugang/vue3-note/raw/master/images/image-20220321231613106.png)

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

## 排序组件

> 目的：实现排序按钮切换效果

大致步骤：

- 组件布局
- 理解后台参数规则
- 切换效果

具体代码：

- 基础布局

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



## 分页切换

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





## 条件改变更新数据

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
