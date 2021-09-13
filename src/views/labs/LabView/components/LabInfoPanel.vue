<template>
  <SidebarPanel
    :isInSidebar="isInSidebar"
    :header="$t('lab-info:title')"
    headerIcon="@/assets/info.svg"
  >
    <span class="gray-header">{{ $t('lab-info:admin') }}</span><br />
    <img src="@/assets/navbar/DefaultIcon.svg" style="margin-right:5px" />
    <span style="font-weight: bold; color: var(--yellow);">{{ lab.username }}</span>
    <br />
    <br />
    <div v-if="challenge">
        <span class="gray-header">{{ $t('lab-info:lab-challenge') }}</span>
        <br />
        <a :href="`/challenges/${challenge.nid}`">
          <span style="font-weight: bold;">{{ challenge.title }}</span>
        </a>
        <br />
        <br />
    </div>

    <template v-if="lab.affiliation">
      <span class="gray-header">{{ $t('lab-info:research-affiliation') }}</span><br />
      <span style="font-weight: bold;">{{ lab.affiliation }}</span><br />
      <br />
    </template>
    <div class="banner-progress d-none d-lg-block">
      <Progress v-bind="totalProgressCircle" color="#2f94d1" />
      <Progress v-if="$vxm.user.loggedIn" v-bind="userProgressCircle" color="#fac244" />
    </div>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import Progress from '@/components/Common/Progress.vue';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';
  import { LabData } from '../types';

  @Component({
    components: {
      SidebarPanel,
      Progress,
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
