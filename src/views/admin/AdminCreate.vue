<template>
  <div class="adminPage">
    <Sidebar></Sidebar>
    <main>
      <h1>Create {{meta.name}}</h1>
      <b-form @submit="onSubmit">
        <b-form-group 
          v-for="(field, key) in meta.fields" :key="key"
          :id="key"
          :label="field.name"
          :label-for="key"
          :description="field.description"
        >
          <!-- <pre>{{ field }}</pre> -->
          <!-- TYPE: STRING-->
          <StringInput  v-if="field.type === 'String'" v-model="form[key]" :field="field" :fieldKey="key"></StringInput>
          
          <!-- TYPE: INT-->
          <IntInput v-if="field.type === 'Int'" v-model="form[key]" :field="field" :fieldKey="key"></IntInput>
          
          <!-- TYPE: BOOLEAN-->
          <BooleanInput v-if="field.type === 'Boolean'" v-model="form[key]" :field="field" :fieldKey="key"></BooleanInput>
        </b-form-group>

        <b-button type="submit" variant="primary">Save</b-button>
        <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>
    </main>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  // import { BSidebar } from 'bootstrap-vue';
  import { BIconArrowRightCircle, BIconChevronRight } from 'bootstrap-vue';
  import Sidebar from './components/Sidebar.vue';
  import StringInput from './components/inputs/StringInput.vue';
  import IntInput from './components/inputs/IntInput.vue';
  import BooleanInput from './components/inputs/BooleanInput.vue';

  @Component({
    components: {
      Sidebar,
      StringInput,
      IntInput,
      BooleanInput,
      BIconArrowRightCircle,
      BIconChevronRight
      // PlayerHome,
      // LandingPage
    },
  })
  export default class AdminCreate extends Vue {
    form:Record<string, any> = {};

    meta = {fields: {}};

    mounted() {
      // Get the details for the chosen model
      fetch(`/admin-api/meta/${this.$route.params.type}`)
        .then(res => res.json())
        .then(json => {
          this.meta = json;
          
          Object.entries(json.fields).forEach(([key]) => {
            this.form[key] = "";
          });
        })
        .catch(err => {console.log(err);});
    }

    onSubmit(event: any) {
      event.preventDefault();
      fetch(`/admin-api/content/${this.$route.params.type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      }).then(res => res.json())
        .then(json => {
          console.log("Success:", json);
          this.$router.push(`/admin/${this.$route.params.type}`);
        })
        .catch(err => console.log(err));
    }

    // onReset(event) {
    //   event.preventDefault();
    //   // Reset our form values
    //   this.form.email = '';
    //   this.form.name = '';
    //   this.form.food = null;
    //   this.form.checked = [];
    //   // Trick to reset/clear native browser form validation state
    //   this.show = false
    //   this.$nextTick(() => {
    //     this.show = true;
    //   });
    // }
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
    font-size: 2rem;
    margin-top: 32px;
    width: 100%;
  }

  router-link {
    width: 100%;

    @include media-breakpoint-up(lg) {
      width: 30%;
    }
  }

  .content-list {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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

    h2 {
      font-size: 1.8rem;
      color: #7b8a8b;
    }

    span { color: #7b8a8b; }

    .bi-arrow-right-circle { color: #7b8a8b; font-size: 1.5rem; }
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

  // DEBUGGING
  pre {
    color: white;
  }
</style>
