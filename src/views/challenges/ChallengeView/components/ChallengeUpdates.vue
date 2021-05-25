<template>
  <div v-if="challenge">
    <div class="challenge-updates">
      <h4 class="header">
        Challenge Updates
      </h4>
      <p class="challenge-summary">
        {{ summary() }}
      </p> 
      <div>
        <div
          v-for="(update, i) in updates()"
          :key="i"
          class="update card"
        >
          <div class="update-card-label">
            Challenges
          </div>
          <div class="update-card-date">
            {{ update.created }}
          </div>
          <div class="update-card-contents">
            <div class="update-card-title">
              {{ update.title }}
            </div>
            <div class="update-card-body" v-dompurify-html="update.body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ChallengeData, ChallengeAdminUpdate } from '@/views/challenges/ChallengeView/types';

  @Component({
    components: {},
  })
  export default class ChallengeUpdates extends Vue {
    @Prop({ required: true }) readonly challenge!: ChallengeData;

    updates() {
      const updates: ChallengeAdminUpdate[] = [
        ...this.challenge.admin_updates,
        ...this.challenge.news_posts
      ];

      return updates.sort((a, b) => b.timestamp - a.timestamp);
    }

    summary() {
      return this.challenge.update_summary;
    }
  }
</script>

<style scoped lang="scss">
  $card-padding: 15px;

  .challenge-updates {
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #14467d;
  }

  .header {
    margin-bottom: 1.5rem;
  }

  .challenge-summary {
    margin-bottom: 1.3rem;
    font-size: 0.8rem;
    color: #FFFFFF;
  }

  .update {
    position: relative;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #043468;
    border-radius: 5px;
    box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
    2px 2px 3px 0px rgb(94 93 102 / 10%);
    transition: box-shadow 0.15s ease-in-out;

    &:hover {
    box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
    2px 5px 10px 0px rgb(94 93 102 / 10%);
    }

    &-card-label {
      position: absolute;
      top: $card-padding;
      left: $card-padding;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #F39C12;
    }

    &-card-date {
      position: absolute;
      top: $card-padding;
      right: $card-padding;
      font-size: 0.7rem;
      color: #FFFFFF;
      opacity: 0.5;
    }

    &-card-contents {
      margin-top: 1.5rem;
    }

    &-card-title {
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 0.7rem;
      color: #FFFFFF;
    }

    &-card-body {
      font-size: 0.7rem;
      color: #FFFFFF;
    }
  }

  .card {
    color: #FFFFFF;
    margin-bottom: 1.5rem;
    transition: background-color 0.5s ease;
  }

  .card:hover {
    background-color: #21508c;
  }

  a:hover {
    text-decoration: none;
  }
</style>
