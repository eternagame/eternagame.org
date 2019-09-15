import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule } from 'vuex-class-component';
import UserStore from './user.vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore),
  },
});
