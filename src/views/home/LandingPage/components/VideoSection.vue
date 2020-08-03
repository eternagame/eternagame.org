<template>
  <div class="video-wrapper">
    <div class="video">
      <video autoplay muted loop>
        <source src="@/assets/front-page/video/bg_video.webm" type="video/webm" />
        <source src="@/assets/front-page/video/bg_video.mp4" type="video/mp4" />
      </video>

      <b-container>
        <b-row class="row">
          <b-col lg="3" />
          <b-col lg="6" sm="12">
            <div style="text-align: center;">
              <h2 class="text-block">
                {{ $t('video-section:heading') }}
                <strong>
                  {{ $t('video-section:heading-stress') }}.
                </strong>
              </h2>
              <h4 class="text-block">
                {{ $t('video-section:sub-heading') }}
              </h4>
              <b-button
                variant="primary"
                size="lg"
                :href="`${BASE_URL_PREFIX}/game/puzzle/6502927/`"
                class="button"
                >{{ $t('video-section:main-action') }}</b-button
              >
              <b-button variant="secondary" size="lg" to="/about" class="ml-3 button">
                {{ $t('video-section:secondary-action') }}
              </b-button>
              <br /><br />
              <p><strong>Now Available on iOS and Android!</strong></p>
              <a href="https://apps.apple.com/us/app/id1513216417" target="_blank"><img src="@/assets/front-page/img/btn_download_ios.svg" style="width:128px; padding-right:0.5rem;" /></a>
              <a href="https://play.google.com/store/apps/details?id=org.eternagame.mob" target="_blank"><img src="@/assets/front-page/img/btn_download_play.png" style="width:135px" /></a>
            </div>
          </b-col>
          <b-col lg="3" />
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class VideoSection extends Vue {
    private BASE_URL_PREFIX: string = process.env.VUE_APP_API_BASE_URL;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  
  .video {
    background: url(~@/assets/front-page/img/bg_video.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding: 75px 0;
    overflow: hidden;
    position: relative;
    max-width: 1800px;
    margin-right: auto;
    margin-left: auto;
  }

  video {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  @media only screen and (max-width: 600px) {
    video {
      display:none;
    }
    h2 {
      font-size: 2rem;
    }
  }

  .video-wrapper {
    background-color: black;
  }

  .btn-lg {
    font-size: 21px;
  }

  .text-block {
    margin-top: 18.75px;
    margin-bottom: 26.25px;
  }

  h2,
  h4 {
    font-weight: normal;
  }

  .button {
    @include media-breakpoint-up(xs) {
      margin-top: 10px;
    }
  }
</style>
