<template>

  <div class="card">
      <div class="borders">
        <div class="test">
            <div class="h3">
                    <a v-bind:href="'/challenges/' + challenge.nid">
                        {{ challenge.title }}
                    </a>
            </div>
        </div>

        <div class="icon">
            <img :src="coverImage" />
        </div>
        
        <div class="test" >
            {{ challenge.abstract }}
            <div>
              Status: {{challenge.challenge_status}}
            </div>
            <div>
              Affiliation: {{ challenge.affiliation }}
            </div>
        </div>
      </div>
      
  </div>
  
  <!-- <div class="page-content card">
    <div class="container">
      <div class="row">
        <div class="col-sm order-1 order-sm-2">
          <h2>
            <a v-bind:href="'/challenges/' + challenge.nid">
              {{ challenge.title }}
            </a>
          </h2>
          <div class="col-sm-4 order-2 order-sm-1">
            <img :src="coverImage"/>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import SearchPanel from '@/components/Sidebar/SearchPanel.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import FetchMixin from '@/mixins/FetchMixin';

  import DefaultHero from '@/assets/home/hero-lab-default.png';

  @Component({
    components: {
      Pagination,
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
  }
  img {
      max-width:230px;
      max-height:130px;
      //display: inline-block;
      float:right;

  }

  .test{
      //display: inline-block;
      float:left;
      margin-top:3rem;
  }

  .borders{
      margin: 2rem;
  }
  // .icon{

  //   text-align: right;
  // }

  h2 {
    line-height: 4rem;
    font-size: 2rem;
    font-weight: bold;
  }

  .anchor-link {
    display: block;
    position: relative;
    top: -120px;
    visibility: hidden;
  }
  .card{
      margin-top: 2rem;
  }
</style>
