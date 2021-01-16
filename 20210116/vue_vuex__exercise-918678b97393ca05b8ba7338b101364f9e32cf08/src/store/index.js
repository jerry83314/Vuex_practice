import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    products: [],
    categories: [],
    cart: {
      carts: [],
    },
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.dispatch('updateLoading', true);
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        console.log('取得產品列表:', response);
        context.commit('CATEGORIES', response.data.products);
        context.dispatch('updateLoading', false);
      });
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
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    categories(state) {
      return state.categories;
    },
    cart(state) {
      return state.cart;
    },
  },
});
