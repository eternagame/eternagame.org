<template>
  <EternaPage title="">
    <HeroSection
      backgroundImage="@/assets/home/hero-eternacon-2026.png"
      registerLink="https://stanford.zoom.us/meeting/register/iOgkudCOSUmehaRl5HamUw"
    >
      Tune in on July 26 to exciting talks and activities from Eterna researchers, developers,
      players, and other world-class experts.
    </HeroSection>
    <ConferenceAreasSection />
    <section>
      <h3 class="mt-2">Attendance</h3>
      <p>
        Attending Eternacon 2026 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. To attend,
        <a href="https://stanford.zoom.us/meeting/register/iOgkudCOSUmehaRl5HamUw">preregister via Zoom</a>.
        You will receive a link by email unique to you that can be used to join the conference
        once it starts. Zoom comments will be available to interact with presenters, as well as
        opportunities to join with your voice and video.
      </p>
      <p>
        Additional questions? Contact <a href="mailto:events@eternagame.org">events@eternagame.org</a>.
      </p>
    </section>
    <ScheduleSection :sessions="sessions" />
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
  import DropdownSidebarPanel from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import HeroSection from './components/HeroSection.vue';
  import ConferenceAreasSection from './components/ConferenceAreasSection.vue';
  import ScheduleSection from './components/ScheduleSection.vue';
  import { options } from './AboutEternacon.vue';
  import sessions from './speakers-2026.json';

  @Component({
    components: { EternaPage, HeroSection, ConferenceAreasSection, ScheduleSection, DropdownSidebarPanel },
  })
  export default class Eternacon2026 extends Vue {
    get options() {
      return options;
    };

    get sessions() {
      return sessions;
    }
  }
</script>
