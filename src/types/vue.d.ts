/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue';
import VueRouter, {
  Route, RawLocation, NavigationGuard, RouteCallback,
} from 'vue-router';

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    beforeRouteEnter(to: Route, from: Route, next: RouteCallback<any>): any;
    beforeRouteLeave(to: Route, from: Route, next: RouteCallback<any>): any;
    beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<any>): any;
  }
}

declare module 'vue-router' {
  export type RouteCallback<V extends Vue> = (
    to?: RawLocation | false | ((vm: V) => any) | void
  ) => void;
}
