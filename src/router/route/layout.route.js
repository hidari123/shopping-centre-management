export const Layout = [
  // 一级路由布局容器
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: () => import('@/views/home')
      }
    ]
  }
]
