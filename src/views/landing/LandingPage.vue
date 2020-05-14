<template>
  <PlayerHome :pageData="pageData" v-if="loggedIn" />
  <div class="page" v-else>
    <VideoSection />
    <DocsSection />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import PageDataMixin from '@/mixins/PageData';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import get from 'lodash.get';
  import PlayerHome from './PlayerHome.vue';
  import DocsSection from './components/DocsSection.vue';
  import VideoSection from './components/VideoSection.vue';
  // @ts-ignore

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const me = (await http.get('/get/?type=me')).data.data;
    const roadmap = (await http.get('/get/?type=side_project_roadmap')).data.data;
    const carousel = (await http.get('/get/?type=carousel')).data.data;
    const puzzle = get(await http.get('/get/?type=puzzle_of_the_week'), 'data.data', {});
    const res = { ...me, ...roadmap, ...carousel, ...puzzle };
    return res;
  }

  @Component({
    components: {
      DocsSection,
      VideoSection,
      PlayerHome,
    },
  })
  export default class LandingPage extends Mixins(PageDataMixin(fetchPageData)) {
    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
