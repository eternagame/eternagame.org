import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';
import axios from 'axios';

axios.defaults.withCredentials = true;

const VuexModule = createModule({
  // namespaced: 'userStore',
  strict: false,
});

export default class UserStore extends VuexModule {
  private username!: string;

  private uid!: number;

  public loggedIn = false;

  // constructor() {
  //   if(document.cookie)
  // }

  @mutation showLoginFailedModal() {

  }

  @mutation showResetCompleteModal() {

  }

  @mutation test() {
    console.log('test123');
  }

  @action() async login({ username, password }: { username: string, password: string }) {
    const loginParams = {
      name: username, pass: password, type: 'login', workbranch: 'localhost:8080',
    };
    const { data } = (await axios.post('/login/', new URLSearchParams(loginParams))).data;
    if (data.success) {
      this.loggedIn = true;
    } else {
      console.log('login failed');
    }
    return data;

    // this.authenticate();
  }

  /** Authenticates the logged-in player. */
  @action() async authenticate(): Promise<any> {
    const response = await axios.get('/eterna_authenticate.php');
    const { data } = response;
    console.log({ data });
    if (data === 'NOT LOGGED IN') {
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
