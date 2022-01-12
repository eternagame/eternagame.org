<template>
  <BaseActivity :heading="$t('player-home:section1')" v-if="quests.length > 0">
    <SwiperSlide v-for="item in quests" :key="item.title">
        <CollectionCard
          v-bind="item"
          :imageLink="item.questLink"
          :buttonLink="item.puzzleLink"
        />
    </SwiperSlide>
  </BaseActivity>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import {ProcessedRoadmapAchievement} from '@/types/common-types';
  import Utils from '@/utils/utils';
  import CollectionCard from '@/components/Cards/CollectionCard.vue';
  import BaseActivity from './BaseActivity.vue';

  @Component({
    components: {
      SwiperSlide,
      BaseActivity,
      CollectionCard
    }
  })
  export default class QuestActivity extends Vue {
    @Prop({ required: true }) readonly sideQuests!: ProcessedRoadmapAchievement[];

    get quests() {
      return this.sideQuests
        .filter(p => p.level === Number(p.current_level) + 1)
        .map(p => ({
          ...p,
          questLink: Utils.getQuestLink(p.key),
          puzzleLink: Utils.getPuzzleLink(p.key),
        }));
    }
  }
</script>