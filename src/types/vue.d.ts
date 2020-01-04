/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue';
import VueRouter, {
  Route, RawLocation, NavigationGuard, RouteCallback,
} from 'vue-router';
import { AxiosInstance } from 'axios';
import { ProxyWatchers } from 'vuex-class-component/dist/interfaces';
import UserStore from '../store/user.vuex';
import MobileStore from '../store/mobile.vuex';
import PageData from '../store/page-data.vuex';

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    beforeRouteEnter(to: Route, from: Route, next: RouteCallback<any>): any;
    beforeRouteLeave(to: Route, from: Route, next: RouteCallback<any>): any;
    beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<any>): any;
    $http: AxiosInstance,
    $vxm: {
      user: ProxyWatchers & UserStore,
      mobile: ProxyWatchers & MobileStore,
      pageData: ProxyWatchers & PageData,
    }
  }

  interface VueConstructor {
    $http: AxiosInstance,
    $vxm: {
      user: ProxyWatchers & UserStore,
      mobile: ProxyWatchers & MobileStore,
      pageData: ProxyWatchers & PageData,
    }
  }
}

declare module 'vue-router' {
  export type RouteCallback<V extends Vue> = (
    to?: RawLocation | false | ((vm: V) => any) | void
  ) => void;
}
