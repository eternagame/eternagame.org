<template>
  <NavbarIcon>
    <template #icon>
      <div class="unread"></div>
      <img
        v-if="notificationsCount"
        src="@/assets/navbar/Bell.svg"
        :alt="$t('nav-bar:notifications')"
      />
    </template>
    <template #text>
      {{ $t('nav-bar:notifications') }}
    </template>

    <b-dropdown-item>To be implemented</b-dropdown-item>
    <b-dropdown-item>To be implemented</b-dropdown-item>
    <b-dropdown-item>To be implemented</b-dropdown-item>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import PageDataMixin from '@/mixins/PageData';
  import NavbarIcon from './NavbarIcon.vue';

  const ROUTE = '/get/?type=noti_count_for_user';

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class BellIcon extends Vue {
    private notificationsCount = [];

    mounted() {
      axios.get(ROUTE).then(response => {
        this.notificationsCount = response.data.data.noti_count;
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
