import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import { createProxy } from 'vuex-class-component';
import App from './App.vue';
import createRouter from './router';
import createStore from './store/store';
import InitGlobalComponents from '@/components/global';
import UserStore from './store/user.vuex';
import MobileStore from './store/mobile.vuex';
import PageData from './store/page-data.vuex';

Vue.use(BootstrapVue);

InitGlobalComponents();

Vue.config.productionTip = false;

export default function createApp() {
  const router = createRouter();
  const store = createStore();

  // Types for properties added to Vue (prototype) are in types/vue.d.ts
  // Make sure to update that if you change what is included here!

  const axiosInstance = axios.create({
    withCredentials: true,
  });
  Vue.$http = axiosInstance;
  Vue.prototype.$http = axiosInstance;

  Vue.prototype.$vxm = {
    user: createProxy(store, UserStore),
    mobile: createProxy(store, MobileStore),
    pageData: createProxy(store, PageData),
  };

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
