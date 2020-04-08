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
                Eterna empowers citizen scientists to invent medicine through
                <strong>molecular design</strong>.
              </h2>
              <h4 class="text-block">
                You play by solving puzzles using RNAs, tiny molecules at the heart of every cell.
              </h4>
              <b-button variant="primary" size="lg" to="/game/puzzle/6502927/">Play Now</b-button>
              <b-button variant="secondary" size="lg" to="/about" class="ml-3"
                >About Eterna</b-button
              >
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
  export default class VideoSection extends Vue {}
</script>

<style lang="scss" scoped>
  .video {
    background: url(../../../assets/front-page/img/bg_video.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding: 5rem 0;
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

  .video-wrapper {
    background-color: black;
  }

  .btn-lg {
    font-size: 1.4rem;
  }

  .text-block {
    margin-top: 1.25rem;
    margin-bottom: 1.75rem;
  }
</style>
