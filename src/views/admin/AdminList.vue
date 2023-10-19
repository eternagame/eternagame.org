<template>
  <div class="adminPage">
    <Sidebar></Sidebar>
    <main>
      <div class="content">
        <header>
          <div class="actions">
            <h1>{{ meta.name }}</h1>
            <!-- <b-badge>{{count}}</b-badge> -->
            <router-link :to="'/admin/'+ this.$route.params.type + '/create'">
              <b-button pill variant="outline-secondary">+ Create New</b-button>
            </router-link>
            <FiltersPanel></FiltersPanel>
          </div>
          <b-form-input v-model="searchText" placeholder="Search"></b-form-input>
        </header>
        <div class="table">
          <b-table 
            sticky-header="600px" 
            hover 
            :items="flatList" 
            :fields="flatFields" 
            @row-clicked="navigateToEditPage"
            tbody-tr-class="tableRow">
            <template #cell()="data">
              <div class="table-cell">{{ data.value }}</div>
            </template>
          </b-table>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import FiltersPanel from '@/components/Sidebar/FiltersPanel.vue';
  import Sidebar from './components/Sidebar.vue';

  @Component({
    components: {
      Sidebar,
      FiltersPanel
      // PlayerHome,
      // LandingPage
    },
  })
  export default class AdminList extends Vue {

    // @Prop({ required: true }) readonly model!: string;

    meta = {fields:{}};

    entries = [];

    count = 0;
    
    searchText = '';
    
    mounted() {
      // Get the details for the chosen model
      fetch(`/admin-api/meta/${this.$route.params.type}`)
        .then(res => res.json())
        .then(json => {
          this.meta = json;
        })
        .catch(err => {console.log(err);});

      // Get entries for the chosen model
      fetch(`/admin-api/content/${this.$route.params.type}`)
        .then(res => res.json())
        .then(json => {
          this.entries = json.entries;
          this.count = json.count;
        })
        .catch(err => {console.log(err);});
    }

    navigateToEditPage(item: any) {
      console.log(item);
      // this.$router.push(`/admin-api/content/${this.$route.params.type}/${item.id}`);
    }

    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }

    get pageTitle() {
      const string = this.$route.params.type;
      return `${string.charAt(0).toUpperCase() + string.slice(1)}`;
    }

    get flatList() {
      return this.entries;
    }

    get flatFields() {
      return this.meta.fields;
    }
    
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/_variables.scss';
  // @import '@/styles/_bootswatch.lux.scss';

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
    max-width: calc(100vw - 300px);
    padding: 32px;
    // grid-template-columns: 1fr 1fr;
    // grid-template-rows: 1fr 1fr;
    // grid-gap: 20px;
    // margin: 10%;
  }

  .content {
    background-color: $primary;
    padding: 16px;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .table {
    height: 100%;
    overflow-x: scroll;
  }

  .table-cell {
    display: flex;
    align-items: center;
    max-height: 3rem;
    overflow: scroll;
  }

  // td, th {
  //   width:150px !important;
  //   height:75px !important;
  //   max-width:150px !important;
  //   max-height:75px !important;
  //   min-width:150px !important;
  //   min-height:75px !important;
  // }

  .content header {
    position: sticky;
  }

  .actions {
    display: flex;
    flex-direction: row;

    h1 {
      flex-grow: 2;
      font-size: 2rem;
    }
  }

</style>
