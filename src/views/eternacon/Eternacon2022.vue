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
    <section class="schedule">
      <h3>Speakers</h3>
      <p>Full schedule will be released in July</p>
      <h4>Saturday</h4>
      <ul>
        <li>Hannah Wayment-Steele, Harvard, OpenVaccine summary</li>
        <li>David Resnik, NIH, Ethics in Citizen Science</li>
        <li>whbob/amybarish, Player tools</li>
        <li>Antje Kruger, Northwestern, OpenRibosome</li>
        <li>Karmen Williams, CUNY, Diversity panel with player Akira</li>
        <li>lroppy, Eterna Players Alliance</li>
        <li>Astromon, Eternacon puzzle</li>
      </ul>
      <h4>Sunday</h4>
      <ul>
        <li>Sarah Smaga, UC-Berkeley, C-GEM and Eterna3D</li>
        <li>Slava Butkovich, Chimera tutorial</li>
        <li>Rachael Kretsch, Stanford, Tertiary structures</li>
        <li>Janet Iwasa, University of Utah, Animating Molecular Machines</li>
        <li>Eterna developers, EternaNext</li>
        <li>Jennifer Pearl, Pairing probabilities</li>
        <li>Astromon, Art show</li>
        <li>AndrewKae, Paste bin fun</li>
      </ul>
      <h4>Want to present?</h4>
      <p>Get in touch at <a href="mailto:events@eternagame.org">events@eternagame.org</a></p>
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
