import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const DEFAULT_LANGUAGE = process.env.VUE_APP_I18N_LOCALE || 'en'; // english
export const LANGUAGE_COOKIE_NAME = 'language';

function loadLocaleMessages() {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: VueI18n.LocaleMessages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const messages = loadLocaleMessages();

export const LANGUAGES = Object.getOwnPropertyNames(messages);

const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: DEFAULT_LANGUAGE,
  messages,
});

export default i18n;
