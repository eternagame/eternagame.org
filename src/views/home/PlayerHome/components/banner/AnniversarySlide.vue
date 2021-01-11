<template>
  <b-carousel-slide
    class="slide"
    :img-src="imageURL"
    style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
  >
    <div>
      <p class="video-title">
        10 Years of Discovery
      </p>

      <p class="explain">
        This year we celebrate 10 years of citizen science through Eterna. Together we've
        synthesized thousands of player-designed molecules, published over 20 academic papers
        tackling fundamental RNA design questions, and pioneered the open development of RNA
        medicines. Over the course of the year we'll be rolling out new features and game mechanics
        as we continue to build the future of Eterna. 
      </p>
      <!--
      <b-button
        class="button"
        variant="primary"
        size="lg"
        style="margin-right:10px"
        :href="`${puzzleRoute}${nextPuzzleID}/`"
        >{{ $t('player-home:next-puzzle') }}</!--b-button
      >
      <b-button
        class="button"
        variant="secondary"
        size="lg"
        href="https://www.pbs.org/wgbh/nova/labs/lab/rna/"
        >{{ $t('player-home:nova-labs') }}</b-button
      >
      <div class="d-flex" style="margin-top: 22px;">
        <router-link to="/news/9818657">
          <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px">
            <i class="arrow_right"></i>{{ $t('player-home:open-vaccine') }}
          </p>
        </router-link>
      </div>
      -->
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import Utils from '@/utils/utils';
  import bgimage from '@/assets/home/hero-10year.png';

  @Component({
    components: {},
  })
  export default class AnniversarySlide extends Vue {
    private puzzleRoute: string = PUZZLE_ROUTE_PREFIX;

    @Prop({ required: true }) readonly nextPuzzleID!: string;

    get imageURL() {
      return bgimage;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  ::v-deep .carousel-caption {
    text-align: left;
  }

  ::v-deep img {
    min-height: 500px;
    object-fit: cover;
  }

  .slide {
    max-width: 1200px;
    max-height: 519px;
    min-height: 519px;
    text-shadow: none !important;
  }

  .video-title {
    line-height: 3rem;
    font-size: 2.8rem;
    font-weight: bold;
    @include media-breakpoint-only(xs) {
      line-height: 1.6rem;
      font-size: 1.5rem;
    }
  }

  .explain {
    max-width: 682px;
  }

  .button {
    margin-top: 10px;
  }

  .slide::after {
    display: block;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
    margin-top: -400px;
    height: 400px;
    width: 100%;
    content: '';
  }
</style>
