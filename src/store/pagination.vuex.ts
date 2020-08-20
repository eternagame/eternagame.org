import { createModule, mutation } from 'vuex-class-component';

const VuexModule = createModule({
  strict: false,
});

enum navigationModes {
  NAVIGATION_PAGES,
  NAVIGATION_SCROLL,
}

export default class PaginationStore extends VuexModule {
  navigation: navigationModes = navigationModes.NAVIGATION_SCROLL;

  constructor() {
    super();
    if (localStorage) {
      if (localStorage.pagination_method) {
        this.navigation = JSON.parse(localStorage.pagination_method) === 0 ? navigationModes.NAVIGATION_PAGES : navigationModes.NAVIGATION_SCROLL;
      }
    }
  }
}

export { navigationModes};
