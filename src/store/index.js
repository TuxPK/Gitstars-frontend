import Vue from 'vue';
import Vuex from 'vuex';

import users from './github/users';
import repositories from './github/repositories';
import tags from './api/tags';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      users,
      repositories,
      tags,
    },
    strict: process.env.DEBUGGING,
  });

  return Store;
}
