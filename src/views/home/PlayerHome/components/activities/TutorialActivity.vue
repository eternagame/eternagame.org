<template>
  <BaseActivity :heading="heading" :slideTo="level">
    <SwiperSlide v-for="item in stages" :key="item.title">
      <QuestCard v-bind="item"
      
          :imageLink="questLink(item)" />
    </SwiperSlide>
  </BaseActivity>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import {CollectionItem, RoadmapAchievement} from '@/types/common-types';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import BaseActivity from './BaseActivity.vue';

  @Component({
    components: {
      SwiperSlide,
      BaseActivity,
      QuestCard
    }
  })
  export default class TutorialActivity extends Vue {
    @Prop({ required: true }) readonly stages!: RoadmapAchievement[];
    
    @Prop({ required: true }) readonly heading!: string;

    @Prop({ required: true}) readonly collections!: CollectionItem[];

    get level() {
      return Number(this.stages[0].current_level);
    }

    questLink(item: RoadmapAchievement) {
      const {nid} = this.collections.filter(a => a.title === item.title)[0];
      return `/collections/${  nid}`;
    }
  }
</script>