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
        path: '/labs',
        name: 'labs-list',
        component: () => import('./views/labs/LabsExplore/LabsExplore.vue'),
      },
      {
        path: '/lab/:id',
        name: 'lab-view',
        component: () => import('./views/labs/LabView/LabView.vue'),
      },
      {
        path: '/quests',
        name: 'quests-list',
        component: () => import('./views/quests/QuestsExplore/QuestsExplore.vue'),
      },
      {
        path: '/quests/:id',
        name: 'quests-view',
        component: () => import('./views/quests/QuestView/QuestView.vue'),
      },
      {
        path: '/quest/create',
        name: 'create-quest',
        component: () => import('./views/quests/CreateQuest/CreateQuest.vue'),
      },
      {
        path: '/puzzles',
        name: 'puzzle-list',
        component: () => import('./views/puzzles/PuzzlesExplore/PuzzlesExplore.vue'),
      },
      {
        path: '/puzzles/:id',
        name: 'puzzle-view',
        component: () => import('./views/puzzles/PuzzleView/PuzzleView.vue'),
      },
      {
        path: '/',
        name: 'landing',
        component: () => import('./views/landing/LandingPage.vue'),
      },
      {
        path: '/experienced',
        name: 'experienced-player-temp',
        component: () => import('./views/home/ExperiencedPlayerHome/ExperiencedPlayerHome.vue'),
      },
      {
        path: '/new',
        name: 'new-player-temp',
        component: () => import('./views/home/NewPlayerHome/NewPlayerHome.vue'),
      },
      {
        path: '/about/terms',
        name: 'terms-and-conditions',
        component: () => import('./views/terms/TermsAndConditions.vue'),
      },
      {
        path: '/about/conduct',
        name: 'code-of-conduct',
        component: () => import('./views/conduct/CodeOfConduct.vue'),
      },
      {
        path: '/news',
        name: 'news-list',
        component: () => import('./views/news/NewsExplore/NewsExplore.vue'),
      },
      {
        path: '/news/:id',
        name: 'news-view',
        component: () => import('./views/news/NewsView/NewsView.vue'),
      },
      {
        path: '/feed',
        name: 'activity-feed',
        component: () => import('./views/feed/ActivityFeed.vue'),
      },
      {
        path: '/player/:uid',
        name: 'player',
        component: () => import('./views/players/PlayerView/PlayerView.vue'),
      },
      {
        path: '/leaderboards',
        name: 'leaderboards',
        component: () => import('./views/players/LeaderBoard/LeaderBoard.vue'),
      },
      {
        path: '/lost',
        name: 'not-found',
        component: () => import('./views/lost/NotFound.vue'),
      },
    ],
  });

  router.beforeEach(async (to: Route, from: Route, next: RouteCallback<any>) => {
    const userStore = router.app.$vxm.user;
    if (!userStore.triedAuthenticating) await userStore.authenticate();
    if (!to.matched.length) {
      next('/lost');
    }
    next();
  });

  return router;
}
