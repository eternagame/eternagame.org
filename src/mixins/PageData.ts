/* eslint-disable max-classes-per-file */
import { Component, Vue } from 'vue-property-decorator';
import { Route, RouteCallback } from 'vue-router';

/**
 * Abstraction for handling fetching data for a page while allowing it to be cached
 * if provided by SSR
 *
 * Here be abstract class mixin hackery
 * https://github.com/vuejs/vue-class-component/issues/91#issuecomment-451422547
 */
// @ts-ignore
@Component
abstract class PageDataMixinAbstract extends Vue {
  abstract async fetchPageData(): Promise<any>;

  private async fetchPageDataInternal() {
    this.$vxm.pageData.data = await this.fetchPageData();
  }

  async serverPrefetch() {
    await this.fetchPageDataInternal();
  }

  mounted() {
    if (this.$vxm.pageData.refetch || this.$vxm.pageData.data == null) {
      this.fetchPageDataInternal();
    }
  }

  get pageData(): any {
    return this.$vxm.pageData.data;
  }

  /**
   * After the server initially renders the page the first time, we don't want to continue using
   * the old data, otherwise we'll be serving pages with stale data.
   */
  invalidateCache() {
    this.$vxm.pageData.refetch = true;
  }

  beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<any>) {
    this.invalidateCache();
    next();
  }

  beforeRouteLeave(to: Route, from: Route, next: RouteCallback<any>) {
    this.invalidateCache();
    next();
  }
}

@Component
// @ts-ignore
export default class PageDataMixin extends PageDataMixinAbstract { }
