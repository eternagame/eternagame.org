/* eslint-disable max-classes-per-file */
import { Component, Vue } from 'vue-property-decorator';
import { Route, RouteCallback } from 'vue-router';

export default function createPageDataMixin<T>(fetchPageData: (route: Route) => Promise<T>) {
  @Component
  class PageDataMixin extends Vue {
    async serverPrefetch() {
      this.$vxm.pageData.data = await fetchPageData(this.$route);
    }

    get pageData(): T | null{
      return this.$vxm.pageData.data;
    }

    static async navigationGuard(to: Route, from: Route, next: RouteCallback<any>) {
      if (process.env.VUE_APP_ENV === 'client' && from.name) {
        const data = await fetchPageData(to);
        next((vm) => {
          vm.$vxm.pageData.data = data;
        });
      } else {
        debugger;
        next();
      }
    }

    async beforeRouteEnter(to: Route, from: Route, next: RouteCallback<any>) {
      PageDataMixin.navigationGuard(to, from, next);
    }

    async beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<any>) {
      PageDataMixin.navigationGuard(to, from, next);
    }
  }
  return PageDataMixin;
}
