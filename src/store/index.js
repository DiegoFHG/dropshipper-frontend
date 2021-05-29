import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
  },
  getters: {
    getUser: ({ user }) => user,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
    removeUser({ commit }) {
      commit('setUser', undefined);
    },
  },
  modules: {
    seller: {
      namespaced: true,
      state: {
        products: [],
      },
      getters: {
        products: ({ products }) => products,
      },
      mutations: {
        setProducts(state, payload) {
          state.products = payload;
        },
        addProduct(state, payload) {
          state.products.push(payload);
        },
        removeProduct(state, payload) {
          state.products = state.products.filter((product) => product.id !== payload);
        },
        editProduct(state, payload) {
          state.products = state.products.map((product) => {
            if (product.id === payload.id) return payload;
            return product;
          });
        },
      },
      actions: {
        setProducts({ commit }, payload) {
          commit('setProducts', payload);
        },
        addProduct({ commit }, payload) {
          commit('addProduct', payload);
        },
        removeProduct({ commit }, payload) {
          commit('removeProduct', payload);
        },
        editProduct({ commit }, payload) {
          commit('editProduct', payload);
        },
      },
    },
  },
});
