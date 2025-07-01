<template>
  <EternaPage title="">
    <HeroSection
      backgroundImage="@/assets/home/hero-eternacon-2025.png"
      registerLink="https://stanford.zoom.us/meeting/register/K_oWVyeSQ1KsgCFsbnEy8Q#/registration"
    >
      Tune in on July 26-27 to exciting talks and activities from Eterna researchers, developers,
      players, and other world-class experts.
    </HeroSection>
    <ConferenceAreasSection />
    <section>
      <h3 class="mt-2">Attendance</h3>
      <p>
        Attending Eternacon 2025 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. To attend,
        <a href="https://stanford.zoom.us/meeting/register/K_oWVyeSQ1KsgCFsbnEy8Q#/registration">preregister via Zoom</a>.
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
  import sessions from './speakers-2025.json';

  @Component({
    components: { EternaPage, HeroSection, ConferenceAreasSection, ScheduleSection, DropdownSidebarPanel },
  })
  export default class Eternacon2023 extends Vue {
    get options() {
      return options;
    };

    get sessions() {
      return sessions;
    }
  }
</script>
