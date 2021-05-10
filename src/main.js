import Vue from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost/';
axios.interceptors.response.use((res) => res, (e) => {
  const { response: { status } } = e;

  if (status === 419 || status === 401) {
    router.replace('/');
    store.dispatch('removeUser');
    localStorage.removeItem('user');
  }

  return Promise.reject(e);
});

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  vuetify,
  render(h) { return h(App); },
}).$mount('#app');
