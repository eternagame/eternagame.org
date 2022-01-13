<template>
  <EternaPage title="">
    <HeroSection>
      Tune in on July 23-24 to exciting talks and activities from Eterna researchers, developers,
      players, and other world-class experts.
    </HeroSection>
    <ConferenceAreasSection />
    <section>
      <h3 class="mt-2">Attendance</h3>
      <p>
        Attending Eternacon 2022 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. Webinar registration information will be made available closer to the event.
      </p>
      <p>
        Additional questions? Contact <a href="mailto:events@eternagame.org">events@eternagame.org</a>.
      </p>
    </section>
    <section class="schedule">
      <h3>Schedule</h3>
      <p>TBA - want to present? Get in touch at <a href="mailto:events@eternagame.org">events@eternagame.org</a></p>
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
  import DropdownSidebarPanel from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import HeroSection from './components/HeroSection.vue';
  import ConferenceAreasSection from './components/ConferenceAreasSection.vue';
  import ScheduleSection from './components/ScheduleSection.vue';
  import { options } from './AboutEternacon.vue'; 

  @Component({
    components: { EternaPage, HeroSection, ConferenceAreasSection, ScheduleSection, DropdownSidebarPanel },
  })
  export default class Eternacon2020 extends Vue {
    get options() {
      return options;
    };
  }
</script>
