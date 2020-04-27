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

    <b-dropdown-item v-for="item in notifications.slice(0, 4)" :key="item.id">
      <p>{{ item.title }}</p>
    </b-dropdown-item>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import PageDataMixin from '@/mixins/PageData';
  import NavbarIcon from './NavbarIcon.vue';

  const NOTI_COUNT_ROUTE = '/get/?type=noti_count_for_user';

  const NEWS_FEED_ROUTE = '/get/?type=newsfeed&filter=all';

  const NUMBER_NOTIFICATIONS_TO_SHOW = 4;

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class PlayerIcon extends Vue {
    private notificationsCount = [];

    private notifications = [];

    private notificationsToShow = NUMBER_NOTIFICATIONS_TO_SHOW;

    mounted() {
      axios.get(NOTI_COUNT_ROUTE).then(response => {
        this.notificationsCount = response.data.data.noti_count;
      });
      axios.get(NEWS_FEED_ROUTE).then(response => {
        const { blogslist, newsfeeds, notifications } = response.data.data;
        console.log([
          blogslist && blogslist,
          newsfeeds && newsfeeds,
          notifications && notifications,
        ]);
        this.notifications = [
          blogslist && blogslist,
          newsfeeds && newsfeeds,
          notifications && notifications,
        ];
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
