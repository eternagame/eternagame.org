<template>
  <div v-if="publications.length > 0 && challenges.length > 0">
    <EternaPage header_date="Last updated: March 19, 2021">
      <div class="about-page">
        <section class="problem-context">
          <b-container class="problem-context__container">
            <b-row v-for="(section, i) in comicSections" :key="i" class="problem-context__row">
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
              >
                <div class="problem-context__list-item-container">
                  <h3
                    :class="section.titleClass"
                    v-scroll-reveal.reset="{
                      origin: i % 2 ? 'right' : 'left'
                    }"
                  >
                    {{ $t(section.title) }}
                  </h3>
                  <p
                    v-for="(commentary, j) in section.commentary"
                    :key="j"
                    class="problem-context__list-item-container__commentary"
                    v-scroll-reveal.reset="{
                      delay: 600,
                      origin: i % 2 ? 'right' : 'left'
                    }"
                  >
                    {{ $t(commentary) }}
                  </p>
                </div>
              </b-col>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal.reset="{
                  delay: 300,
                  viewFactor: 0.5,
                  origin: i % 2 ? 'left' : 'right'
                }"
              >
                <div class="problem-context__list-item-container">
                  <img
                    :src="getImgUrl(section.imgRef)"
                    :alt="section.imgAlt"
                    class="problem-context__list-item-container__panel-image"
                  />
                </div>
              </b-col>
            </b-row>
          </b-container>
        </section>
        <section class="how-it-works">
          <h1 class="how-it-works__heading section-title-1">
            {{ $t('about:section2-title') }}
          </h1>
          <b-container class="how-it-works__container">
            <b-row class="how-it-works__icons">
              <b-col
                v-for="(block, index) in howItWorks"
                :key="index"
                cols="12"
                class="col-md-3 col-sm-6 how-it-works__list-item"
              >
                <div class="how-it-works__list-item-container">
                  <img
                    :src="getImgUrl(block.imgRef)"
                    :alt="block.imgAlt"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text--bold">
                    {{ $t(block.header) }}
                  </p>
                  <p class="how-it-works__sub-text">
                    {{ $t(block.description) }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-container>
          <div class="divider"></div>
        </section>
        <section class="challenges">
          <h1 class="challenges__title section-title-1">
            {{ $t('about:section3-title') }}
          </h1>
          <b-container>
            <b-row class="challenges__container">
              <b-col
                v-for="(challenge, index) in challenges"
                :key="index"
                cols="12"
                class="col-md-4 challenges__challenge-card"
              >
                <div class="challenge-video-wrapper">
                  <iframe
                    class="challenges__video"
                    :src="challenge.video"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <h1 class="challenges__heading">
                  <a href="/labs/10027854">
                    {{ challenge.title }}
                  </a>
                </h1>
                <p class="challenges__sub-text">
                  {{ challenge.blurb }}
                </p>
              </b-col>
            </b-row>
          </b-container>
          <div class="divider"></div>
        </section>
        <section class="featured-publications">
          <h1 class="featured-publications__title section-title-1">
            {{ $t('about:section4-title') }}
          </h1>
          <b-container>
            <b-row class="featured-publications__container">
              <AboutPublicationCard v-for="(pub, index) in publications" :key="index" :pub="pub" />
            </b-row>
          </b-container>
          <b-button
            to="/about/publications"
            class="featured-publications__btn"
            variant="secondary"
            >
            {{ $t('about:section4-view-publications') }}
          </b-button>
          <div class="divider"></div>
        </section>
        <section class="media-block">
          <h1 class="media-block__title section-title-1">
            {{ $t('about:section5-title') }}
          </h1>
          <p class="media-block__subtitle">
            {{ $t('about:section5-subtitle') }}
          </p>
          <b-container>
            <b-row class="media-block__container">
                <AboutMediaCard v-for="(item, index) in mediaItems" :key="index" :item="item" />
            </b-row>
          </b-container>
          <b-container>
            <b-row class="media-block__container">
              <b-col
                v-for="(media, index) in pressBlocks"
                :key="index"
                cols="12"
                class="col-md-12 col-sm-12 media-block__press"
              >
                <div class="media-block__press__logo">
                  <img
                    :src="getImgUrl(media.imgRef)"
                    :alt="media.imgAlt"
                  />
                </div>
                <div>
                  <p class="media-block__press__quote">
                    {{ $t(media.press) }}
                  </p>
                  <a
                    :href="media.link"
                    class="media-block__press__read-more"
                    target="_blank"
                  >
                    Read More
                    <img
                      v-if="isExternal(media.link)"
                      class="media-block__press__read-more_icon"
                      src="@/assets/about/ExternalLink.svg"
                      :alt="$t('nav-bar:external-link')"
                    />
                  </a>
                </div>
              </b-col>
            </b-row>
          </b-container>
          <div class="divider"></div>
        </section>
        <section class="history">
          <h1 class="history__title section-title-1">
            {{ $t('about:section6-title') }}
          </h1>
          <b-container>
            <b-row class="history__container">
              <b-col cols="12" class="col-md-6 col-sm-12 history__list-item">
                <div class="history__list-item-container">
                  <img
                    src="@/assets/about/rhiju-adrien.jpg"
                    alt="Rhiju Das and Adrien Treuille"
                    class="history__list-item-container__media"
                  />
                </div>
              </b-col>
              <b-col cols="12" class="col-md-6 col-sm-12 history__list-item">
                <div class="history__list-item-container">
                  <p class="history__list-item-container__commentary">
                    {{ $t('about:section6-description') }}
                  </p>
                  <b-button
                    to="/history"
                    class="history__btn"
                    variant="secondary"
                    >
                    {{ $t('about:section6-learn-more') }}
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-container>
          <div class="divider"></div>
        </section>
        <section class="contribute-your-talents">
          <h1 class="contribute-your-talents__heading section-title-1">
            {{ $t('about:section7-title') }}
          </h1>
          <b-container class="contribute-your-talents__container">
            <b-row class="contribute-your-talents__icons">
              <b-col
                v-for="(block, index) in talentBlocks"
                :key="index"
                cols="12"
                class="col-md-4 col-sm-6 contribute-your-talents__list-item"
              >
                <div class="contribute-your-talents__list-item-container">
                  <router-link to="/puzzles">
                    <img
                      :src="getImgUrl(block.imgRef)"
                      :alt="block.imgAlt"
                      class="contribute-your-talents__icon"
                    />
                  </router-link>
                  <router-link to="/puzzles"
                    ><p class="contribute-your-talents__header">
                      {{ $t(block.header) }}
                    </p>
                  </router-link>
                  <p class="contribute-your-talents__header-source">
                    {{ $t(block.details) }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-container>
          <div class="divider"></div>
        </section>
        <section class="contributors">
          <h1 class="contributors__title section-title-1">
            {{ $t('about:section8-title1') }}
          </h1>
          <b-container>
            <b-row
              v-for="(contributor, index) in currentContributors"
              :key="index"
              class="contributors__container"
            >
              <h3 class="contributors__container_title section-title-3">
                {{ $t(contributor.title) }}
              </h3>
              <p class="contributors__container_body">
                {{ $t(contributor.body) }}
              </p>
            </b-row>
          </b-container>
          <h1 class="contributors__title section-title-1">
            {{ $t('about:section8-title2') }}
          </h1>
          <b-container>
            <b-row
              v-for="(contributor, index) in pastContributors"
              :key="index"
              class="contributors__container"
            >
              <h3 class="contributors__container_title section-title-3">
                {{ $t(contributor.title) }}
              </h3>
              <p class="contributors__container_body">
                {{ $t(contributor.body) }}
              </p>
            </b-row>
          </b-container>
        </section>
      </div>
    </EternaPage>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import FetchMixin from '@/mixins/FetchMixin';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import {AboutMediaItem, Publications, Publication } from '@/types/common-types';
  
  // import {ChallengeData} from '@/views/challenge/ChallengeView/types';
  import AboutMediaCard from '@/views/about/AboutMediaCard.vue';
  import AboutPublicationCard from '@/views/about/AboutPublicationCard.vue';
  import Utils from '@/utils/utils';

  @Component({
    components: {
      EternaPage,
      AboutMediaCard,
      AboutPublicationCard,
    },
  })
  export default class About extends Mixins(FetchMixin) {
    private BASE_URL_PREFIX: string = process.env.VUE_APP_API_BASE_URL;

    comicSections = [
      {
        title: "about:section1-panel1-title",
        titleClass: "problem-context__heading section-title-1",
        commentary: ["about:section1-panel1-commentary1", "about:section1-panel1-commentary2"],
        imgRef: "about/about-page-comic-01.jpg",
        imgAlt: "eterna problem-context transcribed RNA",
      },
      {
        title: "about:section1-panel2-title",
        titleClass: "problem-context__heading section-title-3",
        commentary: ["about:section1-panel2-commentary"],
        imgRef: "about/about-page-comic-02.jpg",
        imgAlt: "eterna problem-context RNA secondary structure",
      },
      {
        title: "about:section1-panel3-title",
        titleClass: "problem-context__heading section-title-3",
        commentary: ["about:section1-panel3-commentary"],
        imgRef: "about/about-page-comic-03.jpg",
        imgAlt: "eterna problem-context solving eterna puzzle",
      },
      {
        title: "about:section1-panel4-title",
        titleClass: "problem-context__heading section-title-3",
        commentary: ["about:section1-panel4-commentary"],
        imgRef: "about/about-page-comic-04.jpg",
        imgAlt: "eterna problem-context eterna players beating puzzle while supercomputer stumped",
      },
    ];

    howItWorks = [
      {
        header: "about:section2-header1",
        description: "about:section2-description1",
        imgRef: "about/solve-puzzles-icon.svg",
        imgAlt: "eterna how-it-works computer icon"
      },
      {
        header: "about:section2-header2",
        description: "about:section2-description2",
        imgRef: "about/get-feedback-icon.svg",
        imgAlt: "eterna how-it-works microscope icon"
      },
      {
        header: "about:section2-header3",
        description: "about:section2-description3",
        imgRef: "about/write-papers-icon.svg",
        imgAlt: "eterna how-it-works paper icon"
      },
      {
        header: "about:section2-header4",
        description: "about:section2-description4",
        imgRef: "about/invent-medicine-icon.svg",
        imgAlt: "eterna how-it-works medicine icon"
      }
    ];

    challenges = [];

    mediaItems: AboutMediaItem[] = [
      {
        link: "https://eterna.s3.amazonaws.com/about-page/eterna-logos.zip",
        title: "about:section5-card1-title",
        description: "about:section5-card1-description",
      },
      {
        link: "https://eterna.s3.amazonaws.com/about-page/eterna-background-information.pdf",
        title: "about:section5-card2-title",
        description: "about:section5-card2-description",
      },
      {
        link: "https://eterna.s3.amazonaws.com/about-page/eterna-screenshots.zip",
        title: "about:section5-card3-title",
        description: "about:section5-card3-description",
      }
    ];

    pressBlocks = [
      {
        imgRef: "front-page/img/logo_nyt.svg",
        imgAlt: "eterna press new york times logo",
        press: "about:section5-press1",
        link: "http://www.nytimes.com/2011/01/11/science/11rna.html?_r=0"
      },
      {
        imgRef: "front-page/img/logo_cnn.svg",
        imgAlt: "eterna press cnn logo",
        press: "about:section5-press2",
        link: "http://www.cnn.com/interactive/2012/08/tech/gaming.series/research.html"
      },
      {
        imgRef: "front-page/img/logo_wired.svg",
        imgAlt: "eterna press wired logo",
        press: "about:section5-press3",
        link: "http://www.wired.com/wiredscience/2012/07/ff-rnagame/"
      },
      {
        imgRef: "front-page/img/logo_wsj.svg",
        imgAlt: "eterna press wall street journal logo",
        press: "about:section5-press4",
        link: "http://www.wsj.com/articles/videogamers-are-recruited-to-fight-tuberculosis-and-other-ills-1462290212"
      },
      {
        imgRef: "front-page/img/logo_nova.svg",
        imgAlt: "eterna press nova logo",
        press: "about:section5-press5",
        link: "https://www.pbs.org/wgbh/nova/video/decoding-covid-19/"
      }
    ];

    publications: Publication[] = [];

    talentBlocks = [
      {
        imgRef: "about/about-section-4-1.png",
        imgAlt: "eterna contribute-your-talents RNA structure design icon",
        header: "about:section7-header1",
        details: "about:section7-header1-details"
      },
      {
        imgRef: "about/about-section-4-2.png",
        imgAlt: "eterna contribute-your-talents videiganes icon",
        header: "about:section7-header2",
        details: "about:section7-header2-details"
      },
      {
        imgRef: "about/about-section-4-3.png",
        imgAlt: "eterna contribute-your-talents paper icon",
        header: "about:section7-header3",
        details: "about:section7-header3-details"
      },
    ];

    currentContributors = [
      {
        title: "about:section8-subtitle1",
        body: "about:section8-description1"
      },
      {
        title: "about:section8-subtitle2",
        body: "about:section8-description2"
      },
      {
        title: "about:section8-subtitle3",
        body: "about:section8-description3"
      },
    ];

    pastContributors = [
      {
        title: "about:section8-subtitle4",
        body: "about:section8-description4"
      },
      {
        title: "about:section8-subtitle5",
        body: "about:section8-description5"
      },
      {
        title: "about:section8-subtitle6",
        body: "about:section8-description6"
      },
    ];

    async fetch() {
      const {sort} = this.$route.query;
      const {challenges} = (
        await this.$http.get('/get/?type=challenges')
      ).data.data;

      this.challenges = challenges;

      const publications = (
        await this.$http.get('/get/?type=pubslist')
      ).data.data as Publications;

      this.publications = publications.researcherpubslist.slice(0, 3);
    }
    
    isExternal(link: string): boolean {
      return Utils.isExternal(link);
    }

    getImgUrl(path: string) {
      const images = require.context('@/assets/', true);
      return images(`./${  path}`);
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';
  $breakpoint-small: 768px;

  a {
    color: white;
  }

  .section-title {
    &-1 {
      margin-bottom: 20px;
      font-size: 36px;
    }
    &-2 {
      margin-bottom: 20px;
      font-size: 30px;
    }
    &-3 {
      margin-bottom: 20px;
      font-size: 22px;
    }
  }

  .divider {
    margin: 50px auto;
    margin-bottom: 0px;
    width: calc(100% - 100px);
    height: 2px;
    background-color: rgba(20, 70, 125, 1);
  }

  .about-page {
    margin-top: -45px;
    margin-left: -22.5px;
    margin-right: -22.5px;
    
    &__video {
      text-align: center;
      background-color: black;
      position: relative;
      // Overflow page margins as a hero element
      margin-top: -$page-margin-top;
      margin-left: -$page-margin-side;
      margin-right: -$page-margin-side;
    }
  }

  .problem-context {
    padding: 10rem 2rem;
    padding-top: 0px;
    width: 100%;
    background-color: #21508C;
    @media (max-width: $breakpoint-small) {
      padding: 50px 10px;
    }
  
    &__row {
      display: flex;
      flex-direction: row;
      height: calc(100vh - 120px);

      &:nth-child(2n) {
        flex-direction: row-reverse;
        height: auto;
        padding-left: 2rem;
      }

      &:nth-child(2n + 1) {
        align-items: center;
      }

      @media (max-width: $breakpoint-small) {
        height: auto;
        margin: 0;
        margin-top: 60px;

        &:first-child {
          margin: 0;
        }

        &:last-child {
          margin: 0;
          margin-top: 60px;
        }
      }
    }

    &__list-item {
      &:nth-child(2n + 1) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: transitionIn 300ms linear;
      }
      
      @media (max-width: $breakpoint-small) {
        padding-left: 0px;
        margin-top: 20px;
      }

      &-container {
        flex: 0.5;

        .section-title-1 {
          @media (max-width: $breakpoint-small) {
            text-align: center;
          }
        }

        .section-title-3 {
          margin-top: 20px;

          @media (max-width: $breakpoint-small) {
            text-align: center;
          }
        }

        &__panel-image {
          width: 100%;
          border-radius: 5px;
          box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
            2px 5px 10px 0px rgb(94 93 102 / 10%);
        }

        &__commentary {
          font-size: 0.9rem;
          max-width: 50ch;
        }
      }
    }
  }

  .how-it-works {
    &__container {
      max-width: 1000px;
      margin: 0 auto;
    }
    &__icon {
      width: 138px;
      height: 138px;
      border-radius: 50%;
      margin-bottom: 1rem;
    }
    &__list-item-container {
      text-align: center;
    }
    &__list-item {
      display: flex;
      justify-content: center;
    }
    &__heading {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 3.7rem;
      margin-bottom: 2.19rem;
    }
    &__sub-text {
      font-size: 1rem;
      max-width: 13rem;
      text-align: center;
      margin-bottom: 3rem;
      &--bold {
        font-weight: bolder;
      }
    }
  }

  .challenges {
    padding-top: 3.45rem;

    &__container {
      max-width: 900px;
      margin: 0 auto;
      &:not(:first-child) {
        margin-top: 3.25rem;
      }
    }
    &__challenge-card {
      padding: 0 2rem;
      &:not(:last-child) {
        margin-bottom: 2rem;
      }

      .challenge-video-wrapper {
        text-align: center;
      }

      @media (max-width: $breakpoint-small) {
        &:not(:last-child) {
          margin-bottom: 6rem;
        }
      }
    }
    &__title {
      text-align: center;
      font-size: 2.25rem;
      margin-bottom: 3rem;
    }
    &__video {
      width: 100%;
      min-height: 14rem;
      max-width: 100%;
      border-radius: 5px;
    }
    &__heading {
      font-size: 1.875rem;
      margin-top: 1.5rem;

      @media (max-width: $breakpoint-small) {
          text-align: center;
        }
    }
    &__sub-text {
      font-size: 1rem;

      @media (max-width: $breakpoint-small) {
          text-align: center;
        }
    }
  }
  
  .featured-publications {
 
    &__title {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 3.7rem;
      margin-bottom: 2.19rem;
    }
    &__container {
      display: flex;
      justify-content: center;
    }
    &__btn {
      width: 25rem;
      height: 2.5rem;
      font-size: 1.125rem;
      display: block;
      margin: 1.94rem auto;
    }
  }

  .media-block {

    &__title {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 3.7rem;
      margin-bottom: 1rem;
    }
    &__subtitle {
      text-align: center;
      margin-bottom: 2.19rem;
      max-width: 50ch;
      margin: 0 auto;
      margin-bottom: 2rem;
    }
    &__container {
      display: flex;
      justify-content: center;
      max-width: 900px;
      margin: 0 auto;
    }
    &__press {
      display: flex;
      align-items: center;
      margin-top: 50px;
      padding: 0;

      @media (max-width: $breakpoint-small) {
        flex-direction: column;
        margin-bottom: 3rem;
      }

      &__logo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-basis: 20rem;
        flex-grow: 0;
        flex-shrink: 0;

        @media (max-width: $breakpoint-small) {
          flex-basis: auto;
          margin-bottom: 1rem;
        }
      }
      &__quote {
        max-width: 65ch;
        font-size: 0.875rem;
        flex-grow: 1;
        flex-shrink: 1;

        @media (max-width: $breakpoint-small) {
          text-align: center;
        }
      }
      &__read-more {
        font-size: 0.875rem;
        color: #F39C12;

        @media (max-width: $breakpoint-small) {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        &_icon {
          height: 0.8rem;
          margin-left: 5px;
          position: relative;
          top: -2.5px;
        }
      }
    }
  }

  .history {
    &__title {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 3.7rem;
      margin-bottom: 2.19rem;
    }

    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__list-item {
      padding-left: 30px;
    }

    &__list-item-container {
      @media (max-width: $breakpoint-small) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &__media {
        float: right;
        width: 300px;
        border-radius: 5px;

        @media (max-width: $breakpoint-small) {
          float: none;
          margin-bottom: 3rem;
        }
      }

      &__commentary {
        font-size: 0.8rem;
        max-width: 45ch;
      }
    }
    &__btn {
      width: 120px;
      height: 2rem;
      font-size: 0.875rem;
      display: block;
      padding-top: 4px;
    }
  }

  .contribute-your-talents {
    &__container {
      max-width: 50rem;
    }
    &__list-item-container {
      text-align: center;
      width: 12rem;

      & a {
        text-decoration-color: #F39C12;
      }
    }
    &__list-item {
      display: flex;
      justify-content: center;

      @media (max-width: $breakpoint-small) {
        margin-top: 3rem;
      }
    }
    &__icon {
      width: 6rem;
      height: 6rem;
      margin-bottom: 1.36rem;
      border-radius: 50%;
    }
    &__heading {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 3.7rem;
      margin-bottom: 2.19rem;
    }
    &__header {
      font-size: 1rem;
      color: #F39C12;
      font-weight: bolder;
      margin: 2px auto;
      
      
      &-source {
        font-size: 0.875rem;
        text-align: center;
      }
    }
  }

  .contributors {
    padding-bottom: 2rem;

    &__title {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 3.7rem;
      margin-bottom: 2.19rem;
    }
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 70ch;
      margin: 0 auto;
      margin-bottom: 1rem;
    }

  }

  @keyframes transitionIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
