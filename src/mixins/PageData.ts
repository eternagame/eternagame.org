/* eslint-disable max-classes-per-file */
import { Component, Vue } from 'vue-property-decorator';
import { Route, RouteCallback } from 'vue-router';
import { AxiosInstance } from 'axios';

export default function createPageDataMixin<T>(
  fetchPageData: (route: Route, http: AxiosInstance) => Promise<T>,
) {
  @Component
  class PageDataMixin extends Vue {
    async serverPrefetch() {
      this.$vxm.pageData.data = await fetchPageData(this.$route, this.$http);
    }

    get pageData(): T | null{
      return this.$vxm.pageData.data;
    }

    async beforeRouteEnter(to: Route, from: Route, next: RouteCallback<any>) {
      if (process.env.VUE_APP_ENV === 'client') {
        next(async (vm) => {
          vm.$vxm.pageData.data = await fetchPageData(to, vm.$http);
        });
      } else next();
    }

    async beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<any>) {
      if (process.env.VUE_APP_ENV === 'client' && from.name) {
        this.$vxm.pageData.data = await fetchPageData(to, this.$http);
      }
      next();
    }
  }
  return PageDataMixin;
}
