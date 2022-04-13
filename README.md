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