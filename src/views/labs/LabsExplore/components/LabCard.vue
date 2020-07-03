<template>
  <router-link :to="labUrl">
    <AspectRatioCard class="overall">
      <template #header>
        <div class="lab-card-title">
          <b>{{ lab.title }}</b>
        </div>
      </template>
      <b-img class="image" :src="image" />
      <template #footer>
        <div class="lab-card-footer d-flex">
          <div
            class="status-indicator mr-2 mt-1"
            :style="{ 'background-color': labStatusColor }"
          ></div>
          <p>{{ labStatus }}</p>
        </div>
      </template>
    </AspectRatioCard>
  </router-link>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AspectRatioCard from '@/components/Cards/AspectRatioCard.vue';
  import DefaultHero from '@/assets/home/hero-lab-default.png';
  import { LabCardData } from '../types';

  @Component({
    components: {
      AspectRatioCard,
    },
  })
  export default class LabCard extends Vue {
    @Prop({ required: true }) readonly lab!: LabCardData;

    get labUrl() {
      return `/labs/${this.lab.nid}`;
    }

    get labStatus() {
      if (!this.lab.exp_phase) {
        return this.$t('lab-card:status-5');
      }
      return this.$t(`lab-card:status-${this.lab.exp_phase}`);
    }

    // TODO: Use SCSS constant colors instead of hardcoded HTML colors
    get labStatusColor() {
      switch (this.lab.exp_phase) {
        case '1':
          return 'lime';
        case '2':
          return 'yellow';
        case '3':
          return 'purple';
        case '4':
          return 'blue';
        case '5':
        default:
          return 'red';
      }
    }

    get image() {
      return this.lab?.banner_image || this.lab.cover_image || DefaultHero;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .overall {
    transition: 0.3s ease;
    color: $white;
  }
  .overall:hover {
    border: 1px solid gold;
  }
  .overall:active {
    color: $yellow;
  }

  ::v-deep .scalable-container {
    margin: 0 -20px;
    margin-top: 6px;
    background-color: $black;
    width: calc(100% + 40px);
  }

  .status-indicator {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lab-card-title {
    height: 4rem;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  .lab-card-footer {
    margin: 0;
    margin-top: 0.5rem;
    margin-bottom: -1.5rem;

    font-weight: bold;
    line-height: 1rem;
    font-size: 0.7rem;
  }
</style>
