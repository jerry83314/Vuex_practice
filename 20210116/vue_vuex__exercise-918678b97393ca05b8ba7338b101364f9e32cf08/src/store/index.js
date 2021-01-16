import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import productsModules from './product';

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
    addtoCart(context, { id, qty }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.dispatch('updateLoading', true);
      const item = {
        product_id: id,
        qty,
      };
      context.dispatch('updateLoading', true);
      axios.post(url, { data: item }).then((response) => {
        context.dispatch('updateLoading', false);
        console.log('加入購物車:', response);
        context.dispatch('getCart');
      });
    },
    removeCart(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.dispatch('updateLoading', true);
      axios.delete(url).then((response) => {
        context.dispatch('updateLoading', false);
        context.dispatch('getCart');
        console.log('刪除購物車項目', response);
      });
    },
    getCart(context) {
      context.dispatch('updateLoading', true);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data);
        }
        context.dispatch('updateLoading', false);
        console.log('取得購物車', response.data.data);
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    },
  },
  modules: {
    productsModules,
  },
});
