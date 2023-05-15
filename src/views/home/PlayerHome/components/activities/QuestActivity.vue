<template>
  <BaseActivity :heading="$t('player-home:section1')" v-if="quests.length > 0">
    <SwiperSlide v-for="item in quests" :key="item.title">
      <QuestCard
        v-bind="item"
        :imageLink="item.questLink"
        :buttonLink="item.puzzleLink"
      />
    </SwiperSlide>
  </BaseActivity>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { SwiperSlide } from 'vue-awesome-swiper';
  import {
    CollectionItem,
    ProcessedRoadmapAchievement,
  } from '@/types/common-types';
  import Utils from '@/utils/utils';
  import QuestCard from '@/components/Cards/QuestCard.vue';
  import { isUndefined } from 'lodash';
  import BaseActivity from './BaseActivity.vue';

  @Component({
    components: {
      SwiperSlide,
      BaseActivity,
      QuestCard,
    },
  })
  export default class QuestActivity extends Vue {
    @Prop({ required: true }) readonly sideQuests!: ProcessedRoadmapAchievement[];

    @Prop({ required: true }) readonly collections!: CollectionItem[];

    get quests() {
      return this.sideQuests
        .filter((p) => p.level === Number(p.current_level) + 1)
        .map((p) => ({
          ...p,
          questLink: this.questLink(p),
          puzzleLink: Utils.getPuzzleLink(p.key, p.current_puzzle),
        }));
    }

    questLink(item: ProcessedRoadmapAchievement) {
      const nid = this.collections.find((a) => a.achievement === item.title)?.nid;
      if (isUndefined(nid)) {
        return Utils.getQuestLink(item.key);
      }
      return `/collections/${nid}`;
    }
  }
</script>
