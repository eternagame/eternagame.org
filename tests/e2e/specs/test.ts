// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
import { NightwatchBrowser } from 'nightwatch';

module.exports = {
  'default e2e tests': (browser: NightwatchBrowser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL as string)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js + TypeScript App')
      // .assert.elementCount('img', 1)
      .end();
  },
};
