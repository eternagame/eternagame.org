<template>
  <EternaPage>
    
    <div>
        <h2>
          {{$t('help:gamer-guide-title')}}
        </h2>
        <p style="font-size: 1.4rem; margin-top: 1rem;">
            Over a hundred thousand people have played Eterna. The idea that a nonscience person can contribute to front line science by creatively solving puzzles is alluring. Think of the joy and satisfaction of doing something worthwhile while doing something fun.
        </p>
        <p>
            In A Gamer’s Guide to Eterna, Andrew Murphy writes for the new player. The guide lays out game mechanics, basic game play, tactics and scenarios, and a path to mastery. It details how to identify and solve the motifs that are basic features in the puzzles. It serves as both a practical skill builder and a return-to reference.
        </p>
        <p>
            Drawing on six years of experience in guiding high school students through Eterna, Murphy starts the guide with a metaphor for the game pieces. The metaphor appears consistently through the main body of the guide, alongside community terminology, to help the reader become a more effective player. Two appendices connect the reader to the broader science and art that make a stimulating and wondrous setting for the game.
        </p>
        <p>
            We are happy to offer A Gamer’s Guide to Eterna to the community.
        </p>
          Created by Andrew Murphy from Keystone Research Solutions, LLC
        <p>
            <a href="https://www.patreon.com/bePatron?u=32165177">
                Please reward the guide’s production and encourage further such offerings by becoming a patron through Patreon.
            </a>
        </p>
        <p>
            <b-btn
                type="button"
                class="support-container-button mr-3 mt-3 mb-3"
                href="https://www.keystone-research-solutions.com/fileadmin/Item/9ee14794-9f0b-42de-9f2d-56428a53d965/A_Gamers_Guide_to_Eterna.pdf"
              >
                A Gamer's Guide to Eterna
              </b-btn>
            3 MB
        </p>
    </div>
    <template #sidebar="{ isInSidebar }">
      <SearchPanel :isInSidebar="isInSidebar" /> 
      <a href="https://www.keystone-research-solutions.com/fileadmin/Item/9ee14794-9f0b-42de-9f2d-56428a53d965/A_Gamers_Guide_to_Eterna.pdf">
                <img src="@/assets/help/gamer_guide_cover.svg" />
      </a>
    </template>
    
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';


  @Component({
    components: {
      EternaPage,
      SidebarPanel,
    },
  })
  export default class GamerGuide extends Vue {

  }
</script>
<style lang="scss" scoped>
  @import '@/styles/_variables.scss';
    
  img{
    height: 100%;
    width: 100%;
    object-fit: contain;
    filter: drop-shadow(.5rem .5rem rgba(0, 0, 0, 0.472));
  }

  .body {
    margin-top: 10px;
  }
  .format{
    flex-direction: row-reverse;
  }
  .panel {
    padding-top: 43px;
    margin-bottom: 40px;
    width: 100%;
    .sidebar-panel-header {
      width: 100%;
    }
  }

  .toggler {
    display: inline-block;
    margin: auto 7.5px;
    font-size: 15px;
    cursor: pointer;
  }

  .sidebar-panel-header {
    color: var(--med-blue);
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .header-icon {
    margin-right: 3.75px;
    margin-left: 3.75px;
    height: 1.125em;
    vertical-align: middle;
    display: inline-block;
  }

  hr {
    border-top-color: var(--med-blue);
    margin-top: 5px;
    margin-bottom: 0px;
  }
</style>
