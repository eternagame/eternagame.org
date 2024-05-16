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
      <b-col md="4" class="resource-card">
        <b-card
          :img-src="thumbOutreach"
          img-alt=""
          img-top
        >
          <h3>Strengthen the Outreach Component of your Proposal by Collaborating with Eterna</h3>
          <p>
            Many funding agencies, such as the National Science Foundation, encourage 
            grantees to integrate their research with public engagement activities.
            Collaborating with Eterna on a RNA folding puzzle allows the general public 
            to participate in your RNA research and may be viewed favorably by funders 
            and by proposal reviewers.
          </p>
          <b-btn variant="primary" href="mailto:communications@eternagame.org" target="_blank">Contact Us</b-btn>
        </b-card>
      </b-col>
      <b-col md="4" class="resource-card">
        <b-card
          :img-src="thumbCoursera"
          img-alt=""
          img-top
        >
          <h3>Teach RNA Biology with Puzzles Using Eterna's Free Online Course</h3>
          <p>
            The RNA Biology with Eterna course available on Coursera.org consists of two 
            modules introducing RNA structure and the central dogma. Animations and 
            interactive Eterna puzzles illustrate key concepts, and students can earn a 
            certificate upon completion. The two-week series is intended for an undergraduate 
            biology or biochemistry course.
          </p>
          <b-btn variant="primary" href="https://coursera.org/learn/rna-biology" target="_blank">View Course</b-btn>
        </b-card>
      </b-col>
      <b-col md="4" class="resource-card">
        <b-card
          :img-src="thumbCommunity"
          img-alt=""
          img-top
        >
          <h3>Bring Eterna to Your Community with Free Educational Resources</h3>
          <p>
            We have (almost) everything you need to bring Eterna into your community. A demo 
            version of the game which runs without wifi is available to load on a tablet and 
            display at local science festivals as a STEM outreach event for your lab. Our website 
            also provides sample posters, stickers, and a 3D file of a real RNA structure which you 
            can print using a 3D printer.
          </p>
          <b-btn variant="primary" href="https://docs.google.com/forms/d/e/1FAIpQLSey1YsthmQvH31HvhhIcbb2j7skJFF17KRv7g-S8bIeGy6dpg/viewform" target="_blank">Request Access</b-btn>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <h4 class="h3 my-3" style="text-align: center; width: 100%;">Our Impact</h4>
      <div class="card-deck impact">
        <div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-tech.jpg" alt="">
          <div class="card-body">
            <h5>Technology</h5>
            <p>Players and researchers have created design tools, predictive AI models, large data sets, and DNA template libraries. All technologies are freely available for non-commercial use, and commercial licenses support Eterna's ongoing research.</p>
            <router-link to="/tech">Learn more</router-link>
          </div>
        </div>
        <div class="card">
          <img class="card-img-top" src="@/assets/front-page/img/thumb-pubs.jpg" alt="">
          <div class="card-body">
            <h5>Publications</h5>
            <p>Eterna players have contributed to over 30 scientific publications, including as lead authors, in journals such as <cite>Nature Communications</cite>, <cite>PLOS Computational Biology</cite>, and <cite>Proceedings of the National Academy of Sciences</cite>.</p>
            <router-link to="/publications">Learn more</router-link>
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
  import thumbCoursera from '@/assets/about/researchers-thumb-coursera.png';
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

    get thumbCoursera() {
      return thumbCoursera;
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
</style>
