<template>
  <ExperiencedPlayerHome v-if="hasLabAccess" :data="data" />
  <NewPlayerHome v-else :data="data" />
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  // @ts-ignore
  import get from 'lodash.get';
  import axios, { AxiosInstance } from 'axios';
  import ExperiencedPlayerHome from './ExperiencedPlayerHome/ExperiencedPlayerHome.vue';
  import NewPlayerHome from './NewPlayerHome/NewPlayerHome.vue';

  @Component({
    components: {
      NewPlayerHome,
      ExperiencedPlayerHome,
    },
  })
  export default class PlayerHome extends Vue {
    @Prop({}) data!: Object;

    get hasLabAccess() {
      return this.$vxm.user.hasLabAccess;
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
