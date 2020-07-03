<template>
  <SidebarPanel
    :isInSidebar="isInSidebar"
    :header="$t('lab-info:title')"
    headerIcon="@/assets/info.svg"
  >
    <span class="gray-header">{{ $t('lab-info:admin') }}</span
    ><br />
    <img src="@/assets/navbar/DefaultIcon.svg" style="margin-right:5px" /><b
      style="color: var(--yellow);"
      >{{ lab.username }}</b
    >
    <br />
    <br />
    <span class="gray-header">{{ $t('lab-info:research-affiliation') }}</span
    ><br />
    <b>{{ lab.affiliation }}</b
    ><br />
    <br />
    <!-- <span class="gray-header">{{ $t('lab-info:currently-active') }}</span -->
    <!-- ><br /> -->
    <!-- <b>{{ $t('lab-info:round-number') }} 4</b> -->
    <div class="banner-progress d-none d-lg-block">
      <Progress v-bind="progressCircles[0]" color="#2f94d1" />
      <Progress v-bind="progressCircles[1]" color="#fac244" />
    </div>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import Progress from '@/components/Common/Progress.vue';
  import { LabData } from '../types';

  @Component({
    components: {
      SidebarPanel,
      Progress,
    },
  })
  export default class LabInfoPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly lab!: LabData;

    progressCircles = [
      {
        name: 'progress-circle:designs-submissions',
        progress: this.lab.total_submitted_solutions,
        total: this.lab.total_designs,
      },
      {
        name: 'progress-circle:my-submissions',
        progress: this.lab.total_submitted_solutions_of_user,
        total: this.lab.max_designs,
      },
    ];

    created() {}
  }
</script>

<style scoped lang="scss">
  .banner-progress {
    display: flex;
    justify-content: center;
  }
</style>
