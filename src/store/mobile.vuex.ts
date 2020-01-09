import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';

const VuexModule = createModule({
  strict: false,
});

export default class MobileStore extends VuexModule {
  // Subscribed to
  @mutation showPageSidebar() {}
}
