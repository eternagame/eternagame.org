<template>
    <section class="hero">
      <img :src="bgImage" class="bg" />
      <div v-if="!backgroundImage" class="logowrap">
        <img src="@/assets/about/logo_eternacon.svg" class="logo" />
      </div>
      <div class="hero-description">
        <h2>Learn. Play. <i>Connect</i>.</h2>

        <p class="explain">
          <slot></slot>
        </p>

        <b-button
          class="button mt-3"
          variant="primary"
          size="lg"
          :href="registerLink"
          v-if="registerLink"
        >
          Register
        </b-button>
      </div>
    </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import BlueBG from '@/assets/home/hero-blue-bg.png';

  @Component
  export default class HeroSection extends Vue {
    @Prop({ required: false }) backgroundImage?: string;

    @Prop({ required: false }) registerLink?: string;

    get bgImage() {
        return this.backgroundImage ?? BlueBG;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  
  .hero {
    height: 350px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .logowrap {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      padding: 2rem;
    }

    .logo {
      position: relative;
      top: -3rem;
    }

    .bg {
      object-fit: cover;
    }
  }

  .hero::after {
    z-index: 1;
    display: block;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(0, 0, 0, 0.6) 70%,
      rgba(0, 0, 0, 0.9) 100%
    );
    margin-top: -400px;
    height: 400px;
    width: 100%;
    content: '';
  }

  .hero-description {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2rem;
    z-index: 2;
  }

  .explain {
    max-width: 482px;
    margin: 0;
  }
</style>
