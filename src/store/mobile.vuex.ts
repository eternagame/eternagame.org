/* eslint-disable max-classes-per-file */
import { createModule, action } from 'vuex-class-component';

const VuexModule = createModule({
  strict: false,
});

export default class MobileStore extends VuexModule {
  showPageSidebar: boolean = false;
}
