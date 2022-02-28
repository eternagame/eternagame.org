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
          // dateClick: this.handleDateClick,
          googleCalendarApiKey: process.env.VUE_APP_GOOGLE_API_ID,
          events: {
            googleCalendarId: process.env.VUE_APP_GOOGLE_CALENDAR_ID
          }
        }
      };
    }
  
    handleDateClick(arg: { dateStr: string; }) {
      alert(`date click! ${  arg.dateStr}`);
    }
  } 

</script>