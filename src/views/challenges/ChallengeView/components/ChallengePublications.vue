<template>
  <div>
    <div class="challenge-publications">
      <h4 class="header">
        Publications
      </h4>
      <div>
        <div
          v-for="(publication, i) in publications"
          :key="i"
          class="publication"
        >
          <div class="publication-image">
            <img src="@/assets/badge_openvaccine_100.png" />
          </div>
          <div class="publication-info">
            <h5 class="publication-title">
              {{ publication.title }}
            </h5>
            <p class="publication-details"><span class="publication-details-journal">{{ publication.journal }}</span> - {{ publication.pub_date }}</p>
            <p class="publication-overview">{{ publication.authors }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { LabData } from '@/views/labs/LabView/types';

  @Component({
    components: {},
  })
  export default class ChallengePublications extends Vue {
    @Prop({ required: true }) readonly challenge!: LabData;

    publications = [
      {
        title: "Theoretical basis for stabilizing messenger RNA through secondary structure design",
        journal: "bioRxiv",
        pub_date: "August 2020",
        authors: "Hannah K. Wayment-Steele, Do Soon Kim, Christian A. Choe, John J. Nicol, Roger Wellington-Oguri, R. Andres Parra Sperberg, Po-Ssu Huang, Eterna Participants, Rhiju Das"
      },
      {
        title: "RNA secondary structure packages ranked and improved by high- throughput experiments",
        journal: "bioRxiv",
        pub_date: "May 2020",
        authors: "Hannah K. Wayment-Steele, Wipapat Kladwang, Eterna Participants, Rhiju Das"
      },
      {
        title: "Evidence of an Unusual Poly(A) RNA Signature Detected by High-throughput Chemical Mapping",
        journal: "Biochemistry",
        pub_date: "May 2020",
        authors: "Roger Wellington-Oguri, Eli Fisker, Michelle Wiley, Mat Zada, Jill Townley, Eterna Players"
      }
    ];
  }
</script>

<style scoped lang="scss">
  .challenge-publications {
    border-bottom: 1px solid #14467d;
  }

  .header {
    margin-bottom: 2rem;
  }

  .publication {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2.5rem;

    &-image {
      text-align: center;
      flex-basis: 150px;
      flex-grow: 0;
      flex-shrink: 0;

      & > img {
        width: 100%;
      }
    }

    &-info {
      margin-left: 2rem;
    }

    &-title {
      font-size: 1rem;
      font-weight: 700;
    }

    &-details {
      font-size: 0.8rem;
      font-weight: 700;

      &-journal {
        color: #F39C12;
      }
    }

    &-overview {
      font-size: 0.8rem;
    }
  }
</style>
