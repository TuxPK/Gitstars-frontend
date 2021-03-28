const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: 'home', component: () => import('pages/home/index.vue') },
    ],
    meta: { forVisitors: true },
  }, {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { name: 'login', path: '/', component: () => import('pages/login/index.vue') },
    ],
    meta: { forAuth: true },
  }, {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
