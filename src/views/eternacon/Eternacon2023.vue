<template>
  <EternaPage title="">
    <HeroSection
      backgroundImage="@/assets/home/hero-eternacon-2023.jpg"
      registerLink="https://stanford.zoom.us/meeting/register/tJAkfu-vrDgoEtDThU1H5SpJoxDjRFEV5EOX"
    >
      Tune in on July 22-23 to exciting talks and activities from Eterna researchers, developers,
      players, and other world-class experts.
    </HeroSection>
    <ConferenceAreasSection />
    <section>
      <h3 class="mt-2">Attendance</h3>
      <p>
        Attending Eternacon 2023 is <strong>free</strong>, <strong>open to everyone</strong>, and
        <strong>online</strong>. To attend,
        <a href="https://stanford.zoom.us/meeting/register/tJAkfu-vrDgoEtDThU1H5SpJoxDjRFEV5EOX">preregister via Zoom</a>.
        You will receive a link by email unique to you that can be used to join the conference
        once it starts. Zoom comments will be available to interact with presenters, as well as
        opportunities to join with your voice and video.
      </p>
      <p>
        Additional questions? Contact <a href="mailto:events@eternagame.org">events@eternagame.org</a>.
      </p>
    </section>
    <section>
      <h3>Schedule</h3>
      <p>
        Sessions are expected to be running from 9AM through 4PM PT Saturday and Sunday.
        A full schedule will be available soon.
      </p>
      <p>
        Presentations will include:
      </p>
      <ul>
        <li>Seth Cooper (Northeastern) and Scott Horowitz (Denver), Foldit education modes</li>
        <li>Mark Vaughn (Capilano University), Using Eterna in a biochemistry course</li>
        <li>Katie Eichhorn (Nebraska), Using an Eterna puzzle in a laboratory course</li>
        <li>Quentin Vicens (Colorado), Pattern spotting in RNA structure</li>
        <li>Breakout rooms (EPA, scripts, labs)</li>
        <li>Astromon, Eterna puzzle race</li>
        <li>Victor Tse (UCSC), Designing ASO drugs for rare disease</li>
        <li>Blanton Tolbert (Case Western Reserve), Small molecule drug targets</li>
        <li>Momodou Camara (Nebraska), Structural dynamics in 7SK RNA central domain</li>
        <li>Ronald Lorenzo (PVAMU) and Karmen Williams (CUNY), Player survey results</li>
        <li>Christian Choe (Stanford), OpenTB update</li>
        <li>Arnuv, Eterna art show</li>
      </ul>
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
  import sessions from './speakers-2022.json';

  @Component({
    components: { EternaPage, HeroSection, ConferenceAreasSection, ScheduleSection, DropdownSidebarPanel },
  })
  export default class Eternacon2023 extends Vue {
    get sessions() {
      return sessions;
    }

    get options() {
      return options;
    };
  }
</script>
