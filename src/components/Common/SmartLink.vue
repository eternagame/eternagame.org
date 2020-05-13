<template>
  <!-- Switch between <router-link>, <a>, or <div> depending on the link destination. -->
  <router-link v-if="link.startsWith('/')" :to="link">
    <slot></slot>
  </router-link>
  <a v-else-if="link" :href="link">
    <slot></slot>
  </a>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class SmartLink extends Vue {
    @Prop({ default: '' }) link!: string;
  }
</script>
