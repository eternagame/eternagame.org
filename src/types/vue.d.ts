/**
 * Augment the typings of Vue.js
 */

import VueRouter, { Route, RawLocation, RouteCallback } from 'vue-router';
import { AxiosInstance, AxiosStatic } from 'axios';
import { ProxyWatchers } from 'vuex-class-component/dist/interfaces';
import SwiperClass from 'swiper';
import createUserStore from '../store/user.vuex';
import MobileStore from '../store/mobile.vuex';
import FetchData from '../store/FetchData.vuex';

export interface VXM {
  user: ProxyWatchers & InstanceType<ReturnType<typeof createUserStore>>;
  mobile: ProxyWatchers & MobileStore;
  fetchData: ProxyWatchers & FetchData;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    vxm?: VXM;
    http?: AxiosInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    beforeRouteEnter(to: Route, from: Route, next: RouteCallback<any>): any;
    beforeRouteLeave(to: Route, from: Route, next: RouteCallback<any>): any;
    beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<any>): any;
    $http: AxiosStatic;
    $vxm: VXM;
  }
}

declare module 'vue-router' {
  export type RouteCallback<V extends Vue> = (
    to?: RawLocation | false | ((vm: V) => any) | void,
  ) => void;
}

declare module 'vue-awesome-swiper' {
  interface SwiperRef extends Vue {
    $swiper: SwiperClass
  }
}
