<template>
  <SidebarPanel>
    <template #header>
      <img src="@/assets/info.svg" />
      Lab Info
    </template>
    <span class="gray-header">Admin:</span><br/>
    <b>Username</b><br/>
    <br/>
    <span class="gray-header">Research affiliation:</span><br/>
    <b>{{lab.affiliation}}</b><br/>
    <br/>
    <span class="gray-header">Currently active:</span><br/>
    <b>Round 4</b>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import { LabData } from '../types';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class LabInfoPanel extends Vue {
    @Prop()
    private lab!: LabData;

    created() {

    }
  }
</script>

<style scoped lang="scss">

</style>
