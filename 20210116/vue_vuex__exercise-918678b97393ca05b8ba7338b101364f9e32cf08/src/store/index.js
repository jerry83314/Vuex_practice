import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

import productsModules from './products';
import cartModules from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    cart: {
      carts: [],
    },
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
    cartModules,
  },
});
