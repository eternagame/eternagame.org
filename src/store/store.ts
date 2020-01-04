import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule } from 'vuex-class-component';
import UserStore from './user.vuex';
import MobileStore from './mobile.vuex';
import PageData from './page-data.vuex';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    modules: {
      ...extractVuexModule(UserStore),
      ...extractVuexModule(MobileStore),
      ...extractVuexModule(PageData),
    },
  });
}
