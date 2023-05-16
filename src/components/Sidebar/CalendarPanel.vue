<template>
  <SidebarPanel :isInSidebar="isInSidebar" header="calendar" headerIcon="@/assets/calendar.svg">
    <vc-date-picker is-range v-model="dates" color="yellow" :attributes="highlightDates" @update:from-page="changePage" is-dark is-inline />
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import VCalendar from 'v-calendar';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import { DateItem } from '@/types/common-types';

  // @ts-ignore

  Vue.use(VCalendar, {
    componentPrefix: 'vc',
  });

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class CalendarPanel extends mixins(SidebarPanelMixin) {

    @Prop({required: false}) readonly notableDates!: {selectAttribute: { dot: string; dates: string; }[]} ;

    dates: {
      start?: Date;
      end?: Date;
    } = {};


    changePage(shownMonth : DateItem){
      this.$emit('page-update', shownMonth);
    }

    get highlightDates(){
      return this.notableDates? this.notableDates.selectAttribute: [];
    }

    mounted() {
      const { start_date, end_date } = this.$route.query;

      if (start_date && end_date){

        this.dates = {
          start: new Date(start_date as string),
          end: new Date(end_date as string),
        };
      }
    }

    @Watch('dates')
    onSearch() {
      const { start, end } = this.dates;
      if (start && end) {
        const {skip: oldSkip, ...query} = this.$route.query;
        this.$router.replace({
          name: this.$route.name!,
          query: {
            ...query,
            start_date: start.toLocaleDateString().replace(/\//g, '-'),
            end_date: end.toLocaleDateString().replace(/\//g, '-'),
          },
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  :deep(.vc-container) {
    background-color: transparent;
    border: 0px;
  }

  :deep(.vc-weekday) {
    color: gray;
  }
</style>
