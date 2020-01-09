import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';
import Vue from 'vue';

const VuexModule = createModule({
  // namespaced: 'userStore',
  strict: false,
});

export default class UserStore extends VuexModule {
  public username: string|null = null;

  public uid: number|null = null;

  public loggedIn = false;

  public triedAuthenticating = false;

  @mutation showLoginFailedModal({ errorMessage }: { errorMessage: String }) {

  }

  @mutation showResetCompleteModal() {

  }

  @action() async login({ username, password }: { username: string, password: string }) {
    const loginParams = {
      name: username, pass: password, type: 'login', workbranch: 'localhost:8080',
    };
    const { data } = (await Vue.$http.post('/login/', new URLSearchParams(loginParams))).data;
    if (data.success) {
      this.loggedIn = true;
    }
    return data;
  }

  /** Authenticates the logged-in player. */
  @action() async authenticate(): Promise<any> {
    this.triedAuthenticating = true;
    const response = await Vue.$http.get('/eterna_authenticate.php');
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
