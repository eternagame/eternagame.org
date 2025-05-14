/* eslint-disable max-classes-per-file */
import { createModule, mutation, action } from 'vuex-class-component';
import axios, { AxiosInstance } from 'axios';
import { RefreshAchievement, UserData } from '@/types/common-types';
import Utils from '@/utils/utils';

const VuexModule = createModule({
  strict: false,
});

// export default class UserStore extends VuexModule {
export default function createUserStore($http: AxiosInstance) {
  class UserStore extends VuexModule {
    public username: string | null = null;

    public uid: number | null = null;

    public loggedIn = false;

    public showSidebar = false;

    public hasLabAccess: boolean = false;

    public isAdmin: boolean = false;

    public surveyRecord: string = "";

    public triedAuthenticating = false;

    public userDetailsLoaded = false;

    public newAchievements: RefreshAchievement[] = [];

    public rank: number = 0;

    public points: number = 0;

    @mutation showResetCompleteModal() {}

    @action() async logout() {
      this.loggedIn = false;
      await $http.get('/eterna_logout.php');
      window.localStorage.setItem('loggedIn', 'false');
      this.triedAuthenticating = false;
      // Technically we may want to actually clear the loaded user details... need to think
      // of a cleaner way to handle this
      this.userDetailsLoaded = false;
    }

    @action() async login({ username, password }: { username: string; password: string }) {
      const loginParams = {
        name: username,
        pass: password,
        type: 'login',
        workbranch: 'localhost:8080',
      };

      const { data, new_achievements } = (await $http.post('/login/', new URLSearchParams(loginParams))).data;
      if (data.success) {
        this.loggedIn = true;
        window.localStorage.setItem('loggedIn', 'true');
      }
      await this.authenticate();
      this.pushAchievements(new_achievements);
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
        const [, username, uid] = matches;
        this.username = username;
        this.uid = Number(uid);
        this.loggedIn = true;
        // BEFORE YOU ADD THINGS HERE: Beware that they will not be updated when a user navigates
        // within the website. So if the user performs any sort of action (either on this page
        // or another browser page) that invalidates something in my_user, it won't be reflected
        // until a page RELOAD. That is: If you actually want up-to-date information, don't rely
        // on this call. I'm not even sure if we want some of these to be here!
        const userDataResponse = (await axios.get(`/get/?type=my_user&uid=${uid}`)).data.data;
        const userDetails: UserData = userDataResponse.user;
        this.hasLabAccess = Boolean(Number(userDetails.is_lab_member));
        this.isAdmin = userDetails.is_admin;
        this.surveyRecord = userDetails.Survey;
        this.points = +userDetails.points;
        this.rank = userDetails.rank;
        this.userDetailsLoaded = true;
      } else {
        throw new Error(`Authentication response malformed: ${data}`);
        // TODO: is throw the right action?
      }
    }

    @action async refreshAchievements() {
      const res = await $http.post('/post/', new URLSearchParams({ type: 'refresh_achievements'}));
      const {new_achievements} = res.data;
      this.pushAchievements(new_achievements);
    }

    @mutation private pushAchievements(achievements?: Record<string, RefreshAchievement>) {
      if (achievements) this.newAchievements.push(...Object.entries(achievements).map(([, val]) => val));
    }

    private readonly availableFeatureFlags = ['rnet-publishing'] as const;

    get featureFlags() {
      return (process.env.VUE_APP_FEATURE_FLAGS as string | undefined)?.split(',').filter(
        flag => Utils.isArrayMember(flag, this.availableFeatureFlags)
      ) ?? [];
    }
  }

  return UserStore;
}
