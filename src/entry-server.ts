import i18n, { LANGUAGE_KEY_NAME, DEFAULT_LANGUAGE } from '@/plugins/i18n';
import createApp from './app';

export default async function (context: any) {
  context.BASE_URL = process.env.BASE_URL;

  const { app, router, store } = createApp();
  app.$http.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
  if (context.cookies) {
    app.$http.defaults.headers.common.Cookie = context.cookies;
    i18n.locale = window.localStorage.getItem(LANGUAGE_KEY_NAME) || DEFAULT_LANGUAGE;
  }

  // Set server-side router's location
  router.push(context.url);

  // Wait until router has resolved possible async components and hooks
  await new Promise((resolve, reject) => router.onReady(resolve, reject));

  const matchedComponents = router.getMatchedComponents();
  // no matched routes, reject with 404
  if (!matchedComponents.length) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 404 };
  }

  context.rendered = () => {
    context.state = store.state;
  };

  return app;
}
