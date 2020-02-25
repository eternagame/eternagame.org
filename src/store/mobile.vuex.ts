/* eslint-disable max-classes-per-file */
import { createModule, mutation } from 'vuex-class-component';
import { AxiosInstance } from 'axios';

const VuexModule = createModule({
  strict: false,
});

export default class MobileStore extends VuexModule {
  constructor(public $http: AxiosInstance) {
    super();
  }

  static bound(axios: AxiosInstance) {
    class BoundMobileStore extends MobileStore {
      constructor() { super(axios); }
    }

    BoundMobileStore.prototype = MobileStore.prototype;
    return BoundMobileStore;
  }

  // Subscribed to
  @mutation showPageSidebar() {}
}
