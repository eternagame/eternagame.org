<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" style="padding: 0 !important;">
    <b-container class="page-container px-4">
      <b-navbar-brand to="/"><!--todo: mainpage of the current workbranch-->
        <img src="@/assets/logo_eterna.svg"
        class="d-inline-block align-top" alt="etenra" style="width: 250px"/>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/labs/explore">Labs</router-link>
          </li>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search" />
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <VueBootstrapBreakpointIndicator/>
    </b-container>
  </b-navbar>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueBootstrapBreakpointIndicator from 'vue-bootstrap-breakpoint-indicator';

  @Component({
    components: {
      VueBootstrapBreakpointIndicator,
    },
  })
  export default class Navbar extends Vue {}
</script>

<style lang="scss" scoped>
  nav {
    padding-left: 15%;
    padding-right: 15%;
    border: 0px;
    height: 120px;
  }
</style>
