<template>
  <EternaPage :title="`${$t('edit-profile:title')} ${username}`">
    <notifications position="bottom center" width="50%"/>
    <div class="page-content" v-if="username">
      <EditPlayerHeader
        :loading="loading"
        @submit="submit"
        @update:picture="pic => newPicture = pic"
        :picture="picture"
      />
      <hr class="top-border" />
      <EditPlayerAboutMe
        :aboutMe="oldAboutMe"
        @update:aboutMe="text => newAboutMe = text"
        :personalName.sync="personalName"
      />
      <hr class="top-border" />
      <EditPlayerAccountSettings
        :email.sync="email"
        :messagesNotify.sync="messagesNotify"
        :newsNotify.sync="newsNotify"
        :publicCertificate.sync="publicCertificate"
        @update:password="pass => newPassword = pass"
      />
      <hr class="top-border" />
      <EditPlayerDanger />
      <hr class="top-border" />
      <h4 style="font-weight:bold">{{ $t('edit-profile:current-password') }}</h4>
      <input
        style="color:#fff"
        type="password"
        :placeholder="$t('edit-profile:current-password')"
        :aria-label="$t('edit-profile:current-password')"
        v-model="currentPassword"
      />
      <div class="flex" style="margin-top:20px">
        <b-button type="submit" style="margin-left:10px" variant="primary" @click="submit" :disabled="loading">
          {{$t('edit-profile:save')}}
          <b-spinner v-if="loading" small />
        </b-button>
        <b-button
          type="submit"
          style="margin-left:10px"
          variant="outline-secondary"
          :to="`/players/${$vxm.user.uid}`"
        >
          {{ $t('edit-profile:cancel') }}
        </b-button>
      </div>
    </div>
    <Preloader v-else />
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Watch } from 'vue-property-decorator';
  import axios from 'axios';
  import Notifications from 'vue-notification';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { UserData } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';
  import Utils from "@/utils/utils";
  import EditPlayerHeader from './components/EditPlayerHeader.vue';
  import EditPlayerAboutMe from './components/EditPlayerAboutMe.vue';
  import EditPlayerAccountSettings from './components/EditPlayerAccountSettings.vue';
  import EditPlayerDanger from './components/EditPlayerDanger.vue';

  const EDIT_PROFILE = '/login/';

  Vue.use(Notifications);

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      EditPlayerHeader,
      EditPlayerAboutMe,
      EditPlayerAccountSettings,
      EditPlayerDanger,
      Preloader,
    },
  })
  export default class EditProfile extends Mixins(FetchMixin) {
    private username = "";

    private personalName: string = "";

    private oldAboutMe = "";

    private newAboutMe: string | null = null;

    private currentPicture?: string;

    private newPicture: File | null = null;

    private email = "";

    private newPassword?: string;

    private currentPassword = "";

    private messagesNotify = false;

    private newsNotify = false;

    private publicCertificate = false;

    private loading = false;

    async fetch() {
      const user = (await axios.get(`/get/?type=my_user&uid=${this.$vxm.user.uid}`)).data.data.user as UserData;
      this.username = user.name;
      this.personalName = user['Personal Name'];
      this.oldAboutMe = user.Profile;
      this.currentPicture = user.picture;
      this.email = user.mail;
      this.messagesNotify = user['Mail notification'] === 'on';
      this.newsNotify = user['News mail notification'] === 'on';
      this.publicCertificate = user['Certificate public'] === 'on';
    }

    async mounted() {
      // TODO: Handle SSR? We're currently overriding the mounted hook...
      if (!this.$vxm.user.loggedIn) {
        this.$bvModal.show('modal-login');
      }
    }

    @Watch('$vxm.user.userDetailsLoaded')
    loggedIn() {
      if (this.$vxm.user.userDetailsLoaded) {
        // We weren't logged in when we hit the page, so we have to fetch now
        this.$fetch();
      } else {
        // We're logged out, so it doesn't make sense to stay on this page
        this.$router.push('/');
      }
    }

    get picture() {
      if (this.newPicture) {
        return URL.createObjectURL(this.newPicture);
      }
      return Utils.getAvatar(this.currentPicture || null);
    }

    async submit() {
      this.loading = true;
      const data = new FormData();
      if (this.newPassword) {
        data.set('pass[pass1]', this.newPassword);
        data.set('pass[pass2]', this.newPassword);
      }
      data.set('pass[current]', this.currentPassword);
      data.set('profile_mail_notification', this.messagesNotify ? 'on' : 'off');
      data.set('profile_news_mail_notification', this.newsNotify ? 'on' : 'off');
      data.set('profile_blog_mail_notification', this.newsNotify ? 'on' : 'off');
      data.set('profile_certificate_public', this.publicCertificate ? 'on' : 'off');
      data.set('profile_personal_name', this.personalName);
      data.set('profile_profile', this.newAboutMe === null ? this.oldAboutMe : this.newAboutMe);
      data.set('mail', this.email);
      if (this.newPicture) data.append(`files[picture_upload]`, this.newPicture);
      data.set('type', 'edit');

      try {
        const res = await this.$http.post(EDIT_PROFILE, data, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });
        this.loading = false;
        const error = res?.data?.data?.error;
        if (error) throw new Error(error);
        this.$router.push(`/players/${this.$vxm.user.uid}`);
      } catch (e: any) {
        const r = this.$notify({
          type: 'error',
          title: 'Error',
          text: e.message,
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  input {
    background-color: #0a223c;
    border: 0px;
    width: 90%;
    padding: 10px;
    margin-right: 5px;
    margin-top: 5px;
  }
</style>
