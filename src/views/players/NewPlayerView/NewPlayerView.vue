<template>
  <EternaPage v-if="player" title="">
    <b-container class="video">
      <p style="font-size: 2.8rem; font-weight: bold">
        RNA Virtual Lab
      </p>
      <p style="width: 482px;height: 151px;">
        Nature’s best kept secret is a wonder molecule called RNA. It is central to the origin of
        life, evolution, and the cellular machinery that keeps us alive. In this Virtual Lab you’ll
        play the role of a molecular engineer by solving RNA folding puzzles. Then take your skills
        to the Eterna Lab, where you can design RNAs that could be at the heart of future
        life-saving therapies.
      </p>
      <b-button variant="primary" size="lg" to="/game/puzzle/6502927/">Next Puzzle</b-button>
      <div class="d-flex" style="margin-top:22px;">
        <p style="margin-right:20px;"><i class="arrow_right"></i>Video Library</p>
        <p><i class="arrow_right"></i>Learn more about RNA</p>
      </div>
    </b-container>

    <p style="{  margin:34px 0px; font-size: 2rem; text-align: center; line-height: 1.37}">
      Complete these puzzles to unlock lab access!
    </p>
    <Gallery sm="3" md="3">
      <VideoCard title="The basics" />
      <VideoCard title="Protein Synthesis" />
      <VideoCard title="RNA World" />
      <VideoCard title="Virus Attack" />
    </Gallery>
    <Gallery sm="2" md="2" class="video-wrapper">
      <PuzzleCard nid="G1" />
      <PuzzleCard nid="G2" />
      <PuzzleCard nid="G3" />
      <PuzzleCard nid="G4" />
      <PuzzleCard nid="G5" />
      <PuzzleCard nid="G6" />
    </Gallery>
    <p>Advanced Training</p>
    <h1>Lab Skills 101</h1>
    <Gallery sm="2" md="2">
      <PuzzleCard nid="G1" />
      <PuzzleCard nid="G2" />
      <PuzzleCard nid="G3" />
      <PuzzleCard nid="G4" />
      <PuzzleCard nid="G5" />
      <PuzzleCard nid="G6" />
    </Gallery>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import VideoCard from './VideoCard.vue';
  import PuzzleCard from '../../../components/Cards/PuzzleCard.vue';

  //   import LabViewData, { LabData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    console.log((await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data);
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      VideoCard,
      PuzzleCard,
    },
  })
  export default class NewPlayerView extends Mixins(PageDataMixin(fetchPageData)) {
    get player() {
      return {};
    }

    private picture: string = `${process.env.VUE_APP_API_BASE_URL}/sites/default/files/pictures/picture-133043.png`;

    // private picture: string = 'https://graph.facebook.com/10220887579400634/picture?type=normal';

    private playerName: string = 'Iroppy';

    private playerRank: string = '1';
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .video {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
      url('../../../assets/rna_lab.png');
    background-position: right;
    background-repeat: no-repeat;
    object-fit: contain;
    height: 441px;
    padding: 31px;
  }

  .video-wrapper {
    background-color: $dark;
    padding-top: 10px;
    border-radius: 5px;
  }
</style>
