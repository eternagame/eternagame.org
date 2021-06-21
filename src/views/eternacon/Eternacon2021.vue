<template>
  <EternaPage title="">
    <section class="hero">
      <img src="~@/assets/home/hero-blue-bg.png" class="bg" />
      <div class="logowrap">
        <img src="@/assets/about/logo_eternacon.svg" class="logo" />
      </div>
      <div class="hero-description">
        <h2>Learn. Play. <i>Connect</i>.</h2>

        <p class="explain">
          Tune in on July 24-25 to exciting talks and activities from Eterna researchers, developers,
          players, and other world-class experts.
        </p>
      </div>
    </section>
    <section class="row conference-areas">
      <div class="col-md-3 col-sm-6">
        <b-card>
          <img src="~@/assets/about/icon_about_2.png" />
          <p>Research</p>
        </b-card>
      </div>
      <div class="col-md-3 col-sm-6">
        <b-card>
          <img src="~@/assets/about/icon_about_1.png" />
          <p>Gameplay</p>
        </b-card>
      </div>
      <div class="col-md-3 col-sm-6">
        <b-card>
          <img src="~@/assets/about/about-section-4-3.png" />
          <p>Development</p>
        </b-card>
      </div>
      <div class="col-md-3 col-sm-6">
        <b-card>
          <img src="~@/assets/about/about-community.svg" />
          <p>Community</p>
        </b-card>
      </div>
    </section>
    <section>
      <h3 class="mt-2">Attendance</h3>
      <p>
        Attending Eternacon 2021 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. Webinar registration information will be made available closer to the event.
      </p>
      <p>
        Additional questions? Contact <a href="mailto:events@eternagame.org">events@eternagame.org</a>.
      </p>
    </section>
    <section class="schedule">
      <h3>Schedule</h3>
      <p>TBA - want to present? <a href="https://forms.gle/RifWTEzYjzPV2tRQ6">Let us know!</a></p>
    </section>
    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        :defaultIndex="-1"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import { options } from './AboutEternacon.vue'; 

  @Component({
    components: { EternaPage, DropdownSidebarPanel },
  })
  export default class Eternacon2020 extends Vue {
    get options() {
      return options;
    };
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  
  .hero {
    height: 350px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .logowrap {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      padding: 2rem;
    }

    .logo {
      position: relative;
      top: -3rem;
    }

    .bg {
      object-fit: cover;
    }
  }

  .hero::after {
    z-index: 1;
    display: block;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(0, 0, 0, 0.6) 70%,
      rgba(0, 0, 0, 0.9) 100%
    );
    margin-top: -400px;
    height: 400px;
    width: 100%;
    content: '';
  }

  .hero-description {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2rem;
    z-index: 2;
  }

  .explain {
    max-width: 482px;
    margin: 0;
  }

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

  .schedule ul {
    padding: 0;

    li {
      margin: .5rem 0;
    }

    li > * {
      padding: .5rem;
      height: min-content;
    }

    .session-time {
      color: $yellow;
    }

    .video-info {
      color: $yellow;
      font-weight: bold;
    }

    p {
      margin: 0;
    }
  }
</style>
