<template>
  <NavbarIcon @shown="shown">
    <template #icon>
      <div class="unread" v-if="notificationsCount > 1"></div>
      <img
        v-if="notificationsCount"
        src="@/assets/navbar/Bell.svg"
        :alt="$t('nav-bar:notifications')"
      />
    </template>
    <template #text>
      {{ $t('nav-bar:notifications') }}
    </template>
    <template>
      <div class="container">
        <h1 class="header">{{ $t('nav-bar:notifications-title') }}</h1>
        <img src="@/assets/navbar/popOut.svg" />
        <div class="border"></div>
        <b-dropdown-item
          v-for="item in notifications.slice(0, 4)"
          :key="item.nid || item.id"
          class="dropdown-item"
        >
          <router-link class="d-flex" :to="`news/${item.nid}`">
            <img
              class="d-none d-sm-block rounded-circle player-image-large"
              :src="item.img"
              alt="player-image"
              v-if="item.img"
              style="margin-right:10px"
            />
            <div v-dompurify-html="item.display || item.title" class="text"></div>
          </router-link>
        </b-dropdown-item>
      </div>
    </template>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import PageDataMixin from '@/mixins/PageData';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import NavbarIcon from './NavbarIcon.vue';

  Vue.use(VueDOMPurifyHTML);

  const NUM_NOTIFICATIONS_ROUTE = '/get/?type=noti_count_for_user';

  const NEWS_FEED_ROUTE = '/get/?type=newsfeed&filter=all';

  const NOTIFICATIONS_READ = '/post/?type=notification_read';

  const USER_ROUTE = '/get/?type=user&uid=';

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

    shown() {
      axios.get(NOTIFICATIONS_READ);
    }

    mounted() {
      axios.get(NUM_NOTIFICATIONS_ROUTE).then(response => {
        this.notificationsCount = response.data.data.noti_count;
      });
      const fetchData = async () => {
        const response = await axios.get(NEWS_FEED_ROUTE);
        const { blogslist, newsfeeds, notifications } = response.data.data;

        const articles = [
          blogslist && blogslist,
          newsfeeds && newsfeeds,
          notifications && notifications,
        ]
          .flat()
          .filter(article => !!article);
        this.notifications = await Promise.all(
          articles.map(async article => {
            if (!article.uid) return article;
            const { user } = (await axios.get(USER_ROUTE + article.uid)).data.data;
            if (!user) return article;
            return {
              ...article,
              name: user.name,
              img: user.picture,
              display: `${user.name} published a news post: <b>${article.title}</b>`,
            };
          }),
        );
      };
      fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .container {
    margin-left: 14.5px;
    width: 299px;
    height: 470.2px;
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

  .dropdown-item {
    padding: 0px;
  }

  .text {
    margin-top: 5px;
    max-width: 300px;
    overflow: auto;
    max-lines: 2;
    overflow-wrap: break-word;
  }
</style>
