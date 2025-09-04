<template>
  <EternaPage>
    <div class="overview">
      <h2 class="overview-title">
        Eterna is a citizen science game that recruits players to design RNA molecules for
        biomedical research.
      </h2>
      <h3 class="overview-subtitle text-muted">
        Help Eterna invent medicine. Make a donation today.
      </h3>
    </div>
    <div class="details">
      <p>
        Eterna's citizen scientists invent medicine thanks to financial support from the public.
        You can help Eterna continue its work, and tackle new diseases, by making a gift:
      </p>
      <ul class="row align-items-stretch" style="list-style: none; padding: 0;">
        <li class="col-md-6 px-md-2 my-md-0 my-2">
          <div class="card p-4 h-100 justify-content-center">
            <p>
              Make a personal, tax-deductible donation to <a href="https://frameshifter.org">Frameshifter</a> (a program of the 501c3 <a href="https://superbloom.design">Superbloom Design</a>),
              the organization that maintains Eterna.
            </p>
            <a class="btn btn-primary" href="https://www.every.org/frameshifter?theme_color=f16413&utm_campaign=frameshifter-nav#/donate" target="_blank">Visit Every.org</a>
          </div>
        </li>
        <li class="col-md-6 px-md-2 my-md-0 my-2">
          <div class="card p-4 h-100 justify-content-center">
            <p>
              We are seeking funding for sustained projects targeting specific viral infections, cancer, or other diseases.
              If you wish to support such work through a large gift, please get in touch.
            </p>
            <a class="btn btn-primary mb-2" href="mailto:rhiju@eternagame.org">Contact Eterna's principal investigator</a>
          </div>
        </li>
      </ul>
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
  export default class Donate extends Vue {
  }
</script>

<style scoped lang="scss">
  .overview {
    max-width: 820px;
    margin: 2rem auto;
  }

  .overview-title {
    font-size: 1.9rem;
    line-height: 2.5rem;
  }

  .overview-subtitle {
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: normal;
  }

  h2 {
    line-height: 4rem;
    font-size: 2rem;
    font-weight: bold;
  }

  .details {
    max-width: 820px;
    margin: auto;
  }
</style>
