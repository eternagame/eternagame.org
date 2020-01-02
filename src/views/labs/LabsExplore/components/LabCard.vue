<template>
  <AspectRatioCard>
    <template #header>
      <div class="lab-card-title">
        <b>{{lab.title}}</b>
      </div>
    </template>
    <router-link :to="labUrl">
      <b-img :src="lab.cover_image || '/puzzle-progression/badges/default-eterna-badge.png'"
        small fluid-grow class="mb-3 image scalable"/>
    </router-link>
  </AspectRatioCard>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { LabCardData } from '../types';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';

  @Component({
    components: {
      AspectRatioCard,
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
