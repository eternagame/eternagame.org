<template>
  <b-carousel-slide
    class="slide"
    :img-src="imageURL"
    style=" background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0))"
  >
    <div>
      <p class="video-title">
        {{ $t('player-home:banner-title') }}<br /><i>{{ $t('player-home:banner-together') }}</i>
      </p>

      <p class="explain">
        {{ $t('player-home:banner-explain') }}
      </p>
      <b-button
        class="button"
        variant="primary"
        size="lg"
        style="margin-right:10px"
        :to="`/puzzles/${nextPuzzleID}/play`"
        >{{ $t('player-home:next-puzzle') }}</b-button
      >
      <div class="d-flex" style="margin-top: 22px;">
        <a href="https://www.pbs.org/wgbh/nova/labs/lab/rna/" target="_blank">
        <p style="margin-right: 20px;color:white;font-weight:bold;font-size:14px">
            <i class="arrow_right"></i>{{ $t('player-home:nova-labs') }}
          </p>
        </a>
      </div>
    </div>
  </b-carousel-slide>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import bgimage from '@/assets/home/hero-evergreen.jpg';

  @Component({
    components: {},
  })
  export default class TutorialTeaserSlide extends Vue {
    @Prop({ required: true }) readonly nextPuzzleID!: string;

    get imageURL() {
      return bgimage;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  :deep(.carousel-caption) {
    text-align: left;
  }

  :deep(img) {
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
    max-width: 482px;
  }

  .button {
    margin-top: 10px;
  }
</style>
