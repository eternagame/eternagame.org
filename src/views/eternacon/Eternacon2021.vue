<template>
  <EternaPage title="">
    <HeroSection registerLink="https://stanford.zoom.us/meeting/register/tJcvdumspjouGNHW_HAviA1ic_tuAvheeoTM">
      Tune in on July 24-25 to exciting talks and activities from Eterna researchers, developers,
      players, and other world-class experts.
    </HeroSection>
    <ConferenceAreasSection />
    <section>
      <h3 class="mt-2">Attendance</h3>
      <p>
        Attending Eternacon 2021 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. To attend,
        <a href="https://stanford.zoom.us/webinar/register/WN_papHzTJQRs2_-u0U_yhYIw">preregister via Zoom</a>.
        You will receive a link by email unique to you that can be used to join the conference
        once it starts. Zoom comments will be available to interact with presenters, as well as potential
        opportunities to be approved to join with your voice and video if we feel greater interaction is beneficial to
        discussion.
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
  import sessions from './speakers-2021.json';

  @Component({
    components: { EternaPage, HeroSection, ConferenceAreasSection, ScheduleSection, DropdownSidebarPanel },
  })
  export default class Eternacon2020 extends Vue {
    get sessions() {
      return sessions;
    }

    get options() {
      return options;
    };
  }
</script>
