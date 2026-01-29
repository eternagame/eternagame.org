import createApp from './app';

declare global {
  interface Window { __INITIAL_STATE__: any; }
}

async function init() {
  const { app, router, store } = await createApp();

  if (window.__INITIAL_STATE__) {
    // Initialize the store state with the data injected from the server
    store.replaceState(window.__INITIAL_STATE__);
  }

  router.onReady(() => {
    app.$mount('#app', true);
  });
}

init();
