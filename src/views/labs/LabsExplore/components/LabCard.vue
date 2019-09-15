<template>
  <b-card style="height: 100%" footer-bg-variant="med-dark-blue">
    <div class="d-flex flex-column justify-content-between" style="height: 100%;">
      <!-- <div> -->
      <div class="lab-card-title">
        <b>{{lab.title}}</b>
      </div>
      <router-link :to="labUrl">
        <b-img :src="lab.cover_image || '/puzzle-progression/badges/default-eterna-badge.png'"
          small fluid-grow class="mb-3"/>
      </router-link>
      <!-- </div> -->
      <div class="d-flex justify-content-center">
        <b-button size="sm" variant="primary" :to="labUrl" style="width: 30%;">Enter</b-button>
      </div>
    </div>
  </b-card>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { LabCardData } from '../types';

  @Component({
    components: {
    },
  })
  export default class LabCard extends Vue {
    @Prop() private lab!: LabCardData;

    get labUrl() {
      return `/lab/${this.lab.nid}`;
    }
  }
</script>

<style lang="scss" scoped>
  .lab-card-title {
    height: 70px;
  }
</style>
