<template>
  <div class="d-flex">
    <a
      :href="`${BASE_URL_PREFIX}/certificate/${user.uid}`"
      v-if="isCurrentUser || isPublicCertificate"
    >
      Certificate
    </a>
    <img src="@/assets/dollar.svg" class="icon ml-4" /> {{ user.points }}
    <img src="@/assets/test-tube.svg" class="icon ml-4" /> {{ user.synthesized_count }}
    <img src="@/assets/calendar.svg" class="icon ml-4" /> {{ user.created }}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { UserData } from '@/types/common-types';

  @Component({})
  export default class PlayerHeaderIcons extends Vue {
    @Prop({ required: true }) readonly user!: UserData;

    get isCurrentUser() {
      return this.$vxm.user.uid && this.$vxm.user.uid.toString() === this.user.uid;
    }

    get isPublicCertificate() {
      return this.user['Certificate public'] === 'on';
    }

    private BASE_URL_PREFIX: string = process.env.VUE_APP_API_BASE_URL;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  img {
    margin-right: 6px;
  }
</style>
