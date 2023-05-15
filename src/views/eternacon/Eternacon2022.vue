<template>
  <EternaPage title="">
    <HeroSection
      backgroundImage="@/assets/home/hero-eternacon-2022.jpg"
      registerLink="https://stanford.zoom.us/meeting/register/tJMtceGoqj4oGdOhGq-MbBqI3gKfOJUCIqC_"
    >
      Tune in on July 23-24 to exciting talks and activities from Eterna researchers, developers,
      players, and other world-class experts.
    </HeroSection>
    <ConferenceAreasSection />
    <section>
      <h3 class="mt-2">Attendance</h3>
      <p>
        Attending Eternacon 2022 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. To attend,
        <a href="https://stanford.zoom.us/meeting/register/tJMtceGoqj4oGdOhGq-MbBqI3gKfOJUCIqC_">preregister via Zoom</a>.
        You will receive a link by email unique to you that can be used to join the conference
        once it starts. Zoom comments will be available to interact with presenters, as well as potential
        opportunities to be approved to join with your voice and video if we feel greater interaction is beneficial to
        discussion.
      </p>
      <p>
        Additional questions? Contact <a href="mailto:events@eternagame.org">events@eternagame.org</a>.
      </p>
    </section>
    <ScheduleSection :sessions="sessions" >
      <template v-slot:break>
       <p>Check out our <a href="https://www.twitch.tv/eternagame">Twitch Stream</a> while you wait!</p>
      </template>
    </ScheduleSection>
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
  import sessions from './speakers-2022.json';

  @Component({
    components: { EternaPage, HeroSection, ConferenceAreasSection, ScheduleSection, DropdownSidebarPanel },
  })
  export default class Eternacon2022 extends Vue {
    get sessions() {
      return sessions;
    }

    get options() {
      return options;
    };
  }
</script>
