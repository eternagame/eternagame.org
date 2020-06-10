<template>
  <SidebarPanel :isInSidebar="isInSidebar" :header="header" :headerIcon="headerIcon">
    <b-checkbox-group v-model="selected" :options="filters" @input="onCheck" stacked />
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  import icon from '@/assets/Filter.svg';

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

    private selected: string[] = [];

    created() {
      const data = this.$route.query[this.paramName];
      if (data && typeof data === 'string') {
        this.selected = data.split(',');
      }
    }

    async onCheck() {
      await this.$router.replace({ name: this.$route.name!, query: this.getQuery() });
    }

    getQuery() {
      const query = { ...this.$route.query };
      if (this.selected.length) {
        query[this.paramName] = this.selected.join(',');
      } else {
        delete query[this.paramName];
      }
      return query;
    }
  }

  export interface Filter {
    value: string;
    text: string;
  }
</script>

<style scoped lang="scss"></style>
