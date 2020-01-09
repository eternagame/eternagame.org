import Vue from 'vue';
import Router, { Route, RouteCallback } from 'vue-router';
import Component from 'vue-class-component';

Vue.use(Router);

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

export default function createRouter() {
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('./views/home/front-page/FrontPage.vue'),
      },
      {
        path: '/labs/explore',
        name: 'explore',
        component: () => import('./views/labs/LabsExplore/LabsExplore.vue'),
      },
      {
        path: '/lab/:nid',
        name: 'lab',
        component: () => import('./views/labs/LabView/LabView.vue'),
      },
    ],
  });

  router.beforeEach(async (to: Route, from: Route, next: RouteCallback<any>) => {
    const userStore = router.app.$vxm.user;
    if (!userStore.triedAuthenticating) await userStore.authenticate();
    next();
  });

  return router;
}
