<template>
  <div class="card">
    <p>To :</p>
    <tags-input v-model="tag" :tags="tags" @tags-changed="newTags => (tags = newTags)"></tags-input>
    <EditField />
    <b-button type="submit" style="width:300px" variant="primary">{{
      $t('news-view:new-activity-main-action')
    }}</b-button>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import EditField from '@/components/Common/EditField.vue';
  // @ts-ignore
  import VueTagsInput from '@johmun/vue-tags-input';

  @Component({
    components: {
      EditField,
      'tags-input': VueTagsInput,
    },
  })
  export default class ActivityCard extends Vue {
    @Prop({
      default: `Help us make better citizen science games in only 15 minutes
  Several citizen science games from Foldit to Eyewire to Eterna to Phylo are celebrating years of productive science — now we’re getting together to try to get even better. Here’s the next step. Northeastern University researchers are conducting a…`,
    })
    private text!: string;

    @Prop({ default: 'blogs' }) private category!: string;

    @Prop({
      default:
        'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/A629FBC0-9F20-4067-AE83-13160670F883.png',
    })
    private img!: string;

    @Prop({ default: 'Help us make better citizen science games in only 15 minutes' })
    private heading!: string;

    private tag = '';

    private tags = [];
  }
</script>

<style lang="scss" scoped>
  ::v-deep .card-body {
    padding: 11.25px !important;
  }

  .card {
    margin-bottom: 50px;
    padding: 20px 10px;
    background-color: #101010;
  }
</style>
