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
  import listPlugin from '@fullcalendar/list';

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
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth',
          },
          plugins: [
            dayGridPlugin,
            interactionPlugin,
            googleCalendarPlugin,
            listPlugin,
          ],
          views: {
            dayGridMonth: { buttonText: 'month' },
          },
          initialView: 'dayGridMonth',
          eventClick: this.handleEventClick,
          googleCalendarApiKey: process.env.VUE_APP_GOOGLE_API_ID,
          events: {
            googleCalendarId: process.env.VUE_APP_GOOGLE_CALENDAR_ID,
          },
        },
      };
    }

    handleEventClick(info: {
      jsEvent: { preventDefault: () => void };
      event: { url: string | URL | undefined };
    }) {
      info.jsEvent.preventDefault(); // don't let the browser navigate

      if (info.event.url) {
        window.open(info.event.url);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.fc {
  --fc-list-event-hover-bg-color: #043468;
  --fc-page-bg-color: #043468;
  --fc-border-color: #043468;
  --fc-neutral-bg-color: #043468 ;
}
</style>