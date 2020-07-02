<template>
  <div class="script-list-item">
    <div class="script-list-item-head">
      <router-link :to="`/script/${script.nid}`">
      <h5 class="script-list-item-title">{{script.title}}</h5>
      </router-link>
      <router-link :to="`/players/${script.uid}`">
      <h5 class="script-list-item-user">
        {{script.author.name}}</h5>
      </router-link>
    </div>
    <div class="script-list-item-body">
      <div class="script-list-item-info">
        <p class="script-list-item-type">{{script.type}}</p>
        <p class="script-list-item-success">{{script.success_rate || ''}}</p>
      </div>
      <p class="script-list-item-desc" v-html="script.body" />
      <p class="script-list-item-date">{{script.created}}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class ScriptCard extends Vue {
    @Prop()
    script !: {
      title: string,
      body: string,
      created: string,
      author: {
        name: string,
      },
      uid: string,
      success_rate: string,
    };
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .script-list-item-user, .script-list-item-date {
    float: right;
  }
  .script-list-item {
    max-width: 800px;
    width: 100%;
    background-color: $med-dark-blue;
    border-radius: 5px;
    margin: 8px;
    padding: 5px;
    overflow: hidden;
  }
  .script-list-item-head, .script-list-item-body {
    width: 100%;
    overflow: hidden;
  }
  .script-list-item-title, .script-list-item-desc, .script-list-item-type {
    float: left;
    width: calc(100% - 100px);
  }
  .script-list-item-title {
    width: calc(100% - 175px);
  }
  .script-list-item-user, .script-list-item-date, .script-list-item-success {
    float: right;
  }
  p {
    margin-bottom: 0;
  }
</style>