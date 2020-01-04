import createApp from './app';

const { app, router, store } = createApp();

declare global {
  interface Window { __INITIAL_STATE__: any; }
}


if (window.__INITIAL_STATE__) {
  // Initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app', true);
});
