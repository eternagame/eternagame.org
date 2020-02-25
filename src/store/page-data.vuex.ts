/* eslint-disable max-classes-per-file */
import { createModule } from 'vuex-class-component';
import { AxiosInstance } from 'axios';

const VuexModule = createModule({
  strict: false,
});

export default class PageData extends VuexModule {
  constructor(public $http: AxiosInstance) {
    super();
  }

  static bound(axios: AxiosInstance) {
    class BoundPageData extends PageData {
      constructor() { super(axios); }
    }

    BoundPageData.prototype = PageData.prototype;
    return BoundPageData;
  }

  data: any = null;
}
