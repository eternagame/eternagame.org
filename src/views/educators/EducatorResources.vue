<template>
  <EternaPage title="Educator Resources">
    <p class="overview-subtitle text-muted">
      Eterna conveys RNA structure and behavior through gameplay, allowing students to
      interactively explore, intuit, and engage with biochemistry concepts and even take
      the next step to directly contribute to cutting edge research.
    </p>
    <p class="overview-subsubtitle">
      Building on over ten years of development of the Eterna citizen science game at Stanford
      University, Carnegie Mellon University, and other institutions, Eterna and its partners
      have created a range of resources for teaching RNA biochemistry and integrating Eterna
      into the classroom.
    </p>
    <b-row>
      <b-col md="4" class="resource-card">
        <b-card
          :img-src="thumbNova"
          img-alt=""
          img-top
        >
          <h3>NOVA RNA VirtuaLab</h3>
          <p>
            Learn about RNA vaccines and viruses in a crash course on RNA biology designed for
            middle and high school students
          </p>
          <b-btn variant="primary" href="https://www.pbs.org/wgbh/nova/labs/lab/rna/" target="_blank">Experience the VirtuaLab</b-btn>
        </b-card>
      </b-col>
      <b-col md="4" class="resource-card">
        <b-card
          :img-src="thumbCoursera"
          img-alt=""
          img-top
        >
          <h3>RNA Biology with Eterna</h3>
          <p>
            A college-level in-depth introduction to RNA biology, its role in cell growth and development,
            and its uses in medicine and bioengineering
          </p>
          <!--b-btn variant="primary" href="https://coursera.org/learn/rna-biology" target="_blank">Visit the course</!--b-btn-->
          <b-btn variant="primary" class="disabled" href="#">Coming Soon</b-btn>
        </b-card>
      </b-col>
      <b-col md="4" class="resource-card">
        <b-card
          :img-src="thumbClassroom"
          img-alt=""
          img-top
        >
          <h3>Citizen Science with Eterna in the Classroom</h3>
          <p>
            Instructions for educators who want to engage their students in the Eterna citizen science
            platform directly without curriculum
          </p>
          <b-btn variant="primary" href="https://docs.google.com/document/d/1qWW0SU42KNcRBv6xiklODl_5w1VYIovioS6KeWpFGH0/edit?usp=sharing" target="_blank">View guide</b-btn>
        </b-card>
      </b-col>
    </b-row>

    <div class="outreach-kit">
      <div>
        <p>Also check out the materials that are part of our outreach kit!</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSey1YsthmQvH31HvhhIcbb2j7skJFF17KRv7g-S8bIeGy6dpg/viewform
  " target="_blank" style="text-decoration: underline;">Request Access</a>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import thumbClassroom from '@/assets/about/thumb-classroom.png';
  import thumbCoursera from '@/assets/about/thumb-coursera.png';
  import thumbNova from '@/assets/about/thumb-nova.png';

  @Component({
    components: {
      EternaPage
    }
  })
  export default class EducatorResources extends Vue {
    get thumbClassroom() {
      return thumbClassroom;
    }

    get thumbCoursera() {
      return thumbCoursera;
    }

    get thumbNova() {
      return thumbNova;
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
    margin-top: 20px;

    div {
      max-width: 700px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      p {
        margin: 0;
        margin-right: 10px;
      }
    }
  }
</style>
