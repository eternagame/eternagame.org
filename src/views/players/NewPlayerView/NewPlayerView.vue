<template>
  <EternaPage v-if="player" title="">
    <div class="video-wrapper">
      <div class="video">
        <b-container>
          <b-row class="row">
            <b-col lg="3" />
            <b-col lg="6" sm="12">
              <div>
                <h2 class="text-block">
                  RNA Virtual Lab
                </h2>
                <h4 class="text-block">
                  Nature’s best kept secret is a wonder molecule called RNA. It is central to the
                  origin of life, evolution, and the cellular machinery that keeps us alive. In this
                  Virtual Lab you’ll play the role of a molecular engineer by solving RNA folding
                  puzzles. Then take your skills to the Eterna Lab, where you can design RNAs that
                  could be at the heart of future life-saving therapies.
                </h4>
                <b-button variant="primary" size="lg" to="/game/puzzle/6502927/"
                  >Next Puzzle</b-button
                >
              </div>
            </b-col>
            <b-col lg="3" />
          </b-row>
        </b-container>
      </div>
    </div>

    <h1>Complete these puzzles to unlock lab access!</h1>
    <Gallery sm="3" md="3">
      <VideoCard title="The basics" />
      <VideoCard title="Protein Synthesis" />
      <VideoCard title="RNA World" />
      <VideoCard title="Virus Attack" />
    </Gallery>
    <Gallery sm="2" md="2" class="video-wrapper">
      <GameCard title="G1" />
      <GameCard title="G2" />
      <GameCard title="G3" />
      <GameCard title="G4" />
      <GameCard title="G4" />
      <GameCard title="G4" />
    </Gallery>
    <p>Advanced Training</p>
    <h1>Lab Skills 101</h1>
    <Gallery>
      <GameCard title="G1" />
      <GameCard title="G2" />
      <GameCard title="G3" />
      <GameCard title="G4" />
    </Gallery>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import VideoCard from './VideoCard.vue';
  import GameCard from './GameCard.vue';

  //   import LabViewData, { LabData } from './types';
  import PageDataMixin from '@/mixins/PageData';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    console.log((await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data);
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      VideoCard,
      GameCard,
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

    private aboutMeText: string = `Live in sometimes hot/often very cold land of 10,000 lakes (Minnesota).
      Univ of Chicago BA/MBA <br/>
      —now on 2nd career as software product manager at IBM.<br/>
      —first career was public & non-profit financial management<br/>
      Passions: racquetball, science, great software, sci-fi, Go, social justice, eteRNA.<br/>
      <br/>
      <b>ete-RNA-L eteRNA wisDOM:</b>
      • When in doubt (or bored) strengthen.<br/>
      • When in doubt on Switch Puzzles: Reset!<br/>
      • When an designer titles a puzzle “ugly”, take their word for it.<br/>
      • When an designer titles a puzzle something and “easy”, run away.<br/>
      • Credit your mods.<br/>
      • Lab results are in the mail.<br/>
      • Going on a diet to reduce a few GCs.<br/>
      • These aren’t the GUs you are looking for. Move along…<br/>
      <br/><br/>

      <b>ETERNACON 2015!</b>`;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .video-wrapper {
    background-color: black;
    padding-top: 10px;
  }
</style>
