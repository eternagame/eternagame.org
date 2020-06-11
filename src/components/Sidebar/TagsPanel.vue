<template>
  <SidebarPanel :isInSidebar="isInSidebar" header="Tags" headerIcon="@/assets/sidebar/hashtag.svg">
    <template #header-icon>
      <img src="@/assets/sidebar/hashtag.svg" />
    </template>
    <ul style="padding: 0; list-style-type:none">
      <li class="gray-header" v-for="tag in tags" :key="tag">{{ tag }}</li>
    </ul>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class TagsPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true }) readonly tags!: string[];
  }
</script>

<style scoped lang="scss"></style>
