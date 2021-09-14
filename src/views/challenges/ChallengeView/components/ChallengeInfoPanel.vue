<template>
  <SidebarPanel
    :isInSidebar="isInSidebar"
    :header="$t('challenge-info:title')"
    headerIcon="@/assets/info.svg"
  >
    <div class="info-container">
      <h4 class="info-container-title">{{ $t('challenge-info:status') }}</h4>
      <p class="info-container-body">{{ challenge.challenge_status }}</p>
      <h4 class="info-container-title">{{ $t('challenge-info:research-affiliation') }}</h4>
      <p class="info-container-body">{{ challenge.affiliation }}</p>
    </div>
    <!-- <div class="sign-up-container">
      <h3 class="sign-up-container-title">{{ $t('challenge-sign-up:title') }}</h3>
      <p class="sign-up-container-subtitle">
        {{ $t('challenge-sign-up:subtitle') }}
      </p>
      <b-input class="sign-up-container-input" placeholder="Sign up" />
      <b-button
        class="sign-up-container-button"
        variant="primary"
      >
        {{ $t('challenge-sign-up:button') }}
      </b-button>
    </div> -->
    <div class="support-container">
      <h3 class="support-container-title">{{ $t('challenge-support:title') }}</h3>
      <p class="support-container-subtitle">
        {{ $t('challenge-support:subtitle') }}
      </p>
      <b-button
        class="support-container-button"
        variant="secondary"
        href="https://makeagift.stanford.edu/get/page/makeagift?pgnTPC=399&stp=163&olc=14209&cturl=close"
        target="_blank"
      >
        {{ $t('challenge-support:button') }}
      </b-button>
    </div>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import Progress from '@/components/Common/Progress.vue';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';

  @Component({
    components: {
      SidebarPanel,
      Progress,
    },
  })
  export default class ChallengeInfoPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly challenge!: ChallengeData;

    created() {}
  }
</script>

<style scoped lang="scss">
  .info-container {
    border-bottom: 1px solid #14467d;
    margin-bottom: 20px;

    &-title {
      margin-bottom: 5px;
      font-size: 0.8rem;
      color: #818FA3;
    }

    &-body {
      margin-top: 0px;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--yellow);
    }
  }

  .sign-up-container {
    border-bottom: 1px solid #14467d;
    margin-bottom: 20px;
    padding-bottom: 15px;
    color: #ffffff;

    &-title {
      font-size: 1rem;
      font-weight: 700;
    }

    &-subtitle {
      font-size: 0.8rem;
    }

    &-input {
      background: #041227;
      border: none;
      font-size: 0.8rem;
      margin: 1rem 0;

      &::placeholder {
        color: #ffffff;
        opacity: 0.5;
      }
    }
  }

  .support-container {
    color: #ffffff;

    &-title {
      font-size: 1rem;
      font-weight: 700;
    }

    &-subtitle {
      font-size: 0.8rem;
    }
  }
</style>
