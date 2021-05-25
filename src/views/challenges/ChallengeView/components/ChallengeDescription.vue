<template>
  <div>
    <div class="banner">
      <div class="banner-hero-image">
        <img :src="coverImage" />
      </div>
      <div class="banner-details">
        <h3>
          {{ title }}
        </h3>
        <p>
          {{ abstract }}
        </p>
      </div>
    </div>
    <div class="card" style="width:100; border: none;">
      <div :class="readMore? 'body expanded' : 'body'">
        <div class="challenge-body-video">
          <iframe
            :src="video"
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div ref="content" class="challenge-body-description" v-dompurify-html="descriptionToShow"></div>
        <ReadMore v-model="readMore" v-if="readMoreNeeded"></ReadMore>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import DefaultHero from '@/assets/home/hero-lab-default.png';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';

  const MAX_CHARS = 1000;

  @Component({
    components: {},
  })
  export default class ChallengeDescription extends Vue {
    @Prop({ required: true }) readonly challenge!: ChallengeData;

    private readMore = false;

    get readMoreNeeded() {
      return this.challenge?.body && this.challenge?.body?.length > MAX_CHARS;
    }

    get descriptionToShow() {
      return this.readMore ? this.challenge?.body : this.challenge?.body.substr(0, MAX_CHARS);
    }

    get title() {
      return this.challenge?.title || "";
    }

    get abstract() {
      return this.challenge?.abstract || "";
    }

    get video() {
      return this.challenge?.video || "";
    }

    get coverImage() {
      return this.challenge?.cover_image || DefaultHero;
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

  .banner-title {
    font-weight: bold;
    font-size: 42px;
    text-align: left;
    @include media-breakpoint-down(md) {
      font-size: 30px;
    }
    @include media-breakpoint-down(xs) {
      font-size: 20px;
      text-align: center;
      margin: 0 auto;
    }
  }

  .banner {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;

    @include media-breakpoint-down(md) {
      flex-direction: column;
    }
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }

    &-hero-image {
      flex-basis: 200px;
      flex-grow: 0;
      flex-shrink: 0;
      
      & > img {
        width: 200px;
      }
    }

    &-details {
      margin-left: 3rem;

      & > h3 {
        margin-bottom: 1.5rem;

        @include media-breakpoint-down(md) {
          text-align: center;
        }
        @include media-breakpoint-down(xs) {
          text-align: center;
        }
      }

      & > p {
        @include media-breakpoint-down(md) {
          text-align: center;
        }
        @include media-breakpoint-down(xs) {
          text-align: center;
        }
      }

      @include media-breakpoint-down(md) {
        margin-left: 0px;
        margin-top: 20px;
      }
      @include media-breakpoint-down(xs) {
        margin-left: 0px;
        margin-top: 20px;
      }
    }
  }

  .body {
    padding: 40px 30px 20px;

    &.expanded {
      padding: 40px 30px 5px;
    }

    & .challenge-body-video {
      float: right;
      margin-left: 30px;
      margin-bottom: 20px;

      @include media-breakpoint-down(md) {
        float: none;
        display: flex;
        justify-content: center;
        margin-left: 0;
      }
      @include media-breakpoint-down(xs) {
        float: none;
        display: flex;
        justify-content: center;
        margin-left: 0;
      }
    }

    & .challenge-body-description {
      margin-bottom: 10px;

      @include media-breakpoint-down(md) {
        text-align: center;
      }
      @include media-breakpoint-down(xs) {
        text-align: center;
      }
    }
  }
</style>
