/* eslint-disable max-classes-per-file */
import { Component, Vue } from 'vue-property-decorator';
import { Route, RouteCallback } from 'vue-router';
import { AxiosInstance } from 'axios';
import { VXM } from '@/types/vue.d';

export default function createPageDataMixin<T>(
  fetchPageData: (route: Route, http: AxiosInstance, vxm: VXM) => Promise<T>,
) {
  @Component
  class PageDataMixin extends Vue {
    async serverPrefetch() {
      this.$vxm.pageData.data = await fetchPageData(this.$route, this.$http, this.$vxm);
    }

    get pageData(): T | null {
      return this.$vxm.pageData.data;
    }

    async beforeRouteEnter(to: Route, from: Route, next: RouteCallback<any>) {
      next(async vm => {
        if (from.name || !vm.$vxm.pageData.data) {
          vm.$vxm.pageData.data = await fetchPageData(to, vm.$http, vm.$vxm);
        }
      });
    }

    async beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<any>) {
      if (from.name) {
        this.$vxm.pageData.data = await fetchPageData(to, this.$http, this.$vxm);
      }
      next();
    }
  }
  return PageDataMixin;
}
