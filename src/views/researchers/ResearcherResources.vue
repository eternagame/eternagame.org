<template>
  <EternaPage title="Use Eterna's Citizen Science Game in Your RNA Research for Broader Impact">
    <p class="overview-subtitle text-muted">
      Take your RNA research and outreach to the next level with Eterna.
    </p>
    <!-- <p class="overview-subsubtitle">
      Building on over ten years of development of the Eterna citizen science game at Stanford
      University, Carnegie Mellon University, and other institutions, Eterna and its partners
      have created a range of resources for teaching RNA biochemistry and integrating Eterna
      into the classroom.
    </p> -->
    <b-row>
      <b-card no-body class="overflow-hidden full-width-card">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="thumbOutreach" alt="Person playing the Eterna game on a laptop" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body>
              <h3>Access a Community of RNA Experts</h3>
              <b-card-text>
                Eterna players have outperformed traditional experts and algorithmic 
                approaches in many RNA design challenges across a wide range of 
                research areas. Collaborating with Eterna on an RNA folding puzzle 
                allows the general public to participate in your RNA research and may 
                be viewed favorably by funders, like the National Science Foundation. 
              </b-card-text>
              <b-btn variant="primary" href="mailto:communications@eternagame.org" target="_blank">Contact Us</b-btn>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-card no-body class="overflow-hidden full-width-card">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="thumbTechnology" alt="RNA structure renderings with degradation predictions" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body>
              <h3>Apply Cutting-Edge RNA Technologies</h3>
              <b-card-text>
                Eterna players and researchers have created novel design tools, predictive AI 
                models, large data sets, and DNA template libraries. All technologies are freely 
                available for non-commercial use, and commercial licenses support Eterna's 
                ongoing research.
              </b-card-text>
              <router-link to="/tech" >
                <b-btn variant="primary">See the Tools</b-btn>
              </router-link>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-card no-body class="overflow-hidden full-width-card">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="thumbCommunity" alt="Two people playing the Eterna game on a laptop" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body>
              <h3>Engage the Community in RNA Science</h3>
              <b-card-text>
                We have (almost) everything you need to bring Eterna into your community. 
                A demo version of the game which runs without wifi is available to load 
                on a tablet and display at local science festivals as a STEM outreach 
                event for your lab. Our website also provides sample posters, stickers, 
                and a 3D file of a real RNA structure which you can print using a 3D printer.
              </b-card-text>
              <b-btn variant="primary" href="https://docs.google.com/forms/d/e/1FAIpQLSey1YsthmQvH31HvhhIcbb2j7skJFF17KRv7g-S8bIeGy6dpg/viewform" target="_blank">Access Outreach Kit</b-btn>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-row>
    <b-row>
      <h4 class="h3 my-3" style="text-align: center; width: 100%;">Our Impact</h4>
      <div class="card-deck impact">
        <div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-pubs.jpg" alt="">
          <div class="card-body">
            <h5>Publications</h5>
            <p>Eterna players have contributed to over 30 scientific publications, including as lead authors, in journals such as <cite>Nature Communications</cite>, <cite>PLOS Computational Biology</cite>, and <cite>Proceedings of the National Academy of Sciences</cite>.</p>
            <router-link to="/publications">Learn more</router-link>
          </div>
        </div>
        <div class="card">
          <img class="card-img-top" src="@/assets/about/researchers-thumb-coursera.png" alt="">
          <div class="card-body">
            <h5>Education</h5>
            <p>
              Thousands of students have used the RNA Biology with Eterna course 
              available on Coursera.org to learn the fundamentals of RNA science. Animations and 
              interactive Eterna puzzles illustrate key concepts, and students can earn a 
              certificate upon completion. 
            </p>
            <a href="https://coursera.org/learn/rna-biology" target="_blank">Learn more</a>
          </div>
        </div>
        <div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-openvaccine.jpg" alt="">
          <div class="card-body">
            <h5>OpenVaccine</h5>
            <p>During the pandemic, the Eterna community created and published designs for a more stable mRNA vaccine for COVID-19 optimized for new variants. Eterna's open challenges address several important areas of RNA medicine.</p>
            <router-link to="/challenges/10845741">Learn more</router-link>
          </div>
        </div>
      </div>
    </b-row>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import thumbCommunity from '@/assets/about/researchers-thumb-community.jpg';
  import thumbTechnology from '@/assets/front-page/img/thumb-tech.jpg';
  import thumbOutreach from '@/assets/about/researchers-thumb-outreach.jpg';

  @Component({
    components: {
      EternaPage
    }
  })
  export default class ResearcherResources extends Vue {
    get thumbCommunity() {
      return thumbCommunity;
    }

    get thumbTechnology() {
      return thumbTechnology;
    }

    get thumbOutreach() {
      return thumbOutreach;
    }
  }
</script>

<style lang="scss" scoped>
  .overview-subtitle {
    font-size: 1.2rem;
    font-weight: normal;
  }

  .overview-subsubtitle {
    font-size: 1rem;
    font-weight: normal;
  }

  .resource-card {
    margin: 8px 0;

    .card {
      height: 100%;
    }

    h3 {
      font-size: 1.4rem;
      text-align: center;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .card-deck {
    margin: 0px 17px;
    justify-content: space-between;
  }

  .outreach-kit {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;

    p {
      text-align: center;
      margin-bottom: 0;
    }
  }

  .full-width-card {
    margin: 16px 32px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
