import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';

const VuexModule = createModule({
  strict: false,
});

export default class PageData extends VuexModule {
  data: any = null;
}
