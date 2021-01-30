import Vue from 'vue';
import Vuex from 'vuex';
import productModule from './product';

Vue.use(Vuex);

export default new Vuex.Store({
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
    productModule,
  },
});
