/* eslint-disable max-classes-per-file */
import { createModule, mutation } from 'vuex-class-component';
import { AxiosInstance } from 'axios';

const VuexModule = createModule({
  strict: false,
});

export default class MobileStore extends VuexModule {
  // Subscribed to
  @mutation showPageSidebar() {}
}
