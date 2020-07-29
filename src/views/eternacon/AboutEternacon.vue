<template>
  <EternaPage title="">
    <section class="hero">
      <img src="~@/assets/home/hero-blue-bg.png" class="bg" />
      <div class="logowrap">
        <img src="@/assets/about/logo_eternacon.svg" class="logo" />
      </div>
      <div class="hero-description">
        <h2>Learn. Play. <i>Connect</i>.</h2>

        <p class="explain">
          Talks and activities from Eterna researchers, developers, players, and other world-class experts.
        </p>
      </div>
    </section>
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
         in prior years, we are actively seeking partnerships with commercial and other organizations to sponsor
         Eternacon each year to provide funding for facilities, materials, and player support. In return, we are working
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

  export const options: Option[] = [
    { value: '2020', text: 'side-panel-options:eternacon-2020', link: '/eternacon/2020' },
    { value: 'about', text: 'side-panel-options:about-eternacon', link: '/eternacon/about' },
  ];

  @Component({
    components: { EternaPage, DropdownSidebarPanel },
  })
  export default class AboutEternacon extends Vue {
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
</style>
