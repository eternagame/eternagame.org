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

    /** If flagged, the server expects '?value1=flag1...', not '?filter=value1,...' */
    @Prop({ default: false })
    private flagged!: boolean;

    private selected: string[] = [];

    created() {
      if (this.flagged) {
        this.filters.forEach(filter => {
          if (this.$route.query[filter.value]) {
            this.selected.push(filter.value);
          }
        });
      } else {
        const data = this.$route.query[this.paramName];
        if (data && typeof data === 'string') {
          this.selected = data.split(',');
        }
      }
    }

    async onCheck() {
      await this.$router.replace({
        name: this.$route.name!,
        query: this.flagged ? this.getFlaggedQuery() : this.getQuery(),
      });
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

    getFlaggedQuery() {
      const query = { ...this.$route.query };
      this.filters.forEach(filter => {
        if (this.selected.includes(filter.value)) {
          query[filter.value] = filter.flag || 'true';
        } else {
          delete query[filter.value];
        }
      });
      return query;
    }
  }

  export interface Filter {
    value: string;
    flag?: string;
    text: string;
  }
</script>

<style scoped lang="scss"></style>
