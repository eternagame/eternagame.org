<template>
  <div class="adminPage">
    <Sidebar></Sidebar>
    <main>
      <h1>What would you like to do?</h1>
      <div class="actions-row">
        <router-link to="/admin/users">
          <b-card title="Update Users" sub-title="" bg-variant="light">
            <b-card-text>
              Find users, update profiles, deactivate accounts
            </b-card-text>
            <div class="footer">
              <b-icon-arrow-right-circle></b-icon-arrow-right-circle>
            </div>
          </b-card>
        </router-link>
        <router-link to="/admin/content">
          <b-card title="Update Content" sub-title="" bg-variant="light">
            <b-card-text>
              Edit labs, puzzles, news posts
            </b-card-text>
            <div class="footer">
              <b-icon-arrow-right-circle></b-icon-arrow-right-circle>
            </div>
          </b-card>
        </router-link>
        <router-link to="/admin/users">
          <b-card title="Access Utilities" sub-title="" bg-variant="light">
            <b-card-text>
              Upload lab data, score labs, upload publication contributors
            </b-card-text>
            <div class="footer">
              <b-icon-arrow-right-circle></b-icon-arrow-right-circle>
            </div>
          </b-card>
        </router-link>
      </div>
      <div class="grafana-dashboard">
        <h2>Grafana Dashboard</h2>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  // import { BSidebar } from 'bootstrap-vue';
  import { BIconArrowRightCircle, BIconChevronRight } from 'bootstrap-vue';
  import Sidebar from './components/Sidebar.vue';
  

  @Component({
    components: {
      Sidebar,
      BIconArrowRightCircle,
      BIconChevronRight
      // PlayerHome,
      // LandingPage
    },
  })
  export default class AdminHome extends Vue {
    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .adminPage {
    // background-color: rgb(248, 249, 249);
    display: grid;
    height:100%;
    width: 100%;
    grid-template-columns: 1fr 5fr;
  }

  main {
    // color: #000000;
    display: flex;
    flex-direction: column;
    padding: 32px;
    // grid-template-columns: 1fr 1fr;
    // grid-template-rows: 1fr 1fr;
    // grid-gap: 20px;
    // margin: 10%;
  }
  
  main h1 {
    margin-top: 32px;
    text-align: center;
    width: 100%;
  }

  .actions-row {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 16px;
    margin-top: 16px;

    @include media-breakpoint-up(lg) {
      flex-direction: row;
    }

    a {
      width: 100%;

      @include media-breakpoint-up(lg) {
        width: 30%;
      }
    }
  }

  

  .card {
    height:100%;
    width: 100%;
    background-color: #2f71c6 !important;
    color: white !important;

    &:hover {
      background-color: #569bf4 !important;
    }
    
    .card-body { display: flex; flex-direction: column; } 
    .card-text { flex-grow: 2; }
  }

    .footer {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      font-size: 1.3rem;
      align-self: flex-end;
    }


  .grafana-dashboard {
    width: 100%;
    height: 50%;
    background-color: #666666;
  }

  // .card {
  //   height: 20%;
  //   width: 50%;
  // }
</style>
