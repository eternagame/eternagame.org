import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';
import axios from 'axios';

axios.defaults.withCredentials = true;

const VuexModule = createModule({
  namespaced: true,
  strict: false,
});

export default class MobileStore extends VuexModule {
  // Subscribed to
  @mutation showPageSidebar() {}
}
