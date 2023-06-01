<template>
  <router-link :to="`/scripts/${nid}`">
    <div class="page-content card">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-9 p-0">
            <div>
              <h3 class="p-0 card-title mr-2" style="display: inline">{{ title }}</h3>
              <div class="text-muted" style="display: inline">{{ type }}</div>
            </div>
            <div v-dompurify-html="strippedBody(body)" class="text" />
          </div>
          <div class="col p-0" style="text-align:right">
            <div class="b" style="opacity: 0.5;">{{ created }}</div>
            <div><span v-b-tooltip.hover title="Trusted author" v-if="is_trusted === '1'">✔&nbsp;</span>{{ author.name }}</div>
            <div v-if="is_favorite === '1'">★ Favorite</div>
            <div v-if="is_private === '1'">Private</div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Utils from '@/utils/utils';

  @Component({
    components: {},
  })
  export default class NewsCard extends Vue {
    @Prop({ required: true }) readonly created!: string;

    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly body!: string;

    @Prop({ required: true }) readonly nid!: string;

    @Prop({ required: true }) readonly author!: {uid: number; name: string;};

    @Prop({ required: true }) readonly is_private!: string;

    @Prop({ required: true }) readonly is_favorite!: string;

    @Prop({ required: true }) readonly is_trusted!: string;

    @Prop({ required: true }) readonly type!: string;

    strippedBody = Utils.strippedBody;
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.btn {
  display: inline-block;
  width: 48%;
  margin-bottom: 0px;
}

:deep(.card-body) {
  padding: 11.25px !important;
}

.card-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0.4rem 0;
  color: $white;
}

.b {
  font-weight: bold;
}

.card {
  color: $white;

  padding: 1rem 2rem;
  margin-bottom: 0.5rem;
  max-height: 600px;
  transition: background-color 0.5s ease;
}

.card:hover {
  background-color: #21508c;
}

a:hover {
  text-decoration: none;
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
