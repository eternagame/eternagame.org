import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import { AxiosInstance } from 'axios';
import VueRouter from 'vue-router';
import createUserStore from './user.vuex';
import createMobilStore from './mobile.vuex';
import createFetchDataStore from './FetchData.vuex';
import createPaginationStore from './pagination.vuex';
import createNotificationStore from './Notifications.vuex';

Vue.use(Vuex);

export default function createStore(axios: AxiosInstance, router: VueRouter) {
  const BoundUserStore = createUserStore(axios);
  const BoundPaginationStore = createPaginationStore(router);
  const BoundMobileStore = createMobilStore();
  const BoundFetchDataStore = createFetchDataStore();
  const BoundNotificationsStore = createNotificationStore(axios);

  const store = new Vuex.Store({
    modules: {
      ...extractVuexModule(BoundUserStore),
      ...extractVuexModule(BoundMobileStore),
      ...extractVuexModule(BoundPaginationStore),
      ...extractVuexModule(BoundFetchDataStore),
      ...extractVuexModule(BoundNotificationsStore),
    },
  });

  const vxm = {
    user: createProxy(store, BoundUserStore),
    mobile: createProxy(store, BoundMobileStore),
    pagination: createProxy(store, BoundPaginationStore),
    fetchData: createProxy(store, BoundFetchDataStore),
    notifications: createProxy(store, BoundNotificationsStore)
  };

  return {
    store,
    vxm,
  };
}
