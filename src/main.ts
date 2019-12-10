import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store/store';
import InitGlobalComponents from '@/components/global';

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

InitGlobalComponents();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
