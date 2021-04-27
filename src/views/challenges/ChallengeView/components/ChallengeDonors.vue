<template>
  <div>
    <div class="donors-container">
      <h4 class="header">
        Challenge Donors
      </h4>
      <div class="donors">
        <div
          v-for="(donor, i) in getDonors()"
          :key="i"
          class="donor"
        >
          <img :src="donor.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';

  @Component({
    components: {},
  })
  export default class ChallengeDonors extends Vue {
    @Prop({ required: true }) readonly challenge!: ChallengeData;

    donors: object[] = [];

    mounted() {
      this.donors = JSON.parse(this.challenge.donors);
    }

    getDonors() {
      return this.donors;
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/global.scss';

  .header {
    margin: 3rem 0;
  }

  .donors-container {

  }

  .donor {
    display: inline-block;
    margin: 0 1rem;

    &:first-child {
      margin-left: 0;
    }
  }
</style>
