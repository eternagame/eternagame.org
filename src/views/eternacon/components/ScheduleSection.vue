<template>
  <section class="schedule">
    <h3>Schedule</h3>
    <template v-for="(sessions, day) in sessions">
      <h4 :key="day + '-h'">{{day}}</h4>
      <ul :key="day + '-l'">
        <template v-for="session in sessions">
          <li :key="`${session.topic}-${session.time}`" class="row">
            <div class="col-sm-3">
              <div class="session-time">{{session.time}}</div>
              <div class="font-weight-bold">{{session.speaker}}</div>
              <div class="text-muted">{{session.affiliation}}</div>
            </div>
            <b-card class="col-sm-9" v-if="session.topic !== 'Break'">
              <h5>{{session.topic}}</h5>
              <p v-dompurify-html="session.abstract" v-if="session.abstract"></p>
              <template v-if="session.privateLink && $vxm.user.hasLabAccess">
                <p class="video-info">
                  This video may contain confidential information such as upublished research. Please do not share
                  its contents, and limit discussion to the lab categories on the forum and Discord.
                </p>
                <div class="embed-responsive embed-responsive-16by9 mt-2">
                  <iframe :src="session.privateLink" :title="`Session video for ${session.topic}`" class="embed-responsive-item" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
              </template>
              <p class="video-info" v-else-if="session.privateLink">
                A recording for this session is available to lab members.
                <template v-if="$vxm.user.loggedIn">
                  Finish the tutorials to gain access.
                </template>
                <template v-else>
                  Log in to watch.
                </template>
              </p>
              <template v-if="session.publicLink">
                <div class="embed-responsive embed-responsive-16by9 mt-2">
                  <iframe :src="session.publicLink" :title="`Session video for ${session.topic}`" class="embed-responsive-item" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
              </template>
            </b-card>
            <div class="col-sm-9 text-center" v-else>
              <h5 class="d-inline m-0">Break</h5><slot name="break"></slot>
            </div>
          </li>
        </template>
      </ul>
    </template>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  interface Sessions {
    [day: string]: [{
      speaker: string;
      affiliation?: string;
      time: string;
      topic: string;
      abstract: string;
      privateLink?: string;
      publicLink?: string;
    }]
  }

  @Component
  export default class ScheduleSection extends Vue {
    @Prop({ required: true }) sessions!: Sessions;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .schedule ul {
    padding: 0;

    li {
      margin: .5rem 0;
    }

    li > * {
      padding: .5rem;
      height: min-content;
    }

    .session-time {
      color: $yellow;
    }

    .video-info {
      color: $yellow;
      font-weight: bold;
    }

    p {
      margin: 0;
    }
  }
</style>
