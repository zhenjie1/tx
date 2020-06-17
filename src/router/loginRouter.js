export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login'),
    meta: { title: '登录', authority: '' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/login'),
        meta: { title: '登录', authority: '' }
      }
    ]
  }
]
