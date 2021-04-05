import Vue from 'vue';
import Vuex from 'vuex';

import users from './github/users';
import repositories from './github/repositories';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      users,
      repositories,
    },
    strict: process.env.DEBUGGING,
  });

  return Store;
}
