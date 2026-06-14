export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        component: './Admin',
      },
    ],
  },
  {
    path: '/user-list',
    icon: 'table',
    name: '用户列表',
    component: './user-list',
  },
  {
    path: '/role-list',
    icon: 'table',
    name: '角色列表',
    component: './role-list',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './exception/404',
    layout: false,
    path: './*',
  },
];
