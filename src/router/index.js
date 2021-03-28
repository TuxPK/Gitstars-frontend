import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

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
    const GitAuthCode = to.query.code;

    await setGithubToken(GitAuthCode);

    const isAuth = await isAuthenticated();

    const path = getToPath(to, isAuth);

    return next({ path });
  });

  return Router;
}

async function setGithubToken(code) {
  if (!code) return false;

  const githubAuth = await axios.post('api|github-auth/token', { code })
    .then()
    .catch(() => false);

  if (!githubAuth) return false;

  const { token, type } = githubAuth.data;

  return localStorage.setItem('git_token', `${type} ${token}`);
}

async function isAuthenticated() {
  return !!localStorage.getItem('git_token');
}

function getToPath(to, isAuth) {
  let { path } = to.path;

  if (to.matched.some((record) => record.meta.forAuth) && isAuth) path = '/';
  if (to.matched.some((record) => record.meta.forVisitors) && !isAuth) path = '/login';

  return path;
}
