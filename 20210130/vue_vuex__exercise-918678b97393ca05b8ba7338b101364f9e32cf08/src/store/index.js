import Vue from 'vue';
import Vuex from 'vuex';

import productModule from './product';
import cartModule from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    myForm: {
      options: '',
    },
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getOriginalForm(context, status) {
      context.commit('MYFORM', status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    MYFORM(state, status) {
      state.myForm = status;
    },
  },
  modules: {
    productModule,
    cartModule,
  },
});
