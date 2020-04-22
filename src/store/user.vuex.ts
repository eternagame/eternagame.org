/* eslint-disable max-classes-per-file */
import { createModule, mutation, action } from 'vuex-class-component';
import { AxiosInstance } from 'axios';
import { DEFAULT_LANGUAGE } from '@/plugins/i18n';

const VuexModule = createModule({
  strict: false,
});

// export default class UserStore extends VuexModule {
export default function createUserStore($http: AxiosInstance) {
  class UserStore extends VuexModule {
    public username: string | null = null;

    public uid: number | null = null;

    public loggedIn = false;

    public locale = DEFAULT_LANGUAGE;

    public triedAuthenticating = false;

    @mutation showLoginFailedModal({ errorMessage }: { errorMessage: String }) {}

    @mutation showResetCompleteModal() {}

    @action() async login({ username, password }: { username: string; password: string }) {
      const loginParams = {
        name: username,
        pass: password,
        type: 'login',
        workbranch: 'localhost:8080',
      };

      const { data } = (await $http.post('/login/', new URLSearchParams(loginParams))).data;
      if (data.success) {
        this.loggedIn = true;
      }
      return data;
    }

    /** Authenticates the logged-in player. */
    @action() async authenticate(): Promise<any> {
      this.triedAuthenticating = true;
      const response = await $http.get('/eterna_authenticate.php');
      const { data } = response;
      if (data === 'NOT LOGGED IN') {
        this.loggedIn = false;
        this.username = 'Anonymous';
        this.uid = 0;
        return;
      }
      const matches = data.match(/^(.+)\s(\d+)$/);
      if (matches && matches.length === 3) {
        const [match, username, uid] = matches;
        this.username = username;
        this.uid = Number(uid);
        this.loggedIn = true;
      } else {
        throw new Error(`Authentication response malformed: ${data}`);
        // TODO: is throw the right action?
      }
    }
  }

  return UserStore;
}
