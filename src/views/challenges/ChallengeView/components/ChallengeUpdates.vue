<template>
  <div>
    <div class="challenge-updates">
      <h4 class="header">
        Challenge Updates
      </h4>
      <p class="challenge-summary">
        {{ summary }}
      </p> 
      <div>
        <div
          v-for="(update, i) in updates"
          :key="i"
          class="update card"
        >
          <a href="item.link">
            <div class="update-card-label">
              Challenges
            </div>
            <div class="update-card-date">
              {{ update.date }}
            </div>
            <div class="update-card-contents">
              <div class="update-card-title">
                {{ update.title }}
              </div>
              <div class="update-card-body">
                {{ update.body }}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { LabData } from '@/views/labs/LabView/types';

  @Component({
    components: {},
  })
  export default class ChallengeUpdates extends Vue {
    @Prop({ required: true }) readonly challenge!: LabData;

    updates = [
      {
        date: "Apr 25 2019",
        title: "New results posted: combination designs from Ribosome Challenge Rounds 1-2!",
        body: "Hey, players-- Antje has just completed optimal and stress condition studies on a new set of ribosomes -- combinations of the best R1 and R2 16S and 23S designs! Check out the Round 2 conclusions for the exciting results!"
      },
      {
        date: "Apr 25 2019",
        title: "Town Hall Update: New schedule and new hosts starting March 1st!",
        body: "Hello fellow Eterna Players. This Monday, March 1st, the EPA will be starting to host the Town Halls, with Jennifer Pearl running the event. We will have Town Halls every 1st and 3rd Monday of each month going forward. We’ll stick to that schedule to reduce confusion of whether the event will be happening or not. If there is nothing to discuss we may end early or do something for fun maybe… You can request a ticket…"
      },
      {
        date: "Apr 25 2019",
        title: "Town Hall Update: New schedule and new hosts starting March 1st!",
        body: "Hello fellow Eterna Players. This Monday, March 1st, the EPA will be starting to host the Town Halls, with Jennifer Pearl running the event. We will have Town Halls every 1st and 3rd Monday of each month going forward. We’ll stick to that schedule to reduce confusion of whether the event will be happening or not. If there is nothing to discuss we may end early or do something for fun maybe… You can request a ticket…"
      }
    ];

    summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
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
    padding: 0;
    margin-bottom: 20px;
    background-color: #043468;
    border-radius: 5px;
    box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
    2px 2px 3px 0px rgb(94 93 102 / 10%);
    transition: box-shadow 0.15s ease-in-out;

    & a {
      position: relative;
      padding: 20px;
    }

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
    max-height: 600px;
    transition: background-color 0.5s ease;
  }

  .card:hover {
    background-color: #21508c;
  }

  a:hover {
    text-decoration: none;
  }
</style>
