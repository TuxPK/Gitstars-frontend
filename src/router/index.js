import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach(async (to, from, next) => {
    await Vue.auth.getAuthentication(to.query.code);

    const isAuth = isAuthenticated();

    const path = getToPath(to, isAuth);

    return next({ path });
  });

  return Router;
}

function isAuthenticated() {
  return !!localStorage.getItem('git_token');
}

function getToPath(to, isAuth) {
  let { path } = to.path;

  if (to.matched.some((record) => record.meta.forAuth) && isAuth) path = '/';
  if (to.matched.some((record) => record.meta.forVisitors) && !isAuth) path = '/login';

  return path;
}
