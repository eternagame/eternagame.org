/* eslint-disable max-classes-per-file */
import { createModule, action } from 'vuex-class-component';

const VuexModule = createModule({
  strict: false,
});

export default function createMobilStore() {
  class MobileStore extends VuexModule {
    public showPageSidebar: boolean = false;
  }
  return MobileStore;
}
