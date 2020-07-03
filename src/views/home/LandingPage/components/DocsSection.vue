<template>
  <b-container>
    <div class="bs-docs-section clearfix">
      <div class="row">
        <div class="col-lg-12">
          <div style="text-align:center;">
            <p>
              <small>AS FEATURED IN</small>
            </p>
            <b-row>
              <b-col lg="3">
                <a href="http://www.nytimes.com/2011/01/11/science/11rna.html?_r=0">
                  <img src="@/assets/front-page/img/logo_nyt.svg" class="media-logo" alt />
                </a>
              </b-col>
              <b-col lg="2">
                <a href="http://www.cnn.com/interactive/2012/08/tech/gaming.series/research.html">
                  <img src="@/assets/front-page/img/logo_cnn.svg" class="media-logo" alt />
                </a>
              </b-col>
              <b-col lg="2">
                <a href="http://www.wired.com/wiredscience/2012/07/ff_rnagame/">
                  <img src="@/assets/front-page/img/logo_wired.svg" class="media-logo" alt />
                </a>
              </b-col>
              <b-col lg="2">
                <a
                  href="https://www.pbs.org/wgbh/nova/video/decoding-covid-19/"
                >
                  <img src="@/assets/front-page/img/logo_nova.svg" class="media-logo" alt />
                </a>
              </b-col>
              <b-col lg="3">
                <a
                  href="http://www.wsj.com/articles/videogamers-are-recruited-to-fight-tuberculosis-and-other-ills-1462290212"
                >
                  <img src="@/assets/front-page/img/logo_wsj.svg" class="media-logo" alt />
                </a>
              </b-col>
            </b-row>
            <PageFooter />
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import PageFooter from '@/components/PageLayout/PageFooter.vue';

  @Component({
    components: {
      PageFooter,
    },
  })
  export default class DocsSection extends Vue {}
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .divider {
    border-top-color: rgba(255, 255, 255, 0.4);
  }

  .bs-docs-section {
    margin-top: 3em;
  }

  .media-logo {
    max-width: 100%;
    padding-bottom: 15px;
  }

  .sponsor-logo {
    max-width: 85%;
    padding: 10px;
  }

  .icon {
    width: 25%;
    padding: 6px;
  }

  .thumb {
    max-width: 100%;
    float: left;
    margin-top: 7.5px;
    margin-bottom: 30px;
    text-align: top;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }

  .footer-bg {
    padding: 45px;
  }

  @media (min-width: 320px) {
    .main-logo {
      width: 180px;
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .login-sub {
      display: block;
    }
    h2,
    .h2 {
      font-size: 30px;
    }
    .video {
      padding: 75px 0;
    }
    .icon {
      width: 15%;
    }
    .sponsor-logo {
      max-width: 65%;
    }
  }

  @include media-breakpoint-up(sm) {
    .container {
      max-width: 540px;
    }
    .main-logo {
      width: 240px;
      padding-top: 5px;
      padding-bottom: 10px;
    }
    .login-sub {
      top: 160px;
      display: inline;
    }
    .icon {
      width: 10%;
    }
    .sponsor-logo {
      max-width: 85%;
    }
  }

  @include media-breakpoint-up(md) {
    .container {
      max-width: 720px;
    }
    .login-sub {
      top: 160px;
      display: inline;
    }
    h2,
    .h2 {
      font-size: 36px;
    }
  }

  @include media-breakpoint-up(lg) {
    .container {
      max-width: 960px;
    }
    .main-logo {
      width: 270px;
      padding-top: 0px;
      padding-bottom: 5px;
    }
    .login-sub {
      top: 85px;
      display: inline;
    }
    .icon {
      width: 20%;
    }
  }

  @include media-breakpoint-up(xl) {
    .container {
      max-width: 1140px;
    }
    .main-logo {
      width: 285px;
      padding-bottom: 0px;
    }
    .login-sub {
      top: 85px;
      display: inline;
    }
  }

  .user-icon {
    max-width: 24.75px;
    padding-right: 3px;
  }
</style>
