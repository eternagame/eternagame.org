import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import { AxiosInstance } from 'axios';
import createUserStore from './user.vuex';
import MobileStore from './mobile.vuex';
import FetchData from './FetchData.vuex';
import PaginationStore from './pagination.vuex';

Vue.use(Vuex);

export default function createStore(axios: AxiosInstance) {
  // const BoundUserStore = UserStore.bound(axios);
  const BoundUserStore = createUserStore(axios);
  const BoundMobileStore = MobileStore;
  const BoundFetchData = FetchData;
  const BoundPaginationStore = PaginationStore;

  const store = new Vuex.Store({
    modules: {
      ...extractVuexModule(BoundUserStore),
      ...extractVuexModule(BoundMobileStore),
      ...extractVuexModule(BoundFetchData),
      ...extractVuexModule(BoundPaginationStore)
    },
  });

  const vxm = {
    user: createProxy(store, BoundUserStore),
    mobile: createProxy(store, BoundMobileStore),
    fetchData: createProxy(store, BoundFetchData),
    pagination: createProxy(store, BoundPaginationStore),
  };

  return {
    store,
    vxm,
  };
}
