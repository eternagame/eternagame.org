<template>
  <!-- Switch between <router-link>, <a>, or <div> depending on the link destination. -->
  <router-link v-if="isInternal" :to="link">
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
  import Utils from '@/utils/utils';

  @Component({})
  export default class SmartLink extends Vue {
    @Prop({ default: '' }) readonly link!: string | Object;

    get isInternal() {
      return Utils.isLinkInternal(this.link);
    }
  }
</script>
