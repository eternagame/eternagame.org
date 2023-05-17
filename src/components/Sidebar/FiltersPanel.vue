<template>
  <SidebarPanel :isInSidebar="isInSidebar" :header="header" :headerIcon="headerIcon">
    <b-checkbox-group v-model="selected" :options="filters" @input="onCheck" stacked />
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import icon from '@/assets/Filter.svg';

  export interface Filter {
    value: string;
    text: string;
  }

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class FiltersPanel extends mixins(SidebarPanelMixin) {
    @Prop({ default: 'filters' }) readonly header!: string;

    @Prop({ default: icon }) readonly headerIcon!: string;

    @Prop({ required: true }) readonly filters!: Filter[];

    @Prop({ required: true }) readonly paramName!: string;

    selected: string[] = [];

    created() {
      const data = this.$route.query[this.paramName];
      if (data && typeof data === 'string') {
        this.selected = data.split(',');
      }
    }

    async onCheck() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {[this.paramName]: oldParam, skip: oldSkip, ...query} = this.$route.query;
      const filter = this.selected.join(',');
      this.$router.replace({
        name: this.$route.name!,
        query: {
          ...query,
          ...(filter ? {[this.paramName]: filter} : {})
        },
      });
    }
  }
</script>

<style scoped lang="scss"></style>
