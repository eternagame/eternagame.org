<template>
  <SidebarPanel
    :isInSidebar="isInSidebar"
    :header="$t('lab-info:title')"
    headerIcon="@/assets/info.svg"
  >
    <span id="lab-admin" class="gray-header">{{ $t('lab-info:admin') }}</span><br />
    <img src="@/assets/navbar/DefaultIcon.svg" :alt="$t('lab-info:admin')" style="margin-right:5px" />
    <router-link :to="`/players/${lab.uid}`" style="font-weight: bold; color: var(--yellow);">{{ lab.username }}</router-link>
    <br />
    <br />
    <div v-if="challenge">
        <span class="gray-header">{{ $t('lab-info:lab-challenge') }}</span>
        <br />
        <router-link :to="`/challenges/${challenge.nid}`">
          <span style="font-weight: bold;">{{ challenge.title }}</span>
        </router-link>
        <br />
        <br />
    </div>

    <template v-if="lab.affiliation">
      <span class="gray-header">{{ $t('lab-info:research-affiliation') }}</span><br />
      <span style="font-weight: bold;">{{ lab.affiliation }}</span><br />
      <br />
    </template>
    <!-- <span class="gray-header">{{ $t('lab-info:currently-active') }}</span -->
    <!-- ><br /> -->
    <!-- <b>{{ $t('lab-info:round-number') }} 4</b> -->

    <div style="display: flex; flex-direction: column; align-items: baseline">
      <div style="font-size: 14px;" v-if="lab.project_closes">
        <p v-if="lab.designs_to_be_synthesized" style="text-align: left; margin-bottom: 8px;">
          <b> {{ lab.designs_to_be_synthesized }}</b>
          <b>{{ $t('count-down:select-synthesis-bold') }}</b>
          <span> {{ $t('count-down:select-synthesis') }}</span>
        </p>
        <flip-countdown
          :deadline="closesDateFormat"
          :labels="countdownLabels"
          style="padding:0px"
        />
        <br />
      </div>
      <div class="d-none d-lg-flex">
        <Progress style="margin-right: 20px;" v-bind="totalProgressCircle" color="#2f94d1" />
        <Progress v-if="$vxm.user.loggedIn" v-bind="userProgressCircle" color="#fac244" />
      </div>
      <div style="display: flex;">
        <Stat name="Players Submitted" style="font-size: 24px;">{{ lab.submitter_count }}</Stat>
      </div>
    </div>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import FlipCountdown from 'vue2-flip-countdown';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import Progress from '@/components/Common/Progress.vue';
  import Stat from '@/components/Common/Stat.vue';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';
  import { LabData } from '../types';

  @Component({
    components: {
      SidebarPanel,
      Progress,
      Stat,
      FlipCountdown,
    },
  })
  export default class LabInfoPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly lab!: LabData;

    @Prop({ required: true }) readonly challenge!: ChallengeData;

    get totalProgressCircle() {
      return {
        name: 'progress-circle:designs-submissions',
        progress: this.lab.total_submitted_solutions,
        total: this.lab.total_designs,
      };
    }

    get userProgressCircle() {
      return {
        name: 'progress-circle:my-submissions',
        progress: this.lab.total_submitted_solutions_of_user,
        total: this.lab.max_designs,
      };
    }

    get closesDateFormat(): string | null {
      if (!this.lab.project_closes) return null;
      const d = new Date(+this.lab.project_closes * 1000);
      return `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/')} ${[
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ].join(':')}`;
    }

    get countdownLabels() {
      return {
        days: "DAYS",
        hours: "HOURS",
        minutes: "MIN",
        seconds: "SEC"
      };
    }
  }
</script>

<style scoped lang="scss">
  :deep(.flip-card) {
    font-size: 2rem !important;
  }

  :deep(.container.flip-clock) {
    text-align: left;
  }

  :deep(.flip-card__top),
  :deep(.flip-card__bottom),
  :deep(.flip-card__back-bottom),
  :deep(.flip-card__back::before),
  :deep(.flip-card__back::after) {
    color: white !important;
    width: 2.7rem !important;
  }

  :deep(.flip-card__bottom),
  :deep(.flip-card__back-bottom),
  :deep(.flip-card__bottom-4digits),
  :deep(.flip-card__back-bottom-4digits) {
    border: none !important;
  }

  :deep(.flip-clock__slot) {
    font-size: .6rem !important;
    font-weight: bold;
    text-align: center;
  }
</style>
