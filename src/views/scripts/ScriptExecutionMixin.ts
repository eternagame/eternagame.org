import {Vue, Component} from "vue-property-decorator";

@Component
export default class ScriptExecutionMixin extends Vue {
  async makeScriptExecutionFrame(executeCode: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <${'script'}>
          // We patch both XMLHttpRequest and fetch so that any network requests to our API that
          // a user script may make will properly have the CSRF token included (we didn't use to
          // require this, so this ensures backward compatibility)
          XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function () {
            this.origOpen.apply(this, arguments);
            if (new URL(arguments[1], window.parent.location.toString()).hostname === '${this.$vxm.user.csrfHostname}') {
              this.setRequestHeader('x-csrf-token', '${this.$vxm.user.csrfToken}');
            }
          };

          let originalFetch = window.fetch;
          window.fetch = function (input, init) {
              if (!init) {
                init = {};
              }
              if (!init.headers) {
                init.headers = new Headers();
              }

            if (new URL(input instanceof Request ? input.url : input, window.parent.location.toString()).hostname === '${this.$vxm.user.csrfHostname}') {
              if (init.headers instanceof Headers) {
                init.headers.append('x-csrf-token', '${this.$vxm.user.csrfToken}');
              } else if (init.headers instanceof Array) {
                init.headers.push(['x-csrf-token', '${this.$vxm.user.csrfToken}']);
              } else {
                init.headers['x-csrf-token'] = '${this.$vxm.user.csrfToken}';
              }
            }

            return originalFetch(input, init);
          };
        </${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/jquery/jquery-1.7.2.min.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/jquery/jquery-unselectable.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/jquery-ui/jquery-ui-1.8.7.custom.min.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/json/json2.js"></${'script'}>

        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/application.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/utils.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/ajaxmanager.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/datamanager.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/usermanager.js"></${'script'}>

        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/eterna-application.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/eterna-utils.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/script-library.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/script-interface.js"></${'script'}>
        <${'script'} src="${process.env.VUE_APP_API_BASE_URL}/eternajs/dist/prod/frontend/jscripts/eterna/presenter.js"></${'script'}>
    </head>
    <body>
        <div id="result"></div>
        <${'script'}>
          DataManager.stash_data({user: {
            uid: ${this.$vxm.user.uid},
            name: ${JSON.stringify(this.$vxm.user.username)},
            rank: ${this.$vxm.user.rank},
            points: ${this.$vxm.user.points}
          }});
          window.Page = {
            is_there_new_notification: function() { return false; },
            count_new_notifications: function() { return '0'; }
          };
          Application.on_initialize();
          ${executeCode}
        </${'script'}>
    </body>
    </html>
    `;
  }
}
