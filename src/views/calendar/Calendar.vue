<template>
    <EternaPage>
        <FullCalendar :options="calendarOptions" />
    </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import '@fullcalendar/core/vdom'; // solves problem with Vite
  import FullCalendar from '@fullcalendar/vue';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import googleCalendarPlugin from '@fullcalendar/google-calendar';


  @Component({
    components: {
      EternaPage,
      FullCalendar,
    },
  })
  export default class Calendar extends Vue {
    data() {
      return {
        calendarOptions: {
          plugins: [ dayGridPlugin, interactionPlugin, googleCalendarPlugin ],
          initialView: 'dayGridMonth',
          dateClick: this.handleDateClick,
          events: {
            googleCalendarId: "https://calendar.google.com/calendar/u/3?cid=ZjhjdHMxcGVlc2ppdWptdXZ2MTA0NmM4bDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
          }
        }
      };
    }
  
    handleDateClick(arg: { dateStr: string; }) {
      console.log("Click!!!");
      alert(`date click! ${  arg.dateStr}`);
    }
  } 

</script>