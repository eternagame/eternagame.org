<template>

  <div class="card">
  <router-link :to="`/challenges/${challenge.nid}`">
      <div class="media row">
        <img :src="coverImage" alt=""/>
        <div class="media-body p-4">
          <h3 class="mt-0" style="font-weight: bold;">
            {{ challenge.title }}
          </h3>
          <hr style="border-top: 1px solid rgba(255, 255, 255, 0.4)" />
          <p style="font-size: 1rem;">
            {{ challenge.abstract }}
          </p>
          <p style="font-size: 1rem; font-weight: bold;">
            Status: {{ challenge.challenge_status }}
          </p>
          <p style="font-size: 1rem; font-weight: bold;">
            Affiliation: {{ challenge.affiliation }}
          </p>
        </div>
      </div>
      </router-link>
    </div>

</template>

<script lang="ts">
  import { Component, Prop, Mixins } from 'vue-property-decorator';
  import DropdownSidebarPanel from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';

  import DefaultHero from '@/assets/home/hero-lab-default.png';

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      SearchPanel,
      Preloader,
    },
  })

  export default class ChallengeCard extends Mixins(FetchMixin) {

    @Prop({required:true}) readonly challenge!: any;

    get coverImage() {
      return this.challenge?.cover_image || DefaultHero;
    }
  }
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';

  .overview-text {
    margin: 0.4rem 2rem;
    font-size: 1.1rem;
    font-style: italic;
  }

  a{
    color:white;
    text-decoration: none;
  }

  img {
      max-width:230px;
      max-height:400px;
      margin: auto;
      margin-left: 2rem;
  }
  .card{
    margin-top: 1rem;
    color: $white;
    transition: background-color 0.5s ease;
  }
  .card:hover {
  background-color: #21508c;
}
</style>
