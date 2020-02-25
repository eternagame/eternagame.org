import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';
import createRouter from './router';
import createStore from './store/store';
import InitGlobalComponents from '@/components/global';

Vue.use(BootstrapVue);

// Types for properties added to Vue (prototype) are in types/vue.d.ts
// Make sure to update that if you change what is included here!
Vue.use(() => {
  if (!Object.prototype.hasOwnProperty.call(Vue.prototype, '$http')) {
    Object.defineProperty(Vue.prototype, '$http', {
      get() {
        return this.$root.$options.http;
      },
    });
  }

  if (!Object.prototype.hasOwnProperty.call(Vue.prototype, '$vxm')) {
    Object.defineProperty(Vue.prototype, '$vxm', {
      get() {
        return this.$root.$options.vxm;
      },
    });
  }
});

InitGlobalComponents();

Vue.config.productionTip = false;

export default function createApp() {
  const router = createRouter();

  const http = axios.create({
    withCredentials: true,
  });

  const { store, vxm } = createStore(http);

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),

    // Custom properties
    http,
    vxm,
  });

  return { app, router, store };
}
