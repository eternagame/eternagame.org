<template>
  <div class="d-flex">
    <b-form-checkbox
      class="mt-1 mr-3"
      id="checkbox-1"
      name="checkbox-1"
      @change="toggleFollow"
      v-model="follows"
      >{{ $t('player-view:following') }}
    </b-form-checkbox>

    <b-button
      type="submit"
      style="margin-left:10px; padding: 5px 30px;"
      variant="primary"
      @click="messageUser"
      >{{ $t('player-view:message') }}</b-button
    >
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import axios, { AxiosInstance } from 'axios';
  import { UserData } from '@/types/common-types';
  import SmartLink from '@/components/Common/SmartLink.vue';

  const UNFOLLOW_ROUTE = `/post/?type=expire_follow&follow_type=user&id=`;

  const FOLLOW_ROUTE = `/post/?type=follow&follow_type=user&id=`;

  @Component({ components: { SmartLink } })
  export default class PlayerHeaderTopRow extends Vue {
    @Prop({ required: true }) readonly user!: UserData;

    @Prop({ required: true }) readonly followList!: UserData[];

    private follows: boolean = this.followList
      .map((u: UserData) => u.uid)
      .includes(String(this.$vxm.user.uid));

    toggleFollow() {
      const route = this.follows ? UNFOLLOW_ROUTE : FOLLOW_ROUTE;
      axios.post(route + this.user.uid);
    }

    messageUser() {
      this.$router.push(`/feed?message=${this.user.name}`);
    }
  }
</script>
