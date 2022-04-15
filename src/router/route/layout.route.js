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
      {
        // 顶级菜单
        path: 'category/:id',
        name: 'TopCategory',
        component: () => import('@/views/category')
      },
      {
        // 二级菜单
        path: '/category/sub/:id',
        name: 'SubCategory',
        component: () => import('@/views/category/sub')
      }
    ]
  }
]
