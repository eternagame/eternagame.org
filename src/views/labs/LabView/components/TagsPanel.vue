<template>
  <SidebarPanel>
    <template #sidebar>
      <img src="@/assets/hashtag.svg"/>
      Tags
    </template>
    <ul style="padding: 0; list-style-type:none">
      <li class="gray-header" v-for="tag in tags" :key="tag">{{tag}}</li>
    </ul>
</SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class TagsPanel extends Vue {
    @Prop() tags!: string[];
  }
</script>

<style scoped lang="scss">

</style>
