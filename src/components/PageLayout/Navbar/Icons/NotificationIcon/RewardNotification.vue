<template>
  <BaseNotification :to="link" :content="content" />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { RewardNotificationItem } from '@/types/common-types';
  import BaseNotification from './BaseNotification.vue';

  @Component({
    components: {
      BaseNotification
    },
  })
  export default class RewardNotification extends Vue {
    @Prop({ required: true }) readonly reward!: RewardNotificationItem;

    get content() {
      return `You received ${this.reward.field_reward_amount_value} points `
        + `for ${this.isVote ? 'voting on' : 'your design'} ${this.reward.field_reward_solution_title_value} `
        + `in ${this.reward.field_reward_puzzle_title_value}`;
    }

    get link() {
      return `/puzzles/${this.reward.field_reward_puzzle_nid_value}/browse?filter1=Id&filter1_arg1=${this.reward.field_reward_solution_nid_value}&filter1_arg2=${this.reward.field_reward_solution_nid_value}`;
    }

    private get isVote() {
      return this.reward.field_reward_type_value === 'VOTE';
    }
  }
</script>
