<template>
  <EternaPage title="Scripts">
    <ScriptCard v-for="script in pageData" :key="script.title" :script="script" />
    <center>
        <button class="btn" @click="backward">Back</button>
        <button
          class="btn"
          v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
          :key="num"
          v-show="page + num - 6 > 0"
          @click="page += num - 6; getDataForPage(page)">
          <span :class="{ 'current-page': num === 6 }"> {{page + num - 6}} </span>
        </button>
        <button class="btn" @click="forward">Forward</button>
    </center>
  </EternaPage>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import get from 'lodash.get';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { VXM } from '@/types/vue.d';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  import ScriptCard from './ScriptCard.vue';

  const INITIAL_SORT = 'date';
  const INITIAL_SIZE = 10;
  const INITIAL_SKIP = 0;

  const ROUTE = '/get/?type=script';

  async function fetchPageData(route: Route, http: AxiosInstance, vxm: VXM) {
    const getPuzzleType = (challenge: boolean, player: boolean) => {
      if (challenge === player) return 'AllChallengesPuzzle';
      if (player) return 'PlayerPuzzle';
      return 'Challenge';
    };
    const { filters } = route.query;
    const params = {
      need: 'lists',
      rnd: 0.8702460890109205,
      sort: route.query.sort || INITIAL_SORT,
      skip: route.query.skip || INITIAL_SKIP,
      size: route.query.size || INITIAL_SIZE,
    };

    const res = (
      await http.get(ROUTE, {
        params,
      })
    ).data.data;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      ScriptCard
    },
  })

  export default class ScriptsList extends Vue {
    data : {
      [list: number] : {
        title: string;
      }[];
    } = {};

    get pageData() {
      return this.data[this.page];
    }

    created() {
      this.getDataForPage(1);
    }

    page = 1;

    forward() {
      this.page += 1;
      if (!this.data[this.page]) this.getDataForPage(this.page);
    }

    backward() {
      this.page -= 1;
      this.page = Math.max(this.page, 1);
      if (!this.data[this.page]) this.getDataForPage(this.page);
    }

    async getDataForPage(page: number) {
      this.$route.query.skip = `${page * 10 - 10}`;
      fetchPageData(this.$route, this.$http, this.$vxm).then(e => {
        Vue.set(this.data, page, e.lists);
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .page {
    margin-top: 120px;
    padding: 20px;
  }
  .current-page {
    font-weight: bold;
    text-decoration: none;
  }
  button > span:not(.current-page) {
    font-weight: normal;
    text-decoration: underline;
  }
  li {
    list-style-type: none;
  }
</style>