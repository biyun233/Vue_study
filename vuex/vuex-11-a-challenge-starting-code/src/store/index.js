import { createStore } from 'vuex';
import productModule from './modules/product.js';
import cartModule from './modules/cart.js';
const store = createStore({
    modules: {
        prods: productModule,
        cart: cartModule
    },
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.isLoggedIn = payload.isAuth;
    },
  },
  actions: {
    login(context) {
      context.commit('setAuth', { isAuth: true });
    },
    logout(context) {
      context.commit('setAuth', { isAuth: false });
    }
  },
  getters: {
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
  }
});

export default store;
