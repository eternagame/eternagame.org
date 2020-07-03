<template>
  <div>
    <EternaPage header_date="Last updated: Sept 9, 2018">
      <div class="about-page">
        <section class="about-page__video">
          <iframe
            class="about-page__youtube-video-1"
            src="https://www.youtube.com/embed/V2qtNyJ3KQg"
            frameborder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </section>
        <section class="how-it-works">
          <h1 class="how-it-works__heading section-title">{{ $t('about:section1-title') }}</h1>
          <b-container>
            <b-row class="how-it-works__icons">
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/icon_about_1.png"
                    alt="eterna how-it-works computer icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text">
                    <span class="how-it-works__sub-text--bold">
                      {{ $t('about:section1-detail-1-bold') }}</span
                    >
                    {{ $t('about:section1-detail-1') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/icon_about_2.png"
                    alt="eterna how-it-works microscope icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text">
                    <span class="how-it-works__sub-text--bold">{{
                      $t('about:section1-detail-2-bold')
                    }}</span>
                    {{ $t('about:section1-detail-2') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/icon_about_3.png"
                    alt="eterna how-it-works paper icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text">
                    {{ $t('about:section1-detail-3-pre') }}
                    <span class="how-it-works__sub-text--bold">
                      {{ $t('about:section1-detail-3-bold') }}</span
                    >
                    {{ $t('about:section1-detail-3-post') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/icon_about_4.png"
                    alt="eterna how-it-works microscope icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text">
                    {{ $t('about:section1-detail-4') }}
                    <span class="how-it-works__sub-text--bold">
                      {{ $t('about:section1-detail-4-bold') }}</span
                    >
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-container>
          <b-button class="how-it-works__btn" variant="primary" :href="`${puzzleRoute}6502927/`">
            {{ $t('video-section:main-action') }}
          </b-button>
        </section>
        <section class="biomedicine-challenges">
          <h1 class="biomedicine-challenges__title section-title">
            {{ $t('about:section2-title') }}
          </h1>
          <b-container>
            <b-row class="biomedicine-challenges__sub-section">
              <b-col cols="12" class="col-md-6 ">
                <div class="open-tb-video-wrapper">
                  <iframe
                    class="biomedicine-challenges__video"
                    src="https://www.youtube.com/embed/pGMu569jkEc"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-6">
                <aside class="biomedicine-challenges__aside">
                  <h1 class="biomedicine-challenges__heading">
                    {{ $t('about:section2-header1') }}
                  </h1>
                  <p class="biomedicine-challenges__sub-text">
                    {{ $t('about:section2-header1-details') }}
                  </p>
                  <p class="biomedicine-challenges__status-message">
                    {{ $t('about:section2-header1-status') }}
                  </p>
                  <b-button
                    to="/labs/10027854"
                    class="biomedicine-challenges__btn"
                    variant="secondary"
                    >{{ $t('about:section2-learn-more') }}</b-button
                  >
                </aside>
              </b-col>
            </b-row>
            <b-row class="biomedicine-challenges__sub-section">
              <b-col cols="12" class="col-md-6 ">
                <div class="open-tb-video-wrapper">
                  <iframe
                    class="biomedicine-challenges__video"
                    src="https://www.youtube.com/embed/gQgA8LkHJjY"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-6">
                <aside class="biomedicine-challenges__aside">
                  <h1 class="biomedicine-challenges__heading">
                    {{ $t('about:section2-header2') }}
                  </h1>
                  <p class="biomedicine-challenges__sub-text">
                    {{ $t('about:section2-header2-details') }}
                  </p>
                  <p class="biomedicine-challenges__status-message">
                    {{ $t('about:section2-header2-status') }}
                  </p>
                  <b-button
                    to="/labs/8489876"
                    class="biomedicine-challenges__btn"
                    variant="secondary"
                    >{{ $t('about:section2-learn-more') }}</b-button
                  >
                </aside>
              </b-col>
            </b-row>
            <b-row class="biomedicine-challenges__sub-section">
              <b-col cols="12" class="col-md-6">
                <div class="open-crispr-video-wrapper">
                  <iframe
                    class="biomedicine-challenges__video"
                    src="https://www.youtube.com/embed/IGYpu4BVnhA"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-6">
                <aside class="biomedicine-challenges__aside">
                  <h1 class="biomedicine-challenges__heading">
                    {{ $t('about:section2-header3') }}
                  </h1>
                  <p class="biomedicine-challenges__sub-text">
                    {{ $t('about:section2-header3-details') }}
                  </p>
                  <p class="biomedicine-challenges__status-message">
                    {{ $t('about:section2-header3-status') }}
                  </p>
                  <b-button
                    to="/labs/8037883"
                    class="biomedicine-challenges__btn"
                    variant="secondary"
                    >{{ $t('about:section2-learn-more') }}</b-button
                  >
                </aside>
              </b-col>
            </b-row>
          </b-container>
        </section>

        <section class="featured-publications">
          <h1 class="featured-publications__heading section-title">
            {{ $t('about:section3-title') }}
          </h1>
          <b-container>
            <b-row class="featured-publications__icons">
              <b-col cols="12" class="col-md-4 col-sm-6 featured-publications__list-item">
                <div class="featured-publications__list-item-container">
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub"
                  >
                    <img
                      src="@/assets/about/about-section-3-1.jpg"
                      alt="eterna featured-publications RNA structure design icon"
                      class="featured-publications__icon"
                    />
                  </a>
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub"
                    class="featured-publications__header"
                    >{{ $t('about:section3-header1') }}</a
                  >
                  <p class="featured-publications__header-source">
                    {{ $t('about:section3-header1-source') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 featured-publications__list-item">
                <div class="featured-publications__list-item-container">
                  <a href="http://www.sciencedirect.com/science/article/pii/S0968000414001455">
                    <img
                      src="@/assets/about/about-section-3-2.jpg"
                      alt="eterna featured-publications videiganes icon"
                      class="featured-publications__icon"
                    />
                  </a>
                  <a
                    href="http://www.sciencedirect.com/science/article/pii/S0968000414001455"
                    class="featured-publications__header"
                    >{{ $t('about:section3-header2') }}</a
                  >
                  <p class="featured-publications__header-source">
                    {{ $t('about:section3-header2-source') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 featured-publications__list-item">
                <div class="featured-publications__list-item-container">
                  <a href="http://www.pnas.org/content/111/6/2122">
                    <img
                      src="@/assets/about/about-section-3-3.jpg"
                      alt="eterna featured-publications paper icon"
                      class="featured-publications__icon"
                    />
                  </a>
                  <a
                    href="http://www.pnas.org/content/111/6/2122"
                    class="featured-publications__header"
                    >{{ $t('about:section3-header3') }}</a
                  >
                  <p class="featured-publications__header-source">
                    {{ $t('about:section3-header3-source') }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-container>
          <b-button
            class="featured-publications__btn"
            variant="secondary"
            to="/about/publications"
            >{{ $t('about:section3-call-to-action') }}</b-button
          >
        </section>

        <section class="contribute-your-talents">
          <h1 class="contribute-your-talents__heading section-title">
            {{ $t('about:section4-title') }}
          </h1>
          <b-container>
            <b-row class="contribute-your-talents__icons">
              <b-col cols="12" class="col-md-4 col-sm-6 contribute-your-talents__list-item">
                <div class="contribute-your-talents__list-item-container">
                  <router-link to="/puzzles">
                    <img
                      src="@/assets/about/about-section-4-1.png"
                      alt="eterna contribute-your-talents RNA structure design icon"
                      class="contribute-your-talents__icon"
                    />
                  </router-link>
                  <router-link to="/puzzles"
                    ><p class="contribute-your-talents__header">
                      {{ $t('about:section4-header1') }}
                    </p>
                  </router-link>
                  <p class="contribute-your-talents__header-source">
                    {{ $t('about:section4-header1-details') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 contribute-your-talents__list-item">
                <div class="contribute-your-talents__list-item-container">
                  <a :href="`${BASE_URL_PREFIX}/web/script/`">
                    <img
                      src="@/assets/about/about-section-4-2.png"
                      alt="eterna contribute-your-talents videiganes icon"
                      class="contribute-your-talents__icon"
                    />
                  </a>
                  <a :href="`${BASE_URL_PREFIX}/web/script/`"
                    ><p class="contribute-your-talents__header">
                      {{ $t('about:section4-header2') }}
                    </p></a
                  >
                  <p class="contribute-your-talents__header-source">
                    {{ $t('about:section4-header2-details') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 contribute-your-talents__list-item">
                <div class="contribute-your-talents__list-item-container">
                  <router-link to="/news/6990398/">
                    <img
                      src="@/assets/about/about-section-4-3.png"
                      alt="eterna contribute-your-talents paper icon"
                      class="contribute-your-talents__icon"
                    />
                  </router-link>
                  <router-link to="/news/6990398/">
                    <p class="contribute-your-talents__header">
                      {{ $t('about:section4-header3') }}
                    </p>
                  </router-link>
                  <p class="contribute-your-talents__header-source">
                    {{ $t('about:section4-header3-details') }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </section>
      </div>
    </EternaPage>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import { PUZZLE_ROUTE_PREFIX } from '@/utils/constants';

  @Component({
    components: {
      EternaPage,
    },
  })
  export default class About extends Vue {
    private puzzleRoute: string = PUZZLE_ROUTE_PREFIX;

    private BASE_URL_PREFIX: string = process.env.VUE_APP_API_BASE_URL;
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';

  a {
    color: white;
  }

  .section-title {
    font-weight: bold;
    font-size: 36px;
  }

  .about-page {
    &__video {
      text-align: center;
      background-color: black;
      position: relative;
      // Overflow page margins as a hero element
      margin-top: -$page-margin-top;
      margin-left: -$page-margin-side;
      margin-right: -$page-margin-side;
    }
    &__youtube-video-1 {
      display: inline-block;
      width: 44.2rem;
      max-width: 100%;
      min-height: 24.87rem;
    }
  }

  .how-it-works {
    padding-bottom: 3.562rem;
    border-bottom: 1px solid rgba(20, 70, 125, 1);
    &__icon {
      width: 10rem;
      height: 10rem;
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
      max-width: 12rem;
      text-align: center;
      &--bold {
        font-weight: bolder;
      }
    }
    &__btn {
      width: 18rem;
      height: 4.75rem;
      font-size: 2.375rem;
      display: block;
      margin: 2.86rem auto;
    }
  }

  .biomedicine-challenges {
    padding: 3.45rem 0;
    border-bottom: 1px solid rgba(20, 70, 125, 1);

    &__title {
      text-align: center;
      font-size: 2.25rem;
      margin-bottom: 1.75rem;
    }
    &__video {
      width: 25rem;
      min-height: 14rem;
      max-width: 100%;
    }
    &__aside {
      width: 30rem;
      max-width: 100%;
    }
    &__status-message {
      font-style: italic;
      font-size: 1rem;
    }
    &__sub-text {
      font-size: 1rem;
    }
    &__heading {
      font-size: 1.875rem;
    }
    &__btn {
      width: 10rem;
      height: 2.5rem;
      font-size: 1.125rem;
      display: block;
      margin-top: 6px;
    }
    &__sub-section {
      margin-left: auto;
      margin-right: auto;
      &:not(:first-child) {
        margin-top: 3.25rem;
      }
    }
  }

  .open-tb-video-wrapper,
  .open-crispr-video-wrapper {
    text-align: right;
  }

  .featured-publications {
    padding-bottom: 3.06rem;
    border-bottom: 1px solid rgba(20, 70, 125, 1);
    &__list-item-container {
      width: 17rem;
      text-align: center;
    }
    &__list-item {
      display: flex;
      justify-content: center;
    }
    &__icon {
      width: 273.5px;
      height: 167px;
      margin-bottom: 0.69rem;
    }
    &__heading {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 3.7rem;
      margin-bottom: 2.19rem;
    }
    &__header {
      font-size: 1.125rem;
      font-weight: bolder;
      &-source {
        font-style: italic;
        font-size: 0.875rem;
        text-align: center;
      }
    }
    &__btn {
      width: 25rem;
      height: 2.5rem;
      font-size: 1.125rem;
      display: block;
      margin: 1.94rem auto;
    }
  }

  .contribute-your-talents {
    padding-bottom: 3.06rem;
    &__list-item-container {
      text-align: center;
      width: 17rem;
    }
    &__list-item {
      display: flex;
      justify-content: center;
    }
    &__icon {
      width: 10rem;
      height: 10rem;
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
      font-size: 1.125rem;
      font-weight: bolder;
      margin: 2px auto;
      &-source {
        font-size: 0.875rem;
        text-align: center;
      }
    }
  }
</style>
