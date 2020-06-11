/* eslint-disable max-classes-per-file */
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Route, RouteCallback } from 'vue-router';
import { isCacheError } from '@/store/FetchData.vuex';

class FetchState {
  key: number | null = null;

  firstFetchComplete: boolean = false;

  pending: boolean = false;

  lastFetched: Date = new Date();

  error: Error | null= null;
}

/**
 * Handles retrieving async page data in an ssr-friendly way
 * Borrowing much from Nuxt (MIT License)
 *   - https://github.com/nuxt/nuxt.js/blob/917adc06184efd55a48123269b659adb288a3341/LICENSE
 *   - https://github.com/nuxt/nuxt.js/blob/917adc06184efd55a48123269b659adb288a3341/packages/vue-app/template/mixins/fetch.server.js
 *   - https://github.com/nuxt/nuxt.js/blob/917adc06184efd55a48123269b659adb288a3341/packages/vue-app/template/mixins/fetch.client.js
 */
@Component
export default class FetchMixin extends Vue {
  fetch?(): Promise<void>;

  fetchState: FetchState = new FetchState();

  async $fetch() {
    if (!this.fetch) return;

    this.fetchState.pending = true;
    this.fetchState.error = null;

    try {
      await this.fetch();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error in fetch():', err);
      }
      this.fetchState.error = err;
    }

    this.fetchState.pending = false;
    this.fetchState.firstFetchComplete = true;
    this.fetchState.lastFetched = new Date();
  }
  
  async serverPrefetch() {
    if (!this.fetch) return;

    await this.$fetch();

    // Define an ssrKey for hydration
    this.fetchState.key = this.$vxm.fetchData.ssrCache.length;

    // Add data-fetch-key on parent element of Component
    if (this.$vnode.data) {
      this.$vnode.data.attrs = this.$vnode.data.attrs || {};
      const attrs = this.$vnode.data?.attrs;
      attrs['data-fetch-key'] = this.fetchState.key;
    }

    this.$vxm.fetchData.ssrCache.push(this.fetchState.error ? {error: this.fetchState.error} : {data: this.$data});
  }

  async mounted() {
    const fetchKey = (this.$vnode.elm as HTMLElement).dataset?.fetchKey;
    if (fetchKey === undefined) {
      await this.$fetch();
      return;
    }

    this.fetchState.key = +fetchKey;
    const cache = this.$vxm.fetchData.ssrCache[this.fetchState.key];
    
    if (isCacheError(cache)) {
      this.fetchState.error = cache.error;
    } else {
      Object.entries(cache.data).forEach(([key, value]) => {
        Vue.set(this.$data, key, value);
      });
    }
  }

  @Watch('$route.path')
  private async fetchForNewPage() {
    // This is actually a completely different page, so don't act like we've loaded it already
    this.fetchState = new FetchState();
    await this.$fetch();
  }

  @Watch('$route.query')
  private async fetchForNewQuery() {
    await this.$fetch();
  }
}
