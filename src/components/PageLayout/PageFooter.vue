<template>
  <div>
      <b-row>
        <div class="col-lg-12">
          <div style="text-align:center;">
            <hr class="top-border"/>
            <h4>Help Eterna invent medicine. <a href="https://eternagame.org/web/donate/"><strong>Make a donation today.</strong></a></h4>
          </div>
        </div>
      </b-row>

      <b-row class="mt-3">
        <b-col lg="8" sm="12">
          <div style="text-align:center;">
            <b-row>
              <b-col md="4" sm="4">
                <img src="@/assets/front-page/img/logo_gates.png" class="sponsor-logo" alt=""/>
              </b-col>
              <b-col md="3" sm="4">
                <img src="@/assets/front-page/img/logo_stanford.png" class="sponsor-logo" alt=""/>
              </b-col>
              <b-col md="5" sm="4">
                <img src="@/assets/front-page/img/logo_NIH.png" class="sponsor-logo" alt=""/>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col lg="1"></b-col>
        <b-col lg="3" sm="12">
          <div style="text-align:center;">
            <a href="http://twitter.com/@eternagame"><img src="@/assets/front-page/img/icon_twt.png" class="icon" alt="Twitter"/></a>
            <a href="https://www.facebook.com/eternathegame/"><img src="@/assets/front-page/img/icon_fb.png" class="icon" alt="Facebook"/></a>
            <a href="https://www.youtube.com/channel/UCt811OXJqe35TDhe9hPYzJg"><img src="@/assets/front-page/img/icon_yt.png" class="icon" alt="YouTube"/></a>
            <a href="https://github.com/EteRNAgame"><img src="@/assets/front-page/img/icon_gh.png" class="icon" alt="GitHub"/></a>
          </div>
        </b-col>
      </b-row>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {

    },
  })
  export default class PageFooter extends Vue {
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .top-border{
    border-top-color: rgba(255, 255, 255, 0.4);
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }

  .sponsor-logo {
    max-width:85%;
    padding:10px;
  }

  .icon {
    width:25%;
    padding:6px;
  }

  @media (min-width: 320px) {
    .icon {
      width:15%;
    }
    .sponsor-logo {
      max-width:65%;
    }
  }


  @include media-breakpoint-up(sm) {
    .icon {
      width:10%;
    }
    .sponsor-logo {
      max-width:85%;
    }
  }

  @include media-breakpoint-up(md) {
    .container { //See what to do with that
      max-width: 720px;
    }
  }

  @include media-breakpoint-up(lg) {
    .container { //
      max-width: 960px;
    }
    .icon {
      width:20%;
    }
  }

  @include media-breakpoint-up(xl) {
    .container {
      max-width: 1140px;
    }
  }
</style>
