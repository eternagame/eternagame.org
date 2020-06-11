import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import { AxiosInstance } from 'axios';
import createUserStore from './user.vuex';
import MobileStore from './mobile.vuex';
import FetchData from './FetchData.vuex';

Vue.use(Vuex);

export default function createStore(axios: AxiosInstance) {
  // const BoundUserStore = UserStore.bound(axios);
  const BoundUserStore = createUserStore(axios);
  const BoundMobileStore = MobileStore;
  const BoundFetchData = FetchData;

  const store = new Vuex.Store({
    modules: {
      ...extractVuexModule(BoundUserStore),
      ...extractVuexModule(BoundMobileStore),
      ...extractVuexModule(BoundFetchData),
    },
  });

  const vxm = {
    user: createProxy(store, BoundUserStore),
    mobile: createProxy(store, BoundMobileStore),
    fetchData: createProxy(store, BoundFetchData),
  };

  return {
    store,
    vxm,
  };
}
