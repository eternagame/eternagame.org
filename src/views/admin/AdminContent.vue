<template>
  <div class="adminPage">
    <Sidebar></Sidebar>
    <main>
      <h1>What type of content would you like to update?</h1>
      <ul class="content-list">
        <li v-for="model in models" :key="model.name">
          <router-link :to="'/admin/' + model.id">
            <card>
            <div>
              <h2>{{model.name}}</h2>
              <span>{{model.description}}</span>
            </div>
            <b-icon-arrow-right-circle></b-icon-arrow-right-circle>
          </card>
        </router-link>
        </li>
      </ul>
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
    models = [];

    mounted() {
      // Get the details of what content we can edit
      fetch("/admin-api/meta")
        .then(res => res.json())
        .then(json => {
          this.models = json.sort((a:{name:string},b:{name:string}) => a.name > b.name);
        })
        .catch(err => {console.log(err);});
    }

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
    font-size: 2.4rem;
  }

  router-link {
    width: 100%;

    @include media-breakpoint-up(lg) {
      width: 30%;
    }
  }

  .content-list {
    padding: 0;
    margin: 32px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    list-style-type: none;
    width: 400px;
    margin-bottom: 16px;
  }

  card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #ecf0f1;;
    border-radius: 4px;
    padding: 16px;
    max-width: 600px;
    background-color: #2f71c6 !important;
    color: white !important;

    &:hover {
      background-color: #569bf4 !important;
    }

    h2 {
      font-size: 1.4rem;
    }

    // span { color: #7b8a8b; }

    .bi-arrow-right-circle { color: white; font-size: 1.5rem; }
  }

  .card {
    height:100%;
    width: 100%;
    
    .card-body { display: flex; flex-direction: row; } 
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
