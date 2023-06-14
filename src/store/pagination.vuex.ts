import VueRouter from 'vue-router';
import { createModule } from 'vuex-class-component';

const VuexModule = createModule({
  strict: false,
});

export enum navigationModes {
  NAVIGATION_PAGES,
  NAVIGATION_SCROLL,
}

export default function createPaginationStore(router: VueRouter) {
  class PaginationStore extends VuexModule {
    private navigationInternal: navigationModes = navigationModes.NAVIGATION_SCROLL;

    get navigation() {
      if (router.currentRoute.query.pages) return navigationModes.NAVIGATION_PAGES;
      return this.navigationInternal;
    }

    set navigation(val: navigationModes) {
      this.navigationInternal = val;
    }

    constructor() {
      super();
      if (localStorage) {
        if (localStorage.pagination_method) {
          this.navigation = JSON.parse(localStorage.pagination_method) === 0 ? navigationModes.NAVIGATION_PAGES : navigationModes.NAVIGATION_SCROLL;
        }
      }
    }
  }

  return PaginationStore;
}
