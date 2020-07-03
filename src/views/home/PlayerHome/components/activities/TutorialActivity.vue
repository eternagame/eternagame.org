<template>
  <BaseActivity :heading="heading" :slideTo="level">
    <template v-slot:extra>
      <img
        :src="progressImage"
        class="player-progress-bar"
        v-if="!$vxm.user.hasLabAccess"
      />
    </template>
    <SwiperSlide v-for="(item, index) in tools" :key="index">
      <QuestCard :key="item.title" v-bind="item" />
    </SwiperSlide>
  </BaseActivity>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import {RoadmapAchievement} from '@/types/common-types';
  import Utils from '@/utils/utils';
  import PROGRESS_IMAGE_0 from '@/assets/progress/progress0.svg';
  import PROGRESS_IMAGE_1 from '@/assets/progress/progress1.svg';
  import PROGRESS_IMAGE_2 from '@/assets/progress/progress2.svg';
  import PROGRESS_IMAGE_3 from '@/assets/progress/progress3.svg';
  import PROGRESS_IMAGE_4 from '@/assets/progress/progress4.svg';
  import PROGRESS_IMAGE_5 from '@/assets/progress/progress5.svg';
  import PROGRESS_IMAGE_6 from '@/assets/progress/progress6.svg';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import BaseActivity from './BaseActivity.vue';

  const PROGRESS_IMAGES = [
    PROGRESS_IMAGE_0,
    PROGRESS_IMAGE_1,
    PROGRESS_IMAGE_2,
    PROGRESS_IMAGE_3,
    PROGRESS_IMAGE_4,
    PROGRESS_IMAGE_5,
    PROGRESS_IMAGE_6,
  ];

  @Component({
    components: {
      SwiperSlide,
      BaseActivity,
      QuestCard
    }
  })
  export default class TutorialActivity extends Vue {
    @Prop({ required: true }) readonly tools!: RoadmapAchievement[];

    get heading() {
      return this.$vxm.user.hasLabAccess ?
        this.$t('player-home:section2')
        : this.$t('player-home:lab-access');
    }

    get level() {
      return Number(this.tools[0].current_level);
    }

    get progressImage() {
      return PROGRESS_IMAGES[this.level || 0];
    }
  }
</script>