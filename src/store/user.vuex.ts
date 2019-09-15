import {
  createModule, mutation, action, extractVuexModule,
} from 'vuex-class-component';
import axios from 'axios';

axios.defaults.withCredentials = true;

const VuexModule = createModule({
  namespaced: true,
  strict: false,
});

export default class UserStore extends VuexModule {
  private username!: string;

  private uid!: number;

  constructor() {
    super();
    this.login();
  }

  @action async login() {
    const loginParams = {
      name: process.env.VUE_APP_USERNAME, pass: process.env.VUE_APP_PASS, type: 'login', workbranch: 'localhost:8080',
    };
    const res = await axios.post('/login/', new URLSearchParams(loginParams));
    this.authenticate();
  }

  /** Authenticates the logged-in player. */
  @action async authenticate(): Promise<any> {
    const response = await axios.get('/eterna_authenticate.php');
    const { data } = response;
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
    } else {
      throw new Error(`Authentication response malformed: ${data}`);
      // TODO: is throw the right action?
    }
  }
}
