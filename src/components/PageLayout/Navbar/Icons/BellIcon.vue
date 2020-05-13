<template>
  <NavbarIcon @shown="shown">
    <template #icon>
      <div class="unread" v-if="notificationsCount > 1"></div>
      <img class="icon mr-1" src="@/assets/navbar/Bell.svg" />
    </template>
    <template #text>
      {{ $t('nav-bar:notifications') }}
    </template>
    <template v-slot="slotProp">
      <div class="activity-container">
        <div class="d-flex justify-content-between">
          <h1 class="header">{{ $t('nav-bar:notifications-title') }}</h1>
          <router-link to="/feed">
            <img
              class="mt-2"
              src="@/assets/navbar/popOut.svg"
              @click="slotProp.hideDropdown.hide()"
            />
          </router-link>
        </div>
        <div class="border"></div>
        <b-dropdown-item
          v-for="item in notifications"
          :key="item.nid || item.id"
          style="padding-left:0px;margin-left:0px"
          :to="`/news/${item.nid || item.id}`"
        >
          <div class="d-flex">
            <img
              class="d-none d-sm-block rounded-circle player-image-large"
              :src="'/' + item.img"
              v-if="item.img"
              style="margin-right:10px"
            />
            <div v-dompurify-html="item.display || item.title" class="description"></div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item v-if="notifications.length == 0">
          {{ $t('activity-feed:empty') }}
        </b-dropdown-item>
      </div>
    </template>
  </NavbarIcon>
</template>
<script lang="ts">
  // @ts-ignore
  import get from 'lodash.get';
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import PageDataMixin from '@/mixins/PageData';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import { NewsItem } from '@/types/common-types';
  import NavbarIcon from './NavbarIcon.vue';

  Vue.use(VueDOMPurifyHTML);

  const NUM_NOTIFICATIONS_ROUTE = '/get/?type=noti_count_for_user';

  const NEWS_FEED_ROUTE = '/get/?type=newsfeed&filter=all';

  const NOTIFICATIONS_READ = '/post/?type=notification_read';

  const USER_ROUTE = '/get/?type=user&uid=';

  const NUMBER_NOTIFICATIONS_TO_SHOW = 5;

  @Component({
    components: {
      NavbarIcon,
    },
  })
  export default class BellIcon extends Vue {
    private notificationsCount = [];

    private notifications: Array<NewsItem> = [];

    private notificationsToShow = NUMBER_NOTIFICATIONS_TO_SHOW;

    shown() {
      axios.post(NOTIFICATIONS_READ);
    }

    mounted() {
      axios.get(NUM_NOTIFICATIONS_ROUTE).then(response => {
        this.notificationsCount = response.data.data.noti_count;
      });
      this.fetchData();
    }

    async fetchData() {
      // Note: newsfeed endpoint requires credentials
      const response = await axios.get(NEWS_FEED_ROUTE, { withCredentials: true });
      const { blogslist, newsfeeds, notifications } = response.data.data;

      const articles = [
        blogslist && blogslist,
        newsfeeds && newsfeeds,
        notifications && notifications,
      ]
        .flat()
        .filter(article => !!article) as Array<NewsItem>;

      // First, just fill in with existing articles to have something to show.
      this.notifications = articles.slice(0, NUMBER_NOTIFICATIONS_TO_SHOW);

      // Then make a second request for the individual author profiles.
      this.notifications = (await Promise.all(
        this.notifications.map(this.fillAuthorProfile),
      )) as Array<NewsItem>;
    }

    async fillAuthorProfile(article: NewsItem) {
      const { user } = (await axios.get(USER_ROUTE + article.uid)).data.data;

      return user
        ? {
            ...article,
            name: user.name,
            img: user.picture,
            display: `${get(user, 'name')} published a news post: <b>${article.title}</b>`,
          }
        : article;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .icon {
    margin-left: -0.2rem;
  }

  ::v-deep img {
    width: 20px;
    height: 20px;
  }

  ::v-deep a {
    padding-right: 10px !important;
    padding-left: 10px !important;
    border-radius: 3px;
  }

  .activity-container {
    padding: 4%;
    width: 300px;
    max-width: 100%;
  }

  .header {
    font-size: 16px;
    font-weight: bold;
    margin-top: 14.5px;
  }

  .border {
    border: 1px solid red;
    width: 100%;
  }

  .description {
    margin-top: 5px;
    font-weight: normal;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    text-transform: none;
  }
</style>
