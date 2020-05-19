<template>
  <ExperiencedPlayerHome v-if="hasLabAccess" :pageData="pageData" />
  <NewPlayerHome v-else :pageData="pageData" />
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
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
    @Prop({}) pageData!: Object;

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
