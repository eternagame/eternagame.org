<template>
  <div>
    <div class="banner">
      <div class="banner-hero-image">
        <img src="@/assets/badge_openvaccine_100.png" />
      </div>
      <div class="banner-details">
        <h3>
          OpenVaccine
        </h3>
        <p>
          With the onset of the COVID-19 pandemic, the Eterna project mobilized online gamers toward a solution.
          Their mission? To develop mRNA vaccines stable enough to be deployed to everyone in the world,
          and not just a privileged few.
        </p>
      </div>
    </div>
    <div class="card" style="width:100; border: none;">
      <div class="body">
        <div class="challenge-body">
          <iframe
            class="biomedicine-challenges__video"
            src="https://www.youtube.com/embed/gQgA8LkHJjY"
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div ref="content" style="margin-bottom: 10px;" v-dompurify-html="descriptionToShow"></div>
        <ReadMore v-model="readMore" v-if="readMoreNeeded"></ReadMore>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Prop, Vue } from 'vue-property-decorator';
  import DefaultHero from '@/assets/home/hero-lab-default.png';
  import { LabData } from '@/views/labs/LabView/types';

  const MAX_CHARS = 1000;

  export default class ChallengeDescription extends Vue {
    @Prop({ required: true }) readonly challenge!: LabData;

    private readMore = false;

    get readMoreNeeded() {
      return true;
      // return this.challenge.body.length > MAX_CHARS;
    }

    get descriptionToShow() {
      return "Here at Eterna, games hold a special place in our hearts, it’s part of who we are and what we do. It doesn’t matter where we’re sitting or on what device we’re playing, we get online, sign on, and become part of a community. Yet, this community goes beyond just playing video games and has had some impressive accomplishments. Here at Eterna, games hold a special place in our hearts, it’s part of who we are and what we do. It doesn’t matter where we’re sitting or on what device we’re playing, we get online, sign on, and become part of a community. Yet, this community goes beyond just playing video games and has had some impressive accomplishments. ";
      // return this.readMore ? this.challenge.body : this.challenge.body.substr(0, MAX_CHARS);
    }

    get heroImage() {
      return this.challenge.banner_image || DefaultHero;
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

    &-hero-image {
      flex-basis: 200px;
      flex-grow: 0;
      flex-shrink: 0;
      
      & > img {
        width: 100%;
      }
    }

    &-details {
      margin-left: 3rem;

      & > h3 {
        margin-bottom: 1.5rem;
      }
    }
  }

  .body {
    padding: 40px 30px 5px;

    & .challenge-body {
      float: right;
      margin-left: 30px;
      margin-bottom: 20px;
    }
  }
</style>
