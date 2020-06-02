import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import { AxiosInstance } from 'axios';
import createUserStore from './user.vuex';
import MobileStore from './mobile.vuex';
import PageData from './page-data.vuex';

Vue.use(Vuex);

export default function createStore(axios: AxiosInstance) {
  // const BoundUserStore = UserStore.bound(axios);
  const BoundUserStore = createUserStore(axios);
  const BoundMobileStore = MobileStore;
  const BoundPageData = PageData;

  const store = new Vuex.Store({
    modules: {
      ...extractVuexModule(BoundUserStore),
      ...extractVuexModule(BoundMobileStore),
      ...extractVuexModule(BoundPageData),
    },
  });

  const vxm = {
    user: createProxy(store, BoundUserStore),
    mobile: createProxy(store, BoundMobileStore),
    pageData: createProxy(store, BoundPageData),
  };

  return {
    store,
    vxm,
  };
}
