import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

import productsModules from './products';
import cartsModules from './carts';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: true,
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  modules: {
    productsModules,
    cartsModules,
  },
});
