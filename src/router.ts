import Vue from 'vue';
import Router from 'vue-router';
import Component from 'vue-class-component';
import Home from './views/Home.vue';

Vue.use(Router);

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
