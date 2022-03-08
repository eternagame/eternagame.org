<template>
  <BaseActivity :heading="heading" :slideTo="level">
    <SwiperSlide v-for="item in stages" :key="item.title">
      <CollectionCard v-bind="item" />
    </SwiperSlide>
  </BaseActivity>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import {RoadmapAchievement} from '@/types/common-types';
  import CollectionCard from '@/components/Cards/QuestCard.vue';
  import BaseActivity from './BaseActivity.vue';

  @Component({
    components: {
      SwiperSlide,
      BaseActivity,
      CollectionCard
    }
  })
  export default class TutorialActivity extends Vue {
    @Prop({ required: true }) readonly stages!: RoadmapAchievement[];
    
    @Prop({ required: true }) readonly heading!: string;

    get level() {
      console.log(this.stages);
      console.log(this.heading);
      return Number(this.stages[0].current_level);
    }
  }
</script>