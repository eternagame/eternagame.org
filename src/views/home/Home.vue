<template>
  <EternaPage v-if="player">
    <b-container class="video">
      <p style="font-size: 2.8rem; font-weight: bold;">Optimizing the Ribosome</p>
      <p>
        {{ `Ribosome Design Challenge`.toUpperCase() }}
      </p>
      <b-button variant="primary" size="lg" to="/game/puzzle/6502927/">Enter Lab</b-button>
    </b-container>

    <h1>Puzzles</h1>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>

    <h1>Quests</h1>
    <Carousel sm="2" md="2">
      <PuzzleCard nid="G7" locked="true" />
      <PuzzleCard nid="G8" locked="true" />
      <PuzzleCard nid="G9" mlocked="true" />
      <PuzzleCard nid="G10" locked="true" />
      <PuzzleCard nid="G11" locked="true" />
      <PuzzleCard nid="G12" locked="true" />
    </Carousel>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import PuzzleCard from '@/components/Cards/PuzzleCard.vue';

  //   import LabViewData, { LabData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    console.log((await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data);
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      PuzzleCard,
    },
  })
  export default class Home extends Mixins(PageDataMixin(fetchPageData)) {
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
      url('https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/11FA9E9F-89F8-4548-A93F-241E4D1D6362.png');
    background-position: right;
    background-repeat: no-repeat;
    object-fit: contain;
    @include media-breakpoint-up(sm) {
      height: 519px;
      padding: 31px;
      padding-top: 322px;
    }
    height: 400px;
    padding-top: 91px;
    width: 100%;
  }

  .video-wrapper {
    background-color: $dark;
    padding-top: 10px;
    border-radius: 5px;
  }
</style>
