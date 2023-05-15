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
  export default class UserSearch extends Vue {
    targetName = '';

    @Prop() placeholder !: string;

    usernames = [] as {
      username: string,
      uid: string,
      userpicture: string,
    }[];

    fetchData = debounce(async () => {
      const res = await axios.get(
        `/get/?type=usernames&size=10${this.targetName ? `&search=${this.targetName}` : ''}`,
      );
      this.usernames = res.data.data.usernames;
    }, 200);

    @Watch('targetName', { immediate: true, deep: true })
    async getUserNames() {
      await this.fetchData();
      if (this.targetName.trim() === '') {
        this.$emit('uid', '');
        return;
      }
      const user = this.usernames[0];
      if (user.uid) {
        this.$emit('uid', user.uid);
        return;
      }
      const uid = await this.lookupUid(user.username);
      this.$emit('uid', uid);
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
