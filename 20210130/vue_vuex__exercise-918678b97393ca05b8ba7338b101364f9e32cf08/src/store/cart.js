import axios from 'axios';

export default {
  state: {
    cart: {
      carts: [],
    },
  },
  actions: {
    getCart(context) {
      context.commit('LOADING', true, { root: true });
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data);
        }
        context.commit('LOADING', false, { root: true });
        console.log('取得購物車', response.data.data);
      });
    },
    addtoCart(context, { id, qty = 1 }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const item = {
        product_id: id,
        qty,
      };
      context.commit('LOADING', true, { root: true });
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false, { root: true });
        console.log('加入購物車:', response);
        context.dispatch('getCart');
      });
    },
    removeCart(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(url).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('getCart');
        console.log('刪除購物車項目', response);
      });
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    },
  },
};
