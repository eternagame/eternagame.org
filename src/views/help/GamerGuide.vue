<template>
  <EternaPage :title="$t('help:gamer-guide-title')" >
    <div class="card">
        <div class="margins">
        <h4>
            Created by Andrew Murphy from Keystone Research Solutions, LLC
        </h4>
        <p>
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
        <p>
            <a href="https://www.patreon.com/bePatron?u=32165177">
                Please reward the guide’s production and encourage further such offerings by becoming a patron through Patreon.
            </a>
        </p>
        <p>
            <a href="https://www.keystone-research-solutions.com/fileadmin/Item/9ee14794-9f0b-42de-9f2d-56428a53d965/A_Gamers_Guide_to_Eterna.pdf">
                A Gamer's Guide to Eterna
            </a>
            3 MB
        </p>
        </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: {
      EternaPage,
    },
  })
  export default class GamerGuide extends Vue {

  }
</script>
<style lang="scss" scoped>
  @import '@/styles/_variables.scss';
    
    .margins{
        margin: 1rem;
    }
  
</style>
