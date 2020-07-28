<template>
  <EternaPage title="">
    <section class="hero">
      <img src="~@/assets/home/hero-eternacon-2020.png" class="bg" />
      <div class="hero-description">
        <h2>Learn. Play. <i>Connect</i>.</h2>

        <p class="explain">
          Tune in on July 25-26 to exciting talks and activities from Eterna researchers, developers,
          players, and other world-class experts.
        </p>
        <b-button
          class="button mt-3"
          variant="primary"
          size="lg"
          href="https://stanford.zoom.us/webinar/register/WN_papHzTJQRs2_-u0U_yhYIw"
        >
          Register
        </b-button>
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
        Attending Eternacon 2020 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. To attend,
        <a href="https://stanford.zoom.us/webinar/register/WN_papHzTJQRs2_-u0U_yhYIw">preregister for
        the Zoom webinar</a>. You will recieve a link by email unique to you that can be used to join the conference
        once it starts. Zoom Q&amp;A and comments will be available to interact with presenters, as well as potential
        opportunities to be approved to join with your voice and video if we feel greater interaction is beneficial to
        discussion.
      </p>
      <p>
        Additionally, we encourage you to <a href="https://discord.gg/KYeTwux">join our Discord server</a>
        to interact with presenters and other attendees during breaks using text, voice, and video chat.
        We will also be <a href="https://twitch.tv/eternagame">streaming on our Twitch</a> for added entertainment!
      </p>
      <p>
        Additional questions? Contact <a href="mailto:events@eternagame.org">events@eternagame.org</a>.
      </p>
    </section>
    <section class="schedule">
      <h3>Schedule</h3>
      <template v-for="(sessions, day) in speakers">
        <h4 :key="day">{{day}}</h4>
        <ul :key="day">
          <template v-for="session in sessions">
            <li :key="`${session.topic}-${session.time}`" class="row">
              <div class="col-sm-3">
                <div class="session-time">{{session.time}}</div>
                <div class="font-weight-bold">{{session.speaker}}</div>
                <div class="text-muted">{{session.affiliation}}</div>
              </div>
              <b-card class="col-sm-9" v-if="session.topic !== 'Break'">
                <h5>{{session.topic}}</h5>
                <p v-dompurify-html="session.abstract" v-if="session.abstract"></p>
              </b-card>
              <div class="col-sm-9 text-center" v-else>
                <h5 class="d-inline m-0">Break</h5> - join us on
                <a href="https://discord.gg/KYeTwux">Discord</a> and <a href="https://twitch.tv/eternagame">Twitch</a>!
              </div>
            </li>
          </template>
        </ul>
      </template>
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
  import logo from '@/assets/about/logo_eternacon.svg';
  import bgImage from '@/assets/home/hero-blue-bg.png';
  import { options } from './AboutEternacon.vue'; 
  import speakers from './speakers-2020.json';

  @Component({
    components: { EternaPage, DropdownSidebarPanel },
  })
  export default class Eternacon2020 extends Vue {
    get speakers() {
      return speakers;
    }

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

    p {
      margin: 0;
    }
  }
</style>
