<template>
  <!-- Switch between <router-link> and <a> depending on the link destination. -->
  <router-link v-if="link.startsWith('/')" :to="link">
    <slot></slot>
  </router-link>
  <a v-else :href="link">
    <slot></slot>
  </a>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class SmartLink extends Vue {
    @Prop({ default: '/lost' }) link!: string;
  }
</script>
