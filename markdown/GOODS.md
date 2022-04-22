<!--
 * @Author: hidari
 * @Date: 2022-04-22 09:47:54
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-22 10:45:36
 * @FilePath: \shopping-centre-management\markdown\GOODS.md
 * @Description: 
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->
# 商品详情

## 基础布局

> 目的：完成商品详情基础布局，路由配置，搭好页面架子。
![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1610616714960.da2933e1.png)

大致步骤：

- 准备组件结构容器
- 提取商品推荐组件且使用
- 配置路由和组件



落地代码：

- 组件基础 `views/goods/index.vue`

```vue
<template>
  <div class='xtx-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/">手机</XtxBreadItem>
        <XtxBreadItem to="/">华为</XtxBreadItem>
        <XtxBreadItem to="/">p30</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
export default {
  name: 'XtxGoodsPage',
  components: { , GoodsRelevant }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
```

- 商品推荐组件：`src/views/goods/components/goods-relevant.vue`

```vue
<template>
  <div class='goods-relevant'></div>
</template>

<script>
export default {
  name: 'GoodsRelevant'
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
}
</style>
```

- 路由规则 `router/index.js`

```js
const Goods = () => import("@/views/goods/index");
```

```diff
    children: [
      { path: "/", component: Home },
      { path: "/category/:id", component: Category },
      { path: "/search", component: Search },
+      { path: "/product/:id", component: Goods },
    ],
```

## 渲染面包屑

> 目的：获取数据，渲染面包屑。

大致步骤：

- 定义获取商品详情API函数
- 在组件setup中获取商品详情数据
- 定义一个useXxx函数处理数据


落地代码：

- API函数 `src/api/product.js`

```js
import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const reqFindGoods = (id) => {
  return request('/goods', 'get', { id })
}

```

- useGoods函数 `src/views/goods/index.vue` 在setup中使用

`views/goods/index.vue`

```js
import { nextTick, onMounted, ref } from 'vue'
import { reqFindGoods } from '@/api/product.js'
import GoodsRelevant from './components/goods-relevant'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
export default {
  name: 'Goods',
  components: { GoodsRelevant },
  setup () {
    // 1. 获取商品详情，进行渲染
    const { goods, loading } = useGoods()
    return {
      goods,
      loading
    }
  }
}

// 获取商品详情
const useGoods = () => {
  const goods = ref(null)
  // 默认就是没有数据，加载中
  const loading = ref(true)
  const loadData = async (id) => {
    loading.value = true
    const { result } = await reqFindGoods(id)
    // 让商品数据为 null 使用 v-if 的组件 可以重新销毁和创建
    goods.value = null
    // 页面渲染完毕后执行
    nextTick(() => {
      goods.value = result
    })
    loading.value = false
  }
  const route = useRoute()
  onMounted(() => {
    loadData(route.params.id)
  })

  // 可能出现路由地址商品 ID 发生变化 但是不会重新初始化组件
  onBeforeRouteUpdate(async (to, from, next) => {
    if (`/product/${to.params.id}` === to.path) {
      loadData(to.params.id)
      next()
    }
  })
  return { goods, loading }
}
```

- 防止报错，加载完成goods再显示所有内容，否则loading

```html
  <div class='xtx-goods-page'>
    <div class="container" v-if="loading">
      <div class="loading"></div>
    </div>
    <div class="container" v-else>
        
    </div>
```

- 面包屑渲染

```vue
<template>
    <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem >{{goods.name}}</XtxBreadItem>
    </XtxBread>
</template>
```

## 图片预览组件

> 目的：完成商品图片预览功能和切换

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1610540938844.a033acfb.png)


大致步骤：

- 首先准备商品信息区块左右两侧的布局盒子
- 在定义一个商品图片组件，用来实现图片预览
    - 首先组件布局，渲染
    - 实现切换图片

落地代码：

- 商品信息区块，布局盒子 `src/views/goods/index.vue`

```html
<!-- 商品信息 -->
<div class="goods-info">
    <div class="media"></div>
    <div class="spec"></div>
</div>
```

```less
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
```

- 商品图片组件，渲染和切换

```vue
<template>
  <div class="goods-image">
    <div class="middle">
      <img :src="images[currIndex]" alt="">
    </div>
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 当前预览图的索引
    const currIndex = ref(0)
    return { currIndex }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
```

## 图片放大镜

> 目的：实现图片放大镜功能

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1610540980190.5138fd32.png)

大致步骤：

- 首先准备大图容器和遮罩容器
- 然后使用`@vueuse/core`的`useMouseInElement`方法获取基于元素的偏移量
- 计算出 遮罩容器定位与大容器北京定位 暴露出数据给模板使用

落地代码：`src/views/goods/components/goods-image.vue`

- 准备大图容器

```diff
  <div class='goods-image'>
+    <div class="large" :style="[{backgroundImage:`url(${images[currIndex]})`}]"></div>
    <div class="middle">
```

```diff
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
+  z-index: 500;
+  .large {
+    position: absolute;
+    top: 0;
+    left: 412px;
+    width: 400px;
+    height: 400px;
+    box-shadow: 0 0 10px rgba(0,0,0,0.1);
+    background-repeat: no-repeat;
+    background-size: 800px 800px;
+    background-color: #f8f8f8;
+  }
```

- 准备待移动的遮罩容器

```diff
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
+      <div class="layer"></div>
    </div>
```

```diff
  .middle {
    width: 400px;
    height: 400px;
+    position: relative;
+    cursor: move;
+    .layer {
+      width: 200px;
+      height: 200px;
+      background: rgba(0,0,0,.2);
+      left: 0;
+      top: 0;
+      position: absolute;
+    }
  }
```

- 使用vueuse提供的API获取鼠标偏移量

```js
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
```

```js
// 使用 useMouseInElement 得到基于元素左上角的坐标和是否进入 / 离开元素数据
const usePreviewImg = () => {
  // 是否显示遮罩和大图
  const show = ref(false)

  // 设置遮罩层图标（样式）
  const layerPosition = reactive({
    left: 0,
    top: 0
  })

  // 大图的背景定位
  const largePosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0
  })

  const target = ref(null)
  // elementX 鼠标基于容器左上角X轴偏移
  // elementY 鼠标基于容器左上角Y轴偏移
  // isOutside 鼠标是否在模板容器外
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  // 因为这三个值都是 ref 类型的 可以直接监听
  watch([elementX, elementY, isOutside], () => {
    // 根据数据设置样式数据和是否显示数据
    show.value = !isOutside.value

    // 计算坐标
    const position = { left: 0, top: 0 }
    // 控制X轴方向的定位 0-200 之间
    if (elementX.value < 100) position.left = 0
    else if (elementX.value > 300) position.left = 200
    else position.left = elementX.value - 100

     // 控制Y轴方向的定位 0-200 之间
    if (elementY.value < 100) position.top = 0
    else if (elementY.value > 300) position.top = 200
    else position.top = elementY.value - 100

    // 给样式赋值
    // 设置遮罩容器的定位
    layerPosition.left = position.left + 'px'
    layerPosition.top = position.top + 'px'
    // 设置大背景的定位
    largePosition.backgroundPositionX = -2 * position.left + 'px'
    largePosition.backgroundPositionY = -2 * position.top + 'px'
  })
  return {
    target,
    layerPosition,
    largePosition,
    show
  }
}
```


- 在setup中返回模板需要数据，并使用它
```js
  setup (props) {
    // 当前预览图的索引
    const currIndex = ref(0)

    const {
      target,
      layerPosition,
      largePosition,
      show
    } = usePreviewImg()
    return {
      currIndex,
      show,
      layerPosition,
      largePosition,
      target
    }
  }
```
```html
<div class="large" v-show="show" :style="[{backgroundImage:`url(${images[currIndex]})`},bgPosition]"></div>
<div class="middle" ref="target">
    <img :src="images[currIndex]" alt="">
    <div class="layer" v-show="show" :style="position"></div>
</div>
```

## 基本信息展示


> 目的：展示商品基本信息

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1610616258166.a90e8235.png)

大致步骤：

- 商品销售属性组件
- 商品名称信息组件

落地代码：

1. 基础布局：
- 红色区域1 `src/views/goods/components/goods-sales.vue`

```vue
<template>
  <ul class="goods-sales">
    <li>
      <p>销量人气</p>
      <p>200+</p>
      <p><i class="iconfont icon-task-filling"></i>销量人气</p>
    </li>
    <li>
      <p>商品评价</p>
      <p>400+</p>
      <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
    </li>
    <li>
      <p>收藏人气</p>
      <p>600+</p>
      <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
    </li>
    <li>
      <p>品牌信息</p>
      <p>苏宁电器</p>
      <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GoodsSales'
}
</script>

<style scoped lang='less'>
.goods-sales {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: "";
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
```

- 红色区域2 `src/views/goods/components/goods-name.vue`

```vue
<template>
  <p class="g-name">2件装 粉釉花瓣心意点缀 点心盘*2 碟子盘子</p>
  <p class="g-desc">花瓣造型干净简约 多功能使用堆叠方便</p>
  <p class="g-price">
    <span>108.00</span>
    <span>199.00</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至 </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'GoodName'
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
```

2. 使用组件 `src/views/goods/index.vue`

```js
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
```
```js
components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName },
```
```diff
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
+          <GoodsSales />
        </div>
        <div class="spec">
+          <GoodsName :goods="goods"/>
        </div>
      </div>
```

3. 渲染数据 `src/views/goods/components/goods-name.vue`

```html
  <p class="g-name">{{goods.name}}</p>
  <p class="g-desc">{{goods.desc}}</p>
  <p class="g-price">
    <span>{{goods.price}}</span>
    <span>{{goods.oldPrice}}</span>
  </p>
```


## 城市组件

### 基础布局

> 目的：完成城市组件的基础布局和基本显示隐藏切换效果。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1613812180451.cdb4fa93.png)

大致步骤：

- 准备基本组件结构
- 完成切换显示隐藏
- 完成点击外部隐藏

落地代码：

`src/components/library/xtx-city.vue`

- 结构

```vue
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
    </div>
  </div>
</template>
```

- 逻辑

```vue
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'XtxCity',
  setup () {
    // 显示隐藏数据
    // 控制展开收起,默认收起
    const visible = ref(false)

    // 提供打开和关闭的行为方法
    const open = () => {
      visible.value = true
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
    return { visible, toggle, target }
  }
}
</script>
```

- 样式

```vue
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
```

### 获取数据

> 目的：组件初始化的时候获取城市数据，进行默认展示。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616897574344.3ac6f5e8.png)

大致步骤：

- 获取数据函数封装且支持缓存。
- 获取数据渲染且加上加载中效果。
- 加上一个`vue-cli`配置，处理图片为`base64`


落地代码：`src/components/library/xtx-city.vue`

- 获取数据的函数

```js
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
```

- open使用函数

```js
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
      return list
    })
```

- 加载中样式

```less
.option {
    // 省略...
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
}
```

- 模板中使用

```diff
    <div class="option" v-if="visible">
+      <div v-if="loading" class="loading"></div>
+      <template v-else>
+        <span class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
+      </template>
    </div>
```

- 注意事项： 需要配置10kb下的图片打包成base64的格式 `vue.config.js`

```js
chainWebpack: config => {
    config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10000 }))
}
```

### 交互逻辑

> 目的：显示省市区文字，让组件能够选择省市区并且反馈给父组件。

大致步骤：

- 明确和后台交互的时候需要产生哪些数据，省code，市code，地区code，它们组合再一起的文字。
- 商品详情的默认地址，如果登录了又地址列表，需要获取默认的地址，设置商品详情的地址。
- 然后默认的地址需要传递给`xtx-city`组件做默认值显示
- 然后 `xtx-city` 组件产生数据的时候，需要给出：省code，市code，地区code，它们组合再一起的文字。

落地代码：

第一步：父组件设置 省市区的code数据，对应的文字数据。
`src/views/goods/components/goods-name.vue`

```js
  setup (props) {
    // 默认情况
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')
    // 有默认地址
    if (props.goods.userAddresses) {
      const defaultAddr = props.goods.userAddresses.find(addr => addr.isDefault === 1)
      if (defaultAddr) {
        provinceCode.value = defaultAddr.provinceCode
        cityCode.value = defaultAddr.cityCode
        countyCode.value = defaultAddr.countyCode
        fullLocation.value = defaultAddr.fullLocation
      }
    }
    return {  fullLocation }
  }
```

```html
<XtxCity :fullLocation="fullLocation" />
```

- 第二步：监听用户点击 省，市 展示 市列表和地区列表。

`src/components/xtx-city.vue`

```diff
    <div class="option" v-show="visible">
+      <span @click="changeItem(item)" class="ellipsis"
```

```js
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
      }
    }
```

- 计算出需要展示列表

```js
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
```

- 打开弹层清空之前的选择

```diff
    const open = () => {
      visible.value = true
      loading.value = true
      // 获取数据
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })
      // 清空选择结果
+      for (const key in changeResult) {
+        changeResult[key] = ''
+      }
    }
```

- 第三步：点击地区的时候，将数据通知给父组件使用，关闭对话框

`src/components/xtx-city.vue`

```diff
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
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
+		changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
+        close()
+        emit('change', changeResult)
+      }
    }
```

`src/views/goods/components/goods-name.vue`

```js
    // 选择城市
    const changeCity = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countyCode.value = result.countyCode
      fullLocation.value = result.fullLocation
    }
    return {  fullLocation, changeCity }
```

```html
<XtxCity @change="changeCity" :fullLocation="fullLocation" />
```


## 规格组件

### SKU&SPU概念

> 目标：理解电商SPU和SKU概念

- 理解SPU和SKU概念
  - SPU = Standard Product Unit （标准产品单位）如：  iphone13    Redmi 1A    iphone13 pro
  - SKU = Stock keeping Unit  (库存量单位)   如： iphone13(64G+金色)  iphone13(64G+银色) 

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1613878134510.549ae532.png)

总结一下：

- spu代表一个商品，拥有很多相同的属性。
- sku代表该商品可选规格的任意组合，他是库存单位的唯一标识。


### 基础结构和样式

> 目标，完成规格组件的基础布局。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1614068663196.a75d5597.png)

大致步骤：

- 准备组件
- 使用组件
- 落地代码：

组件结构 `src/views/goods/components/goods-sku.vue`

```vue
<template>
  <div class="goods-sku">
    <dl>
      <dt>颜色</dt>
      <dd>
        <img class="selected" src="https://yanxuan-item.nosdn.127.net/d77c1f9347d06565a05e606bd4f949e0.png" alt="">
        <img class="disabled" src="https://yanxuan-item.nosdn.127.net/d77c1f9347d06565a05e606bd4f949e0.png" alt="">
      </dd>
    </dl>
    <dl>
      <dt>尺寸</dt>
      <dd>
        <span class="disabled">10英寸</span>
        <span class="selected">20英寸</span>
        <span>30英寸</span>
      </dd>
    </dl>
    <dl>
      <dt>版本</dt>
      <dd>
        <span>美版</span>
        <span>港版</span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'GoodsSku'
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
```

- 使用组件 `src/views/goods/index.vue`

```diff
+import GoodsSku from './components/goods-sku'

  name: 'XtxGoodsPage',
+  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku }
```

```diff
        <div class="spec">
          <!-- 名字区组件 -->
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
+          <GoodsSku />
        </div>
```

总结： 每一个按钮拥有`selected` `disabled` 类名，做 选中 和 禁用 要用。

### 渲染与选中效果

> 目的：根据商品信息渲染规格，完成选中，取消选中效果。

大致步骤：

- 依赖 `goods.specs` 渲染规格
- 绑定按钮点击事件，完成选中和取消选中
- 当前点的是选中，取消即可
- 当前点的未选中，先当前规格按钮全部取消，当前按钮选中。

落地代码：`src/views/goods/components/goods-sku.vue`

```vue
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected}" @click="clickSpecs(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
          <span :class="{selected:val.selected}" @click="clickSpecs(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  setup (props) {
    const clickSpecs = (item, val) => {
      // 1. 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(bv => { bv.selected = false })
        val.selected = true
      }
    }
    return { clickSpecs }
  }
}
</script>
```

### 禁用效果

#### 思路分析

> 目标：大致了解禁用效果的整体思路，

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1613887164658.4b06864e.png)

大致步骤：

- 根据后台返回的skus数据得到有效sku组合
- 根据有效的sku组合得到所有的子集集合
- 根据子集集合组合成一个路径字典，也就是对象。
- 在组件初始化的时候去判断每个规格是否点击
- 在点击规格的时候去判断其他规格是否可点击
- 判断的依据是，拿着说有规格和现在已经选中的规则取搭配，得到可走路径。
    - 如果可走路径在字典中，可点击
    - 如果可走路径不在字典中，禁用

#### 路径字典

> 目的：根据后台skus数据得到可走路径字典对象

- js算法库 https://github.com/trekhleb/javascript-algorithms
- 幂集算法 https://raw.githubusercontent.com/trekhleb/javascript-algorithms/master/src/algorithms/sets/power-set/bwPowerSet.js

- `src/vender/power-set.js`

```js
/**
 * Find power-set of a set using BITWISE approach.
 *
 * @param {*[]} originalSet
 * @return {*[][]}
 */
export default function bwPowerSet(originalSet) {
  const subSets = [];

  // We will have 2^n possible combinations (where n is a length of original set).
  // It is because for every element of original set we will decide whether to include
  // it or not (2 options for each set element).
  const numberOfCombinations = 2 ** originalSet.length;

  // Each number in binary representation in a range from 0 to 2^n does exactly what we need:
  // it shows by its bits (0 or 1) whether to include related element from the set or not.
  // For example, for the set {1, 2, 3} the binary number of 0b010 would mean that we need to
  // include only "2" to the current set.
  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    const subSet = [];

    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      // Decide whether we need to include current element into the subset or not.
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex]);
      }
    }

    // Add current subset to the list of all subsets.
    subSets.push(subSet);
  }

  return subSets;
}
```

`src/views/goods/components/goods-sku.vue`

```js
import powerSet from '@/vender/power-set'
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = (skus) => {
  // 得到所有 sku 集合 props.goods.skus
  // 从所有 sku 中 选出有效 sku
  // 根据有效的 sku 使用 power-set 算法得到子集
  // 根据子集往路径字典对象中存储 key-value
  const pathMap = {}
  skus.forEach(sku => {
    // 1. 过滤出有库存有效的sku
    if (sku.inventory > 0) {
      // 计算当前有库存的 sku 子集
      // 2. 得到sku属性值数组
      const valueArr = sku.specs.map(val => val.valueName)
      // 3. 得到sku属性值数组的子集
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历子集 往 pathMap 中加数据
      // 4. 设置给路径字典对象
      valueArrPowerSet.forEach(arr => {
        // 根据 arr 得到字符串 key 约定 key 是 ['蓝色','35'] => '蓝色★35'
        // 把数组以spliter为分割拼起来
        const key = arr.join(spliter)
        // 给 pathMap 设置数据
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id)
        } else {
          // 没有key设置一个数组
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
```

```diff
+  setup (props) {
+    const pathMap = getPathMap(props.goods.skus)
+    console.log(pathMap)
```

- 参照示例

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616919264380.ea52b946.png)

#### 设置状态

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1617152493736.8d979c3d.png)

> 目的：在组件初始化的时候，点击规格的时候，去更新其他按钮的禁用状态。

大致的步骤：

- 再需要更新状态的时候获取当前选中的规格数组
- 遍历所有的规格按钮，拿出按钮的值设置给规格数组，让后得到key
- 拿着key去路径字典中查找，有就可点击，没有禁用即可。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1620294323632.0947f5cc.png)

`src/views/goods/components/goods-sku.vue`

```js
// 遍历每一行按钮是否被点击，点击的拿到当前选中的值，未点击是undefined，组成数组
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach(item => {
    const selectedValue = item.values.find(val => val.selected)
    arr.push(selectedValue ? selectedValue.name : undefined)
  })
  return arr
}
```

```js
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 约定每个按钮的状态为本身的 disable 数据控制
  specs.forEach((item, i) => {
    // 遍历每一行时拿到当前选中的值的数组
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // 判断当前是否选中，是选中 => 不用判断
      if (val.selected) return
      // 拿当前的值按照顺序套入选中的值数组
      selectedValues[i] = val.name
      // 去除 undefined 数据，按照分隔符拼读key
      const key = selectedValues.filter(value => value).join(spliter)
      // 拿着key去路径字典中查找是否有数据 有可以点击 没有就禁用（true）
      val.disabled = !pathMap[key]
    })
  })
}
```

```diff
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    // 组件初始化的时候更新禁用状态
+    updateDisabledStatus(props.goods.specs, pathMap)
    const clickSpecs = (item, val) => {
      // 如果是禁用状态不作为
+      if (val.disabled) return false
      // 1. 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.find(bv => { bv.selected = false })
        val.selected = true
      }
      // 点击的时候更新禁用状态
+      updateDisabledStatus(props.goods.specs, pathMap)
    }
    return { clickSpecs }
  }
```

#### 数据通讯

> 目的：根据传入的skuId进行默认选中，选择规格后触发change事件传出选择的sku数据。

大致步骤：

- 根据传入的SKUID选中对应规格按钮
- 选择规格后传递sku信息给父组件
- 完整规格，传 skuId 价格 原价 库存 规格文字
- 不完整的，传 空对象

落地代码：

根据传人的sku设置默认选中的规格 `src/views/goods/components/goods-sku.vue`

```js
skuId: {
    type: String,
    default: ''
}
```

```js






### 04-商品详情-商品底部区块

> 目标：展示商品详情，展示每日热榜

大致步骤：

- 底部组件准备和使用
- 渲染组件



落地代码：

- 准备底部组件 `goods/components/goods-footer.vue`

```vue
<template>
  <!-- 商品详情 -->
  <div class="goods-footer">
    <div class="left">
      <div class="goods-detail">
        <div class="head">商品详情</div>
        <div class="content">
          <img
            src="https://yanxuan-item.nosdn.127.net/38e2952b2ad8ce881860e0416b07d6ce.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="goods-hot">
        <h3>每日热榜</h3>
        <GoodsItem v-for="item in 4" :key="item" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsFooter",
};
</script>
<style lang="less" scoped>
.goods-footer {
  display: flex;
  margin-top: 20px;
  .left {
    width: 940px;
    margin-right: 20px;
  }
  .right {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-detail {
  background: #fff;
  .head {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    padding: 0 40px;
    border-bottom: 1px solid #f5f5f5;
  }
  .content {
    padding: 40px;
    img {
      width: 100%;
    }
  }
}
.goods-hot {
  h3 {
    height: 70px;
    background: var(--help-color);
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>

```

`goods/index.vue`

```diff
+      <!-- 商品底部 -->
+      <GoodsFooter :goods="goods" />
    </div>
  </div>
</template>
```

```diff
+import GoodsFooter from "./components/goods-footer.vue";
export default {
  name: "xtx-goods-page",
+  components: { GoodsSales, GoodsInfo, GoodsFooter },
```



- 渲染组件

```vue
<template>
  <!-- 商品详情 -->
  <div class="goods-footer">
    <div class="left">
      <div class="goods-detail">
        <div class="head">商品详情</div>
        <div class="content">
          <img v-for="(img, i) in goods.details.pictures" :src="img" :key="i" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="goods-hot">
        <h3>每日热榜</h3>
        <GoodsItem
          v-for="item in goods.hotByDay"
          :key="item.id"
          :goods="item"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsFooter",
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
```



**总结：**

- 商品的图片一般是分割开，拼在一起