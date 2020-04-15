<template>
  <ExperiencedPlayerHome v-if="hasLabAccess" />
  <NewPlayerHome v-else />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ExperiencedPlayerHome from './ExperiencedPlayerHome/ExperiencedPlayerHome.vue';
  import NewPlayerHome from './NewPlayerHome/NewPlayerHome.vue';

  @Component({
    components: {
      NewPlayerHome,
      ExperiencedPlayerHome,
    },
  })
  export default class PlayerHome extends Vue {
    get hasLabAccess() {
      return this.$vxm.user.loggedIn; // TODO changed
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
