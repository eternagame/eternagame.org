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
    @Prop({ default: 'filters' })
    private header!: string;

    @Prop({ default: icon })
    private headerIcon!: string;

    @Prop({ required: true })
    private filters!: Filter[];

    @Prop({ required: true })
    private paramName!: string;

    private selected: string[] = [];

    private queries: Map<string, string> = new Map();

    created() {
      const data = this.$route.query[this.paramName];
      if (data && typeof data === 'string') {
        this.selected = data.split(',');
      }
      this.filters.forEach(filter => {
        if (filter.query) this.queries.set(filter.value, filter.query);
      });
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

      this.selected.forEach(selected => {
        if (this.queries.has(selected)) query[selected] = this.queries.get(selected) as string;
      });
      return query;
    }
  }

  export interface Filter {
    value: string;
    text: string;
    query?: string;
  }
</script>

<style scoped lang="scss"></style>
