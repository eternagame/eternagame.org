<template>
  <DatePicker mode="range" v-model="dates" />
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';
  import DatePicker from 'v-calendar/lib/components/date-picker.umd';

  @Component({
    components: {
      SidebarPanel,
      DatePicker,
    },
  })
  export default class CalendarPanel extends mixins(SidebarPanelMixin) {
    @Prop() tags!: string[];

    private dates = {};

    mounted() {
      const { from_created, to_created } = this.$route.query;

      if (from_created && to_created)
        this.dates = {
          start: new Date(Number(from_created)),
          end: new Date(Number(to_created)),
        };
    }

    @Watch('dates')
    onSearch(event: KeyboardEvent) {
      const { start, end } = this.dates;
      if (start && end)
        this.$router.replace({
          name: this.$route.name!,
          query: { ...this.$route.query, from_created: start.getTime(), to_created: end.getTime() },
        });
    }
  }
</script>

<style scoped lang="scss"></style>
