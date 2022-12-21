<template>
  <SmartLink :link="link">
    <div class="page-content card">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col p-0" style="text-align:right">
            <div style="opacity: 0.5; font-weight: bold">
              {{ date }}
            </div>
          </div>
        </div>
        <h3 class="card-title" v-if="reward.title">{{ reward.title }}</h3>
        <div class="row d-flex" v-else style="margin-top:10px" />
          <p>
            You received {{ reward.field_reward_amount_value }}
            <img src="@/assets/dollar.svg" alt="coins" class="icon coin-icon" />
            for {{ isVote ? 'voting on' : 'your design'}},
            <a :href="link">{{ reward.field_reward_solution_title_value }}</a>,
            in <a :href="puzzleLink">{{ reward.field_reward_puzzle_title_value}}</a>
          </p>
      </div>
    </div>
  </SmartLink>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import SmartLink from '@/components/Common/SmartLink.vue';
  import {RewardNotificationItem} from '@/types/common-types';
  import { PUZZLE_ROUTE_BROWSE_PREFIX, PUZZLE_ROUTE_PREFIX } from '@/utils/constants';
  import MessageThread from './MessageThread.vue';

  @Component({
    components: { SmartLink, MessageThread },
  })
  export default class NewsItem extends Vue {
    @Prop({ required: true }) readonly reward!: RewardNotificationItem;

    private get link() {
      return `${PUZZLE_ROUTE_BROWSE_PREFIX}${this.reward.field_reward_puzzle_nid_value}/?filter1=Id&filter1_arg1=${this.reward.field_reward_solution_nid_value}&filter1_arg2=${this.reward.field_reward_solution_nid_value}`;
    }

    private get puzzleLink() {
      return `${PUZZLE_ROUTE_PREFIX}/${this.reward.field_reward_solution_nid_value}`;
    }

    private get isVote() {
      return this.reward.field_reward_type_value === 'VOTE';
    }

    private get date() {
      return new Date(parseInt(this.reward.created, 10) * 1000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  :deep(.card-body) {
    padding: 11.25px !important;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0.4rem 0;
    color: $white;
  }

  .icon-text {
    margin-left: 7px;
    position: relative;
    top: 7px;
    font-weight: bold;
  }

  .card {
    color: $white;
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    max-height: 600px;
    // cursor: pointer;
    transition: background-color 0.5s ease;
  }

  .card:hover {
    background-color: #21508c;
  }

  a:hover {
    text-decoration: none;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  .coin-icon {
    margin-bottom: 2px;
  }
</style>
