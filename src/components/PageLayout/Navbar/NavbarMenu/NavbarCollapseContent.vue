<template>
  <div class="mr-5">
    <div>
      <!--return the padding from b-container-->
      <NavbarIcons v-if="loggedIn" class="d-inline d-md-none d-lg-block icons-group mr-2" />
      <LoginRow v-else class="float-lg-right mb-1" />
    </div>
    <div class="w-100 d-flex justify-content-between">
      <b-navbar-nav class="nav-pills">
        <NavbarMenuItem
          v-for="(value, text) in menu"
          :key="text"
          :value="value"
          :text="$t('nav-bar:' + text)"
        />
      </b-navbar-nav>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import NavbarIcons from '../Icons/NavbarIcons.vue';
  import NavbarMenuItem from './NavbarMenuItem.vue';
  import LoginSub from './Login/LoginSub.vue';
  import LoginRow from './Login/LoginRow.vue';

  @Component({
    components: {
      NavbarIcons,
      NavbarMenuItem,
      LoginSub,
      LoginRow,
    },
  })
  export default class NavbarCollapseContent extends Vue {
    @Prop({ required: true })
    menu!: {
      [text: string]: { [text: string]: string } | string;
    };

    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }
  }
</script>

<style lang="scss" scoped></style>
