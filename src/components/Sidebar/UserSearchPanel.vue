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

    fetchData: () => Promise<void> | undefined = async () => {};

    async doFetchData() {
      const res = await axios.get(
        `/get/?type=usernames&size=10${this.targetName ? `&search=${this.targetName}` : ''}`,
      );
      this.usernames = res.data.data.usernames;
    };

    created() {
      this.fetchData = debounce(this.doFetchData, 200);
    }

    @Watch('targetName', { immediate: true, deep: true })
    async getUserNames() {
      await this.fetchData();
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
    }

    replaceRoute(uid: string) {
      const {uid: oldUid, skip: oldSkip, ...query} = this.$route.query;

      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(uid ? {uid} : {})
        },
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