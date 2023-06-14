import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import BootstrapVue from 'bootstrap-vue';
// @ts-ignore
import VueScrollReveal from 'vue-scroll-reveal'; // Module has no declaration file
import VueDOMPurifyHTML, { MinimalDOMPurifyConfig } from 'vue-dompurify-html';
import DOMPurify from 'dompurify';
import {Swiper as SwiperClass, Pagination, Navigation} from 'swiper';
import axios from 'axios';
// If we get around to re-enabling SSR:
// import Notifications from 'vue-notification/dist/ssr.js'
import Notifications, {NotificationOptions} from 'vue-notification';
import i18n from '@/plugins/i18n';
import InitGlobalComponents from '@/components/global';
import App from './App.vue';
import createRouter from './router';
import createStore from './store/store';

const domPurifyOpts: DOMPurify.Config | MinimalDOMPurifyConfig = {
  ADD_TAGS: ['iframe']
};

Vue.use(BootstrapVue);
Vue.use(VueDOMPurifyHTML, {
  default: domPurifyOpts
});
Vue.use(VueScrollReveal, {
  distance: '10px',
  viewFactor: 1.0,
  duration: 800,
  reset: true
});

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe') {
    const validSrc = (node as HTMLIFrameElement).src.match(/^(https:)?\/\/(www.)?(youtube.com)\/.*$/);
    if (!validSrc) node.remove();
  }
});

SwiperClass.use([Pagination, Navigation]);

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

Vue.use(Notifications);

// The notifications library is vulnerable to XSS if you don't sanitize the content you pass it, as it
// uses v-html directly. This wraps its behavior to sanitize by default
const notify: (options: NotificationOptions | string) => void = Vue.prototype.$notify;
const wrappedNotify = (options: NotificationOptions | string) => {
  if (typeof options === 'string') return notify(DOMPurify.sanitize(options, domPurifyOpts) as string);
  return notify({
    ...options,
    title: options.title ? DOMPurify.sanitize(options.title, domPurifyOpts) as string : undefined,
    text: options.text ? DOMPurify.sanitize(options.text, domPurifyOpts) as string : undefined,
  });
};
Vue.prototype.$notify = wrappedNotify;
Vue.notify = wrappedNotify;

InitGlobalComponents();

Vue.config.productionTip = false;
Vue.config.devtools = true;

export default function createApp() {
  const router = createRouter();

  const http = axios.create({
    withCredentials: true,
  });

  const { store, vxm } = createStore(http, router);

  sync(store, router);

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    // Custom properties
    http,
    vxm,
  });

  return { app, router, store };
}
