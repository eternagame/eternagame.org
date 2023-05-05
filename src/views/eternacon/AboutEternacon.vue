<template>
  <EternaPage title="">
    <HeroSection>
      Talks and activities from Eterna researchers, developers, players, and other world-class experts.
    </HeroSection>
    <section>
      <h3 class="mt-2">What is Eternacon?</h3>
      <p>
        First hosted at Stanford University in 2015, Eternacon is a gathering of Eterna players, scientists,
        developers, and other experts in fields important to Eterna. Originally only a dream among players as an
        "Eterna Convention", Eternacon was fully realized by tomoedachii and vineetkosaraju, who put together a plan
        that would allow for the first conference in 2015. In the past, the conference has included many different
        talks by participants about puzzle solving, scientific advancements, the community, and the future of Eterna
        as a whole, a tour of the lab, open discussion about the current state of eterna with the oppotrunity to make
        suggestions to the team, and the chance to get to know fellow Eterna players.
      </p>
    </section>
    <section>
      <h3 class="mt-2">Donate</h3>
      <p>
        To make a donation to Eternacon to help pay for administrative costs and player support you can do so at the
        Stanford donation portal for Eterna. When making the donation specify in the special instructions that the
        donation is for Eternacon (or if you want to support Eterna as a whole, you can do that too!). If you wish to
        donate using other methods please contact <a href="mailto:events@eternagame.org">events@eternagame.org</a>.
      </p>
    </section>
    <section>
      <h3 class="mt-2">Sponsor</h3>
      <p>
         We are actively seeking partnerships with commercial and other organizations to sponsor Eternacon each year to
         provide funding for facilities, materials, and player support. In return, we are working
         on developing various mechanisms for sponsors to be recognized. Please contact
         <a href="mailto:events@eternagame.org">events@eternagame.org</a> for more information.
      </p>
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
  import HeroSection from './components/HeroSection.vue';

  export const options: Option[] = [
    { value: 'about', text: 'side-panel-options:about-eternacon', link: '/eternacon/about' },
    { value: '2023', text: 'side-panel-options:eternacon-2023', link: '/eternacon/2023' },
    { value: '2022', text: 'side-panel-options:eternacon-2022', link: '/eternacon/2022' },
    { value: '2021', text: 'side-panel-options:eternacon-2021', link: '/eternacon/2021' },
    { value: '2020', text: 'side-panel-options:eternacon-2020', link: '/eternacon/2020' },
    { value: '2019', text: 'side-panel-options:eternacon-2019', link: '/eternacon/2019' },
  ];

  @Component({
    components: { EternaPage, HeroSection, DropdownSidebarPanel },
  })
  export default class AboutEternacon extends Vue {
    get options() {
      return options;
    };
  }
</script>
