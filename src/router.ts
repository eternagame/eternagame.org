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
        path: '/calendar',
        name: 'calendar',
        component: () => import('./views/calendar/Calendar.vue'),
      },
      {
        path: '/labs',
        name: 'labs-list',
        component: () => import('./views/labs/LabsExplore/LabsExplore.vue'),
      },
      {
        path: '/labs/data-browser',
        name: 'data-browser',
        component: () => import('./views/labs/DataBrowser/DataBrowser.vue'),
      },
      {
        path: '/labs/:id',
        name: 'lab-view',
        component: () => import('./views/labs/LabView/LabView.vue'),
      },
      {
        path: '/challenges/:id',
        name: 'challenge-view',
        component: () => import('./views/challenges/ChallengeView/ChallengeView.vue'),
      },
      {
        path: '/collections',
        name: 'collections-list',
        component: () => import('./views/collections/CollectionsExplore/CollectionsExplore.vue'),
      },
      {
        path: '/collections/create',
        name: 'create-collection',
        component: () => import('./views/collections/CreateCollection/CreateCollection.vue'),
      },
      {
        path: '/collections/:id',
        name: 'view-collection',
        component: () => import('./views/collections/CollectionView/CollectionView.vue'),
      },
      {
        path: '/collections/:id/edit',
        name: 'edit-collection',
        component: () => import('./views/collections/CreateCollection/EditCollection.vue'),
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
        path: '/puzzles/:id/edit',
        name: 'puzzle-edit',
        component: () => import('./views/puzzles/PuzzleEdit/PuzzleEdit.vue'),
      },
      {
        path: '/',
        name: 'home',
        component: () => import('./views/home/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./views/about/About.vue'),
      },
      {
        path: '/epa',
        name: 'epa',
        component: () => import('./views/epa/EPA.vue'),
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('./views/history/History.vue'),
      },
      {
        path: '/help',
        name: 'quick-help',
        component: () => import('./views/help/QuickHelp.vue'),
      },
      {
        path:'/gamerguide',
        name:'gamer-guide',
        component: () => import('./views/help/GamerGuide.vue'),
      },
      {
        path: '/challenges',
        name: 'challenge-list',
        component: () => import('./views/challenges/ChallengeExplore/ChallengeExplore.vue'),
      },
      {
        path: '/software',
        name: 'software',
        component: () => import('./views/software/SoftwareExplore.vue'),
      },
      {
        path: '/groups',
        name: 'groups',
        component: () => import('./views/groups/GroupsExplore/GroupsExplore.vue'),
      },
      {
        path: '/groups/create',
        name: 'group-create',
        component: () => import('./views/groups/GroupEdit/GroupCreate.vue'),
      },
      {
        path: '/groups/:id',
        name: 'group-view',
        component: () => import('./views/groups/GroupView/GroupView.vue'),
      },
      {
        path: '/groups/:id/edit',
        name: 'group-edit',
        component: () => import('./views/groups/GroupEdit/GroupEdit.vue'),
      },
      {
        path: '/terms',
        name: 'terms-and-conditions',
        component: () => import('./views/terms/TermsAndConditions.vue'),
      },
      {
        path: '/conduct',
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
        path: '/publications',
        name: 'publications-list',
        component: () => import('./views/publications/PublicationsExplore.vue'),
      },
      {
        path: '/feed',
        name: 'activity-feed',
        component: () => import('./views/feed/ActivityFeed/ActivityFeed.vue'),
      },
      {
        path: '/players/:uid',
        name: 'player',
        component: () => import('./views/players/PlayerView/PlayerView.vue'),
      },
      {
        path: '/account',
        name: 'edit-profile',
        component: () => import('./views/players/EditProfile/EditProfile.vue'),
      },
      {
        path: '/players',
        name: 'leaderboards',
        component: () => import('./views/players/LeaderBoard/LeaderBoard.vue'),
      },
      {
        path: '/lost',
        name: 'not-found',
        component: () => import('./views/lost/NotFound.vue'),
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('./views/chat/FullPageChat.vue'),
      },
      {
        path: '/eternacon',
        redirect: { name: 'eternacon-2023' }
      },
      {
        path: '/eternacon/2019',
        name: 'eternacon-2019',
        component: () => import('./views/eternacon/Eternacon2019.vue'),
      },
      {
        path: '/eternacon/2020',
        name: 'eternacon-2020',
        component: () => import('./views/eternacon/Eternacon2020.vue'),
      },
      {
        path: '/eternacon/2021',
        name: 'eternacon-2021',
        component: () => import('./views/eternacon/Eternacon2021.vue'),
      },
      {
        path: '/eternacon/2022',
        name: 'eternacon-2022',
        component: () => import('./views/eternacon/Eternacon2022.vue'),
      },
      {
        path: '/eternacon/2023',
        name: 'eternacon-2023',
        component: () => import('./views/eternacon/Eternacon2023.vue'),
      },
      {
        path: '/eternacon/about',
        name: 'about-eternacon',
        component: () => import('./views/eternacon/AboutEternacon.vue'),
      },
      {
        path: '/password-reset',
        name: 'password-reset',
        component: () => import('./views/password-reset/PasswordReset.vue'),
      },
      {
        path: '/unsubscribe',
        name: 'unsubscribe',
        component: () => import('./views/unsubscribe/Unsubscribe.vue'),
      },
      {
        path: '/debug/autosave-manager',
        component: () => import('./views/debug/AutosaveManager.vue'),
      },
      {
        path: '/donate',
        component: () => import('./views/donate/Donate.vue'),
      },
      {
        path: '/partner/nova-labs',
        component: () => import('./views/nova/NovaTransfer.vue'),
      },
      // Maintaining these old routes in case they're actively linked from anywhere
      // important - at some point we should audit if we can remove these, or we may need a
      // dedicated section of legacy routes anyways
      {
        path: '/about/software',
        redirect: '/software'
      },
      {
        path: '/about/terms',
        redirect: '/terms'
      },
      {
        path: '/about/publications',
        redirect: '/publications'
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      // Navigate to previous scroll position, or else top of page
      // https://router.vuejs.org/guide/advanced/scroll-behavior.html
      if (savedPosition) {
        return savedPosition;
      }

      if (to.hash) {
        return { selector: to.hash };
      }

      if(to.params.keepScroll) return null;

      return { x: 0, y: 0 };
    },
  });


  router.beforeEach(async (to: Route, from: Route, next: RouteCallback<any>) => {
    const userStore = router.app.$vxm.user;
    if (window.localStorage.getItem('loggedIn') === 'true' && !userStore.triedAuthenticating) {
      await userStore.authenticate();
    }
    if (!to.matched.length) {
      next('/lost');
    }
    next();
  });

  router.afterEach(() => {
    // @ts-ignore
    gtag('config', 'UA-17383892-2');
  });

  return router;
}
