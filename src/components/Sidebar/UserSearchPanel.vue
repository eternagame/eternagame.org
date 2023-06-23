<template>
  <vue-bootstrap-typeahead
    ref="typeahead"
    :placeholder="$t(placeholder || 'activity-feed:add-recipient')"
    v-model="targetName"
    :data="usernames"
    :serializer="user => user.username"
    :key="randomKey"
  >
    <template slot="suggestion" slot-scope="{ data, htmlText }">
      <div class="d-flex align-items-center">
        <img
          v-if="data.userpicture"
          class="rounded-circle"
          :src="`/${data.userpicture}`"
          style="width: 40px; height: 40px;margin-right:10px"
          alt=""
        />
          <span v-dompurify-html="htmlText" style="color: white"></span>
        </div>
      </template>
  </vue-bootstrap-typeahead>
</template>
<script lang="ts">
  import { Component, Ref, Watch, Prop, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
  import debounce from 'lodash.debounce';
  import axios from 'axios';
  import { UserData } from '@/types/common-types';

  @Component({
    components: {
      VueBootstrapTypeahead,
    }
  })
  export default class UserSearchPanel extends Vue {
    targetName = '';

    @Prop() placeholder !: string;

    usernames: {
      username: string,
      uid: string,
      userpicture: string,
    }[] = [];

    updateUserSearch: () => Promise<void> | undefined = async () => {};

    async doUpdateUserSearcj() {
      const res = await axios.get(
        `/get/?type=usernames&size=10${this.targetName ? `&search=${this.targetName}` : ''}`,
      );
      this.usernames = res.data.data.usernames;
      if (this.targetName.trim() === '') {
        this.replaceRoute('');
        return;
      }
      const user = this.usernames[0];
      if (!user) {
        this.replaceRoute('');
        return;
      }
      if (user.uid) {
        this.replaceRoute(user.uid);
        return;
      }
      const uid = await this.lookupUid(user.username);
      this.replaceRoute(uid);
    };

    created() {
      this.updateUserSearch = debounce(this.doUpdateUserSearcj.bind(this), 200);
    }

    async mounted() {
      const {uid} = this.$route.query;
      if (uid) {
        const user = (await axios.get(`/get/?type=user&uid=${uid}`)).data.data?.user as UserData | undefined;
        if (user) {
          this.targetName = user.name;
          this.typeahead.inputValue = user.name;
        }
      }
    }

    @Watch('targetName')
    async getUserNames() {
      await this.updateUserSearch();
    }

    replaceRoute(uid: string) {
      const {uid: oldUid, skip: oldSkip, ...query} = this.$route.query;

      if ((+uid || 0) === (+oldUid || 0)) return;

      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(uid ? {uid} : {})
        },
        params: { keepScroll: 'true' }
      });
    }

    @Ref('typeahead') readonly typeahead!: { inputValue: string };

    async lookupUid(username: string) {
      if (!username) {
        throw new Error(`Could not find username: ${username}`);
      }

      const { usernames } = (
        await axios.get('/get/?type=usernames&filter=exact', {
          params: {
            size: 1,
            search: username,
          },
        })
      ).data.data;

      if (!usernames || usernames.length === 0) {
        throw new Error(`Could not find username: ${username}`);
      }

      const { uid } = usernames[0];
      return uid;
    }

    get randomKey() {
      return Math.random();
    }
  }
</script>
