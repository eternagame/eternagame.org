<template>
  <SidebarPanel :isInSidebar="isInSidebar" header="calendar" headerIcon="@/assets/calendar.svg">
    <vc-date-picker is-range v-model="dates" color="yellow" :attributes="selectAttribute" is-dark is-inline @update:from-page="fetch"/>
  </SidebarPanel>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import { NewsItem, DateItem } from '@/types/common-types';
  
  // @ts-ignore
  import VCalendar from 'v-calendar';

  Vue.use(VCalendar, {
    componentPrefix: 'vc',
  });

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=newsandblogslist';

  @Component({
    components: {
      SidebarPanel,
    },
  })
  export default class CalendarPanel extends mixins(SidebarPanelMixin) {
    private dates: {
      start?: Date;
      end?: Date;
    } = {};

    private defaultDate!: DateItem;

    mounted() {
      const { start_date, end_date } = this.$route.query;

      if (start_date && end_date){

        this.dates = {
          start: new Date(start_date as string),
          end: new Date(end_date as string),
        };
      }
    }


    async fetch(shownMonth = this.defaultDate){
      
      let i = 0;
      // go from first day of month to first day of next month

      // means data is not already loaded, string matching
      if(!this.$data.months.includes(`${shownMonth.month}${shownMonth.year}`)){

        this.$data.months.push(`${shownMonth.month}${shownMonth.year}`);

        const res = (
          await this.$http.get(ROUTE, {
              params: {
                size: INITIAL_NUMBER,
                from_created: new Date(shownMonth.year, shownMonth.month - 1, 1).getTime() / 1000,
                to_created: new Date(shownMonth.year, shownMonth.month, 1).getTime() / 1000,
                }
            })
          ).data.data.entries as NewsItem[];

        // not sure about adjusting for timezones, is setting the locale to en us okay?
        // it's only being used to parse dates, which is already being printed in UTC Time

        for(; i < res.length; i += 1){

          this.$data.selectAttribute.push({
            dot:'blue',
            dates: new Date(Number(res[i].timestamp) * 1000).toLocaleString('en-US', {timeZone: 'UTC'}),
          });
        }
      }

    }

    data(){
      return {
        selectAttribute:[],
        months:[]
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
