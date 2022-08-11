<template>
  <EternaPage title="Eterna Players Alliance (EPA)">
    <div class="purpose-container">
      <h4 class="header">Purpose</h4>
      <div class="purpose-paragraph">
        <ul>
          <li>Ensure the continuing growth and success of Eterna</li>
          <li>
            Promote the recognition and appreciation of both RNA design and
            citizen science
          </li>
          <li>
            Represent player's interests in decisions impacting the future of
            Eterna
          </li>
        </ul>
      </div>
      <h4 class="header">Membership Requirements</h4>
      <ul>
        <li>Willing to respond & participate in EPA and in labs</li>
      </ul>
      <h4 class="header">EPA Members</h4>
      <ul>
        <li>Are eligible to vote at all meetings of the full membership</li>
        <li>
          Get updates at Eterna Town Hall meetings and via messages from the EPA
          Group
        </li>
        <li>Can nominate and vote for members of the EPA Board of Directors</li>
        <li>Can serve on and chair EPA committees and teams</li>
      </ul>
      <h4 class="header">Learn More and Help Out</h4>
      <ul>
        <li>Current Board of Directors/Officers</li>
        <li>EPA Bylaws</li>
        <li>EPA Workplan & Recent EPA Activities</li>
        <li>Board Meeting Schedule and Video Link</li>
      </ul>
      <div class="row d-flex justify-content-center align-content-center">
        <b-button
          type="submit"
          variant="primary"
          class="submit-button"
          :href="`/groups/10246970`"
          size="lg"
        >
          {{ 'Join Now!' }}
        </b-button>
      </div>
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel from '@/components/Sidebar/DropdownSidebarPanel.vue';

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
    },
  })
  export default class EPA extends Vue {}
</script>
<style lang="scss" scoped>
@import '@/styles/global.scss';

.purpose-container {
  position: relative;
  border-radius: 5px;
  background-color: #043468;
  padding: 25px;
  margin-bottom: 30px;
}

.science-container {
  position: relative;
  padding-bottom: 25px;
  margin-bottom: 30px;
  border-bottom: 1px solid #2f94d1;
}

.software-container {
  position: relative;
  padding-bottom: 25px;
  margin-bottom: 30px;
  border-bottom: 1px solid #2f94d1;
}

.community-container {
  position: relative;
  margin-bottom: 30px;
}

.header {
  margin-bottom: 1.5rem;
}

.history-media-asset {
  float: right;
  margin-left: 15px;
  width: 400px;

  & iframe {
    width: 400px;
    height: 250px;
    border-radius: 5px;

    @include media-breakpoint-down(sm) {
      width: 100%;
    }
  }

  & img {
    width: 400px;
    border-radius: 5px;
    margin-bottom: 10px;

    @include media-breakpoint-down(sm) {
      width: 100%;
    }
  }

  @include media-breakpoint-down(sm) {
    &.responsive {
      float: none;
      width: 100%;
      margin-left: 0px;
    }

    &:not(.responsive) {
      width: 200px;
      & img {
        width: 200px;
      }

      & iframe {
        width: 200px;
      }
    }
  }
}

.history-media-asset-description {
  display: inline-block;
  font-size: 0.7rem;
}

.history-paragraph {
  margin-bottom: 20px;
}

.stats-container {
  width: 100%;
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #2f94d1;

  .stat {
    display: inline-flex;
    flex-direction: column;
    width: 50%;
    background-color: #043468;
    margin-bottom: 10px;

    padding: 15px;
    border-radius: 5px;

    &:nth-child(2n + 1) {
      margin-right: 10px;
      width: calc(50% - 10px);

      @include media-breakpoint-down(sm) {
        margin-right: 0px;
        width: 100%;
      }
    }

    @include media-breakpoint-down(sm) {
      width: 100%;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
    }

    .stat-description {
      font-size: 0.8rem;
      color: #2f94d1;
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>
