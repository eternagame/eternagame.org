<template>
  <div>
    <b-row>
      <div class="col-lg-12">
        <div style="text-align:center;">
          <hr class="top-border" />
          <h4>
            {{ $t('page-footer:main-action') }}
            <a href="https://challenges.eternagame.org/"
              ><strong>{{ $t('page-footer:main-action-stress') }}</strong></a
            >
          </h4>
        </div>
      </div>
    </b-row>

    <b-row class="mt-3">
      <b-col lg="8" sm="12">
        <div style="text-align:center;">
          <b-row>
            <b-col md="4" sm="4">
              <img src="@/assets/front-page/img/logo_gates.png" class="sponsor-logo" alt="" />
            </b-col>
            <b-col md="3" sm="4">
              <img src="@/assets/front-page/img/logo_stanford.png" class="sponsor-logo" alt="" />
            </b-col>
            <b-col md="5" sm="4">
              <img src="@/assets/front-page/img/logo_NIH.png" class="sponsor-logo" alt="" />
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col lg="4" sm="12">
        <div style="text-align:center;">
          <a href="https://twitter.com/eternagame">
            <img src="@/assets/front-page/img/icon_twt.png" class="icon" alt="Twitter" />
          </a>
          <a href="https://www.facebook.com/eternathegame/">
            <img src="@/assets/front-page/img/icon_fb.png" class="icon" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/eternagame/">
            <img src="@/assets/front-page/img/icon_instagram.svg" class="icon" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/eternagame">
            <img src="@/assets/front-page/img/icon_yt.png" class="icon" alt="YouTube" />
          </a>
          <a href="https://www.twitch.tv/eternagame">
            <img src="@/assets/front-page/img/icon_twitch.svg" class="icon" alt="Twitch" />
          </a>
          <a href="https://github.com/eternagame">
            <img src="@/assets/front-page/img/icon_gh.png" class="icon" alt="GitHub" />
          </a>
        </div>
      </b-col>
    </b-row>
    <!--
    <div class="mt-3 language-bar">
      <div @click="setLanguage('en')" :class="{ active: isLanguage('en') }">
        English (US)
      </div>
      <div :class="{ active: isLanguage('es') }" @click="setLanguage('es')">Español</div>
      <div :class="{ active: isLanguage('ar') }" @click="setLanguage('ar')">Arabic</div>
      <div :class="{ active: isLanguage('zh') }" @click="setLanguage('zh')">中文 (简体)</div>
      <div :class="{ active: isLanguage('pt') }" @click="setLanguage('pt')">Português</div>
      <div :class="{ active: isLanguage('hi') }" @click="setLanguage('hi')">हिन्दी</div>
      <div :class="{ active: isLanguage('fr') }" @click="setLanguage('fr')">Français</div>
      <div :class="{ active: isLanguage('ko') }" @click="setLanguage('ko')">한국어</div>
      <div :class="{ active: isLanguage('de') }" @click="setLanguage('de')">Deutsch</div>
      <div :class="{ active: isLanguage('ja') }" @click="setLanguage('ja')">日本語</div>
      <div :class="{ active: isLanguage('it') }" @click="setLanguage('it')">Italiano</div>
    </div> -->
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import i18n, { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_KEY_NAME } from '@/plugins/i18n';

  @Component({
    components: {},
  })
  export default class PageFooter extends Vue {
    private languageSet = window.localStorage.getItem(LANGUAGE_KEY_NAME) || DEFAULT_LANGUAGE;

    isLanguage(language: string) {
      return this.languageSet.substring(0, 2) === language;
    }

    setLanguage(language: string) {
      window.localStorage.setItem(LANGUAGE_KEY_NAME, language);
      this.languageSet = language;
      i18n.locale = language;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .active {
    color: gray;
  }

  .language-bar {
    margin-left: -$page-margin-side;
    margin-right: -$page-margin-side;
    background-color: black;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    div {
      margin-right: 20px;
    }
    div:hover {
      color: gray;
      cursor: pointer;
    }
  }

  .top-border {
    border-top-color: rgba(255, 255, 255, 0.4);
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }

  .sponsor-logo {
    width: 85%;
    padding: 10px;
  }

  .icon {
    width: 15%;
    padding: 6px;
    transition: ease 0.5s;

    @include media-breakpoint-down(md) {
      width: 10%;
    }

    @include media-breakpoint-down(xs) {
      width: 15%;
    }
  }
  .icon:hover {
    transform: rotateZ(18deg);
  }
  .icon:active {
    transform: rotateZ(0deg);
  }

  @media (min-width: 320px) {
    .sponsor-logo {
      max-width: 65%;
    }
  }

  @include media-breakpoint-up(sm) {
    .sponsor-logo {
      max-width: 85%;
    }
  }

  @include media-breakpoint-up(md) {
    .container {
      //See what to do with that
      max-width: 720px;
    }
  }

  @include media-breakpoint-up(lg) {
    .container {
      //
      max-width: 960px;
    }
  }

  @include media-breakpoint-up(xl) {
    .container {
      max-width: 1140px;
    }
  }
</style>
