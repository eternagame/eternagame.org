import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';

const VuexModule = createModule({
  // namespaced: 'pageData',
  strict: false,
});

export default class PageData extends VuexModule {
  data: any = null;

  refetch: boolean = false;
}
