<template>
    <section class="row conference-areas">
        <div class="col-md-3 col-sm-6">
        <b-card>
            <img src="~@/assets/about/icon_about_2.png" alt="A microscope" />
            <p>Research</p>
        </b-card>
        </div>
        <div class="col-md-3 col-sm-6">
        <b-card>
            <img src="~@/assets/about/icon_about_1.png" alt="A computer screen with an RNA strand and a mouse cursor" />
            <p>Gameplay</p>
        </b-card>
        </div>
        <div class="col-md-3 col-sm-6">
        <b-card>
            <img src="~@/assets/about/about-section-4-3.png" alt="The characters <, /, and > (indicating code)" />
            <p>Development</p>
        </b-card>
        </div>
        <div class="col-md-3 col-sm-6">
        <b-card>
            <img src="~@/assets/about/about-community.svg" alt="Three people" />
            <p>Community</p>
        </b-card>
        </div>
    </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ConferenceAreasSection extends Vue {}
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .conference-areas {
    margin: 0 -.5rem;
    text-align: center;

    & > div {
      padding: .5rem .5rem;
    }

    img {
      height: 8rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.4rem;
      font-weight: bold;
      margin: 0;

      @include media-breakpoint-only(lg) {
        font-size: 1rem;
      }

      @include media-breakpoint-only(md) {
        font-size: 1rem;
      }
    }
  }
</style>
