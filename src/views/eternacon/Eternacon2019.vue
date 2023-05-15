<template>
  <EternaPage title="">
    <HeroSection>
      Tune in on July 19-20 to exciting talks and activities from Eterna researchers, developers,
      players, and other world-class experts.
    </HeroSection>
    <ConferenceAreasSection />
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
  import ScheduleSection from './components/ScheduleSection.vue';
  import ConferenceAreasSection from './components/ConferenceAreasSection.vue';
  import { options } from './AboutEternacon.vue';
  import sessions from './speakers-2019.json';

  @Component({
    components: { EternaPage, HeroSection, ScheduleSection, ConferenceAreasSection, DropdownSidebarPanel },
  })
  export default class Eternacon2019 extends Vue {
    get sessions() {
      return sessions;
    }

    get options() {
      return options;
    };
  }
</script>
