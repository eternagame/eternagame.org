<template>
  <div>
    <EternaPage header_date="Last updated: March 19, 2021">
      <div class="about-page">
        <section class="problem-context">
          <b-container class="problem-context__container">
            <b-row class="problem-context__row" no-gutters>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
              >
                <div class="problem-context__list-item-container">
                  <h3
                    class="problem-context__heading section-title-1"
                    v-scroll-reveal="{
                      delay: 300,
                      distance: '10px',
                      origin: 'left'
                    }"
                  >
                    {{ $t('about:section1-panel1-title') }}
                  </h3>
                  <p
                    class="problem-context__list-item-container__commentary"
                    v-scroll-reveal="{
                      delay: 900,
                      distance: '10px',
                      origin: 'left'
                    }"
                  >
                    {{ $t('about:section1-panel1-commentary1') }}
                  </p>
                  <p
                    class="problem-context__list-item-container__commentary"
                    v-scroll-reveal="{
                      delay: 900,
                      distance: '10px',
                      origin: 'left'
                    }"
                  >
                    {{ $t('about:section1-panel1-commentary2') }}
                  </p>
                </div>
              </b-col>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal="{
                  delay: 600,
                  distance: '10px',
                  origin: 'right'
                }"
              >
                <div class="problem-context__list-item-container">
                  <img
                    src="@/assets/about/about-page-comic-01.jpg"
                    alt="eterna problem-context transcribed RNA"
                    class="problem-context__list-item-container__panel-image"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row class="problem-context__row" no-gutters>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal
              >
                <div class="problem-context__list-item-container">
                  <h3
                    class="problem-context__heading section-title-3"
                    v-scroll-reveal="{
                      delay: 300,
                      distance: '10px',
                      origin: 'right'
                    }"
                  >
                    {{ $t('about:section1-panel2-title') }}
                  </h3>
                  <p
                    class="problem-context__list-item-container__commentary"
                    v-scroll-reveal="{
                      delay: 900,
                      distance: '10px',
                      origin: 'right'
                    }"
                  >
                    {{ $t('about:section1-panel2-commentary') }}
                  </p>
                </div>
              </b-col>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal="{
                  delay: 600,
                  distance: '10px',
                  origin: 'left'
                }"
              >
                <div class="problem-context__list-item-container">
                  <img
                    src="@/assets/about/about-page-comic-02.jpg"
                    alt="eterna problem-context RNA secondary structure"
                    class="problem-context__list-item-container__panel-image"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row class="problem-context__row" no-gutters>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal
              >
                <div class="problem-context__list-item-container">
                  <h3
                    class="problem-context__heading section-title-3"
                    v-scroll-reveal="{
                      delay: 300,
                      distance: '10px',
                      origin: 'left'
                    }"
                  >
                    {{ $t('about:section1-panel3-title') }}
                  </h3>
                  <p
                    class="problem-context__list-item-container__commentary"
                    v-scroll-reveal="{
                      delay: 900,
                      distance: '10px',
                      origin: 'left'
                    }"
                  >
                    {{ $t('about:section1-panel3-commentary') }}
                  </p>
                </div>
              </b-col>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal="{
                  delay: 600,
                  distance: '10px',
                  origin: 'right'
                }"
              >
                <div class="problem-context__list-item-container">
                  <img
                    src="@/assets/about/about-page-comic-03.jpg"
                    alt="eterna problem-context solving eterna puzzle"
                    class="problem-context__list-item-container__panel-image"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row class="problem-context__row" no-gutters>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal
              >
                <div class="problem-context__list-item-container">
                  <h3
                    class="problem-context__heading section-title-3"
                    v-scroll-reveal="{
                      delay: 300,
                      distance: '10px',
                      origin: 'right'
                    }"
                  >
                    {{ $t('about:section1-panel4-title') }}
                  </h3>
                  <p
                    class="problem-context__list-item-container__commentary"
                    v-scroll-reveal="{
                      delay: 900,
                      distance: '10px',
                      origin: 'right'
                    }"
                  >
                    {{ $t('about:section1-panel4-commentary') }}
                  </p>
                </div>
              </b-col>
              <b-col
                cols="12"
                class="col-md-6 col-sm-12 problem-context__list-item"
                v-scroll-reveal="{
                  delay: 600,
                  distance: '10px',
                  origin: 'left'
                }"
              >
                <div class="problem-context__list-item-container">
                  <img
                    src="@/assets/about/about-page-comic-04.jpg"
                    alt="eterna problem-context eterna players beating puzzle while supercomputer stumped"
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
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/solve-puzzles-icon.svg"
                    alt="eterna how-it-works computer icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text--bold">
                    {{ $t('about:section2-header1') }}
                  </p>
                  <p class="how-it-works__sub-text">
                    {{ $t('about:section2-description1') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/get-feedback-icon.svg"
                    alt="eterna how-it-works microscope icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text--bold">
                    {{ $t('about:section2-header2') }}
                  </p>
                  <p class="how-it-works__sub-text">
                    {{ $t('about:section2-description2') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/write-papers-icon.svg"
                    alt="eterna how-it-works paper icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text--bold">
                    {{ $t('about:section2-header3') }}
                  </p>
                  <p class="how-it-works__sub-text">
                    {{ $t('about:section2-description3') }}
                  </p>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-3 col-sm-6 how-it-works__list-item">
                <div class="how-it-works__list-item-container">
                  <img
                    src="@/assets/about/invent-medicine-icon.svg"
                    alt="eterna how-it-works microscope icon"
                    class="how-it-works__icon"
                  />
                  <p class="how-it-works__sub-text--bold">
                    {{ $t('about:section2-header4') }}
                  </p>
                  <p class="how-it-works__sub-text">
                    {{ $t('about:section2-description4') }}
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
              <b-col cols="12" class="col-md-6 challenges__challenge-card">
                <div class="challenge-video-wrapper">
                  <iframe
                    class="challenges__video"
                    src="https://www.youtube.com/embed/pGMu569jkEc"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <h1 class="challenges__heading">
                  <a href="/labs/10027854">
                    {{ $t('about:section3-header2') }}
                  </a>
                </h1>
                <p class="challenges__sub-text">
                  {{ $t('about:section3-description2') }}
                </p>
              </b-col>
              <b-col cols="12" class="col-md-6 challenges__challenge-card">
                <div class="challenge-video-wrapper">
                  <iframe
                    class="challenges__video"
                    src="https://www.youtube.com/embed/gQgA8LkHJjY"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <h1 class="challenges__heading">
                    <a href="/labs/8489876">
                      {{ $t('about:section3-header3') }}
                    </a>
                  </h1>
                  <p class="challenges__sub-text">
                    {{ $t('about:section3-description3') }}
                  </p>
              </b-col>
              <b-col cols="12" class="col-md-6 challenges__challenge-card">
                <div class="challenge-video-wrapper">
                  <iframe
                    class="challenges__video"
                    src="https://www.youtube.com/embed/IGYpu4BVnhA"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
                <h1 class="challenges__heading">
                    <a href="/labs/8037883">
                      {{ $t('about:section3-header4') }}
                    </a>
                  </h1>
                  <p class="challenges__sub-text">
                    {{ $t('about:section3-description4') }}
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
              <b-col cols="12" class="col-md-4 col-sm-6 featured-publications__list-item">
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub"
                  class="featured-publications__list-item-container"
                  target="_blank"
                >
                  <img
                    src="@/assets/about/about-section-3-1.jpg"
                    alt="eterna featured-publications RNA structure design graphic"
                    class="featured-publications__graphic"
                  />
                  <p class="featured-publications__year">
                    {{ $t('about:section4-header1-year') }}
                  </p>
                  <h4 class="featured-publications__header">
                    {{ $t('about:section4-header1') }}
                  </h4>
                  <p class="featured-publications__source">
                    {{ $t('about:section4-header1-source') }}
                  </p>
                </a>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 featured-publications__list-item">
                <a
                  href="http://www.sciencedirect.com/science/article/pii/S0968000414001455"
                  class="featured-publications__list-item-container"
                  target="_blank"
                >
                  <img
                    src="@/assets/about/about-section-3-2.jpg"
                    alt="eterna featured-publications videiganes graphic"
                    class="featured-publications__graphic"
                  />
                  <p class="featured-publications__year">
                    {{ $t('about:section4-header2-year') }}
                  </p>
                  <h4 class="featured-publications__header">
                    {{ $t('about:section4-header2') }}
                  </h4>
                  <p class="featured-publications__source">
                    {{ $t('about:section4-header2-source') }}
                  </p>
                </a>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 featured-publications__list-item">
                <a
                  href="http://www.pnas.org/content/111/6/2122"
                  class="featured-publications__list-item-container"
                  target="_blank"
                >
                  <img
                    src="@/assets/about/about-section-3-3.jpg"
                    alt="eterna featured-publications paper graphic"
                    class="featured-publications__graphic"
                  />
                  <p class="featured-publications__year">
                    {{ $t('about:section4-header3-year') }}
                  </p>
                  <h4 class="featured-publications__header">
                    {{ $t('about:section4-header3') }}
                  </h4>
                  <p class="featured-publications__source">
                    {{ $t('about:section4-header3-source') }}
                  </p>
                </a>
              </b-col>
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
          <!-- <b-container>
            <b-row class="media-block__container">
              <b-col cols="12" class="col-md-4 col-sm-6 media-block__list-item">
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub"
                  class="media-block__list-item-container"
                  target="_blank"
                >
                  <div class="media-block__download-button">
                      <img
                        src="@/assets/about/download-icon.svg"
                        alt="eterna download icon"
                        class="media-block__download-button__icon"
                      />
                  </div>
                  <h4 class="media-block__header">
                    {{ $t('about:section5-card1-title') }}
                  </h4>
                  <p class="media-block__description">
                    {{ $t('about:section5-card1-description') }}
                  </p>
                </a>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 media-block__list-item">
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub"
                  class="media-block__list-item-container"
                  target="_blank"
                >
                  <div class="media-block__download-button">
                      <img
                        src="@/assets/about/download-icon.svg"
                        alt="eterna download icon"
                        class="media-block__download-button__icon"
                      />
                  </div>
                  <h4 class="media-block__header">
                    {{ $t('about:section5-card2-title') }}
                  </h4>
                  <p class="media-block__description">
                    {{ $t('about:section5-card2-description') }}
                  </p>
                </a>
              </b-col>
              <b-col cols="12" class="col-md-4 col-sm-6 media-block__list-item">
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S0022283615006567?via%3Dihub"
                  class="media-block__list-item-container"
                  target="_blank"
                >
                  <div class="media-block__download-button">
                      <img
                        src="@/assets/about/download-icon.svg"
                        alt="eterna download icon"
                        class="media-block__download-button__icon"
                      />
                  </div>
                  <h4 class="media-block__header">
                    {{ $t('about:section5-card3-title') }}
                  </h4>
                  <p class="media-block__description">
                    {{ $t('about:section5-card3-description') }}
                  </p>
                </a>
              </b-col>
            </b-row>
          </b-container> -->
          <b-container>
            <b-row class="media-block__container">
              <b-col cols="12" class="col-md-12 col-sm-12 media-block__press">
                <div class="media-block__press__logo">
                  <img
                    src="@/assets/front-page/img/logo_nyt.svg"
                    alt="eterna download icon"
                  />
                </div>
                <div>
                  <p class="media-block__press__quote">
                    {{ $t('about:section5-press1') }}
                  </p>
                  <a
                    href="http://www.nytimes.com/2011/01/11/science/11rna.html?_r=0"
                    class="media-block__press__read-more"
                    target="_blank"
                  >
                    Read More
                  </a>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-12 col-sm-12 media-block__press">
                <div class="media-block__press__logo">
                  <img
                    src="@/assets/front-page/img/logo_cnn.svg"
                    alt="eterna download icon"
                  />
                </div>
                <div>
                  <p class="media-block__press__quote">
                    {{ $t('about:section5-press2') }}
                  </p>
                  <a
                    href="http://www.cnn.com/interactive/2012/08/tech/gaming.series/research.html"
                    class="media-block__press__read-more"
                    target="_blank"
                  >
                    Read More
                  </a>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-12 col-sm-12 media-block__press">
                <div class="media-block__press__logo">
                  <img
                    src="@/assets/front-page/img/logo_wired.svg"
                    alt="eterna download icon"
                  />
                </div>
                <div>
                  <p class="media-block__press__quote">
                    {{ $t('about:section5-press3') }}
                  </p>
                  <a
                    href="http://www.wired.com/wiredscience/2012/07/ff-rnagame/"
                    class="media-block__press__read-more"
                    target="_blank"
                  >
                    Read More
                  </a>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-12 col-sm-12 media-block__press">
                <div class="media-block__press__logo">
                  <img
                    src="@/assets/front-page/img/logo_wsj.svg"
                    alt="eterna download icon"
                  />
                </div>
                <div>
                  <p class="media-block__press__quote">
                    {{ $t('about:section5-press4') }}
                  </p>
                  <a
                    href="http://www.wsj.com/articles/videogamers-are-recruited-to-fight-tuberculosis-and-other-ills-1462290212"
                    class="media-block__press__read-more"
                    target="_blank"
                  >
                    Read More
                  </a>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-12 col-sm-12 media-block__press">
                <div class="media-block__press__logo">
                  <img
                    src="@/assets/front-page/img/logo_nova.svg"
                    alt="eterna download icon"
                  />
                </div>
                <div>
                  <p class="media-block__press__quote">
                    {{ $t('about:section5-press5') }}
                  </p>
                  <a
                    href="https://www.pbs.org/wgbh/nova/video/decoding-covid-19/"
                    class="media-block__press__read-more"
                    target="_blank"
                  >
                    Read More
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
                  <!-- <b-button
                    to="/about/publications"
                    class="history__btn"
                    variant="secondary"
                    >
                    {{ $t('about:section6-learn-more') }}
                  </b-button> -->
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
                      {{ $t('about:section7-header1') }}
                    </p>
                  </router-link>
                  <p class="contribute-your-talents__header-source">
                    {{ $t('about:section7-header1-details') }}
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
                      {{ $t('about:section7-header2') }}
                    </p></a
                  >
                  <p class="contribute-your-talents__header-source">
                    {{ $t('about:section7-header2-details') }}
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
                      {{ $t('about:section7-header3') }}
                    </p>
                  </router-link>
                  <p class="contribute-your-talents__header-source">
                    {{ $t('about:section7-header3-details') }}
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
            <b-row class="contributors__container">
              <h3 class="contributors__container_title section-title-3">
                {{ $t('about:section8-subtitle1') }}
              </h3>
              <p class="contributors__container_body">
                {{ $t('about:section8-description1') }}
              </p>
            </b-row>
            <b-row class="contributors__container">
              <h3 class="contributors__container_title section-title-3">
                {{ $t('about:section8-subtitle2') }}
              </h3>
              <p class="contributors__container_body">
                {{ $t('about:section8-description2') }}
              </p>
            </b-row>
            <b-row class="contributors__container">
              <h3 class="contributors__container_title section-title-3">
                {{ $t('about:section8-subtitle3') }}
              </h3>
              <p class="contributors__container_body">
                {{ $t('about:section8-description3') }}
              </p>
            </b-row>
          </b-container>
          <h1 class="contributors__title section-title-1">
            {{ $t('about:section8-title2') }}
          </h1>
          <b-container>
            <b-row class="contributors__container">
              <h3 class="contributors__container_title section-title-3">
                {{ $t('about:section8-subtitle4') }}
              </h3>
              <p class="contributors__container_body">
                {{ $t('about:section8-description4') }}
              </p>
            </b-row>
            <b-row class="contributors__container">
              <h3 class="contributors__container_title section-title-3">
                {{ $t('about:section8-subtitle5') }}
              </h3>
              <p class="contributors__container_body">
                {{ $t('about:section8-description5') }}
              </p>
            </b-row>
            <b-row class="contributors__container">
              <h3 class="contributors__container_title section-title-3">
                {{ $t('about:section8-subtitle6') }}
              </h3>
              <p class="contributors__container_body">
                {{ $t('about:section8-description6') }}
              </p>
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

  @Component({
    components: {
      EternaPage,
    },
  })
  export default class About extends Vue {
    private BASE_URL_PREFIX: string = process.env.VUE_APP_API_BASE_URL;
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
    padding: 50px 118px;
    width: 100%;
    background-color: #043468;
    @media (max-width: $breakpoint-small) {
      padding: 50px 10px;
    }
  
    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 50vh 0;
      
      &:first-child {
        margin: calc(50vh - 220px) 0;
      }

      &:last-child {
        margin: 0;
        margin-top: 50vh;
      }

      &:nth-child(2n) {
        flex-direction: row-reverse;
      }

      @media (max-width: $breakpoint-small) {
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
      padding-left: 50px;

      @media (max-width: $breakpoint-small) {
        padding-left: 0px;
        margin-top: 20px;
      }
    }

    &__list-item-container {
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
        font-size: 0.8rem;
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
    &__list-item {
      display: flex;
      justify-content: center;
      padding: 0;
      max-width: 300px;

      &-container {
        position: relative;
        width: 100%;
        margin: 0 10px;
        background-color: #043468;
        border-radius: 5px;
        padding: 10px;
        padding-bottom: 50px;
        box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
          2px 2px 3px 0px rgb(94 93 102 / 10%);
        transition: box-shadow 0.15s ease-in-out;

        &:hover {
          box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
          2px 5px 10px 0px rgb(94 93 102 / 10%);
        }

        @media (max-width: $breakpoint-small) {
          margin-bottom: 3rem;
        }
      }
    }
    &__graphic {
      width: 100%;
      height: 167px;
      border-radius: 2.5px;
      margin-bottom: 0.69rem;
    }
    &__year {
      font-size: 0.875rem;
    }
    &__header {
      font-size: 1rem;
      font-weight: bolder;
    }
    &__source {
      position: absolute;
      bottom: 0;
      font-style: italic;
      font-size: 0.875rem;
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
    &__list-item {
      display: flex;
      justify-content: center;
      padding: 0;
      max-width: 300px;

      &-container {
        position: relative;
        width: 100%;
        margin: 0 10px;
        background-color: #043468;
        border-radius: 5px;
        padding: 10px;
        padding-top: 20px;
        box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
          2px 2px 3px 0px rgb(94 93 102 / 10%);
        transition: box-shadow 0.15s ease-in-out;

        &:hover {
          box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
          2px 5px 10px 0px rgb(94 93 102 / 10%);
        }
      }
    }
    &__download-button {
      position: absolute;
      top: 15px;
      right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      width: 30px;
      height: 30px;
      border-radius: 15px;

      &__icon {
        width: 12px;
        height: 12px;
      }
    }
    &__header {
      font-size: 1rem;
      font-weight: bolder;
      margin-bottom: 30px;
    }
    &__description {
      font-size: 0.875rem;
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
    }
  }

  .contribute-your-talents {
    &__container {
      max-width: 50rem;
    }
    &__list-item-container {
      text-align: center;
      width: 12rem;
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
</style>
