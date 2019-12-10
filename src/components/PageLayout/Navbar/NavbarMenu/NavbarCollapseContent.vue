<template>
  <b-container fluid>
    <div class="w-100 d-flex justify-content-end">
      <NavbarIcons class="d-inline d-md-none d-lg-block icons-group"/>
    </div>
    <div class="w-100 d-flex justify-content-end">
      <b-navbar-nav class="nav-pills">
        <NavbarMenuItem v-for="(value, text) in menu" :key="text" :value="value" :text="text"/>
      </b-navbar-nav>
    </div>
  </b-container>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import NavbarIcons from '../Icons/NavbarIcons.vue';
  import NavbarMenuItem from './NavbarMenuItem.vue';

  @Component({
    components: {
      NavbarIcons,
      NavbarMenuItem,
    },
  })
  export default class NavbarCollapseContent extends Vue {
    @Prop({ required: true })
    menu!: {
      [text: string]: {[text: string]: string} | string;
    };
  }
</script>

<style lang="scss" scoped>
  hr.side-bar-separator {
    border-color: var(--gray-dark);
  }
</style>
