<template>
  <SidebarPanel :isInSidebar="isInSidebar" header="calendar" headerIcon="@/assets/calendar.svg">
    <DatePicker mode="range" v-model="dates" color="yellow" is-dark is-inline />
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  // @ts-ignore
  import DatePicker from 'v-calendar/lib/components/date-picker.umd';

  @Component({
    components: {
      SidebarPanel,
      DatePicker,
    },
  })
  export default class CalendarPanel extends mixins(SidebarPanelMixin) {
    private dates: {
      start?: Date;
      end?: Date;
    } = {};

    mounted() {
      const { start_date, end_date } = this.$route.query;

      if (start_date && end_date)
        this.dates = {
          start: new Date(start_date as string),
          end: new Date(end_date as string),
        };
    }

    @Watch('dates')
    onSearch(event: KeyboardEvent) {
      const { start, end } = this.dates;
      if (start && end)
        this.$router.replace({
          name: this.$route.name!,
          query: {
            ...this.$route.query,
            start_date: start.toLocaleDateString().replace(/\//g, '-'),
            end_date: end.toLocaleDateString().replace(/\//g, '-'),
          },
        });
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .vc-container {
    background-color: transparent;
    border: 0px;
  }

  ::v-deep .vc-weekday {
    color: gray;
  }
</style>
