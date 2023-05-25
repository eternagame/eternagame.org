<template>
  <SidebarPanel
    :isInSidebar="isInSidebar"
    :header="$t('lab-info:title')"
    headerIcon="@/assets/info.svg"
  >
    <span id="lab-admin" class="gray-header">{{ $t('lab-info:admin') }}</span><br />
    <img src="@/assets/navbar/DefaultIcon.svg" :alt="$t('lab-info:admin')" style="margin-right:5px" />
    <span style="font-weight: bold; color: var(--yellow);">{{ lab.username }}</span>
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
    <div class="banner-progress d-none d-lg-inline-flex" style="justify-content: space-between; flex-wrap: wrap;">
      <Progress v-bind="totalProgressCircle" color="#2f94d1" style="flex-basis: 50%;" />
      <Progress v-if="$vxm.user.loggedIn" v-bind="userProgressCircle" color="#fac244" style="flex-basis: 50%;" />
      <Stat name="Players Contributed" style="flex-basis: 50%; font-size: 24px;">{{ lab.submitter_count }}</Stat>
    </div>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
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
      Stat
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
  }
</script>

<style scoped lang="scss">
  .banner-progress {
    display: flex;
    justify-content: center;
  }
</style>
