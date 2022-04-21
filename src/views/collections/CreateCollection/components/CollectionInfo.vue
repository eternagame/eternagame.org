<template>
  <div>
    <h2>{{ $t('create-collection:collection-info:header') }}</h2>

    <h3>{{ $t('create-collection:collection-info:title') }}</h3>
    <input
      :placeholder="$t('create-collection:collection-info:title-description')"
      v-model="title"
      @input="$emit('update:title', title)"
    />

    <h3>{{ $t('create-collection:collection-info:description') }}</h3>
    <b-textarea
      :placeholder="
        $t('create-collection:collection-info:description-description')
      "
      v-model="body"
      @input="$emit('update:body', body)"
      rows="12"
      max-rows="12"
      no-resize
    ></b-textarea>
    <h3>
      {{ $t('create-collection:collection-info:image') }}
      <span style="font-weight: normal">{{
        $t('create-collection:collection-info:image-optional')
      }}</span>
    </h3>
    <img :src="picture" class="collection-image" />
    <div class="input-group">
      <input type="file" @change="handleFile" hidden ref="fileUpload" />
      <button type="button" class="btn secondary" @click="fileUpload.click()">
        {{ $t('create-collection:collection-info:image-button-text') }}
      </button>
    </div>
    <p>
      {{ $t('create-collection:collection-info:image-tip') }}
    </p>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop, Ref } from 'vue-property-decorator';
  import Utils from '@/utils/utils';

  @Component({})

  export default class CollectionInfo extends Vue {
    @Prop() title!: string;

    @Prop() body!: string;

    @Prop() picture!: string;

    private currentPicture?: string;

    private newPicture: File | null = null;

    @Ref('fileUpload') private fileUpload!: HTMLInputElement;

    handleFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.newPicture = file;
      this.picture = URL.createObjectURL(this.newPicture);
      this.$emit('update:image', this.newPicture);
    }

    getImage(nid: string) {
      const image = Utils.getPuzzleMiddleThumbnail(nid);
      return image;
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 7.8px;
  margin-top: 13.8px;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 24px;
}

input {
  background-color: rgba(16, 16, 16, 0.5);
  color: white;
  border: solid 0.6px $dark-blue;
  padding: 13px;
  width: 100%;
  height: 40px;
  vertical-align: top;
}

.secondary {
  background-color: $med-blue;
  width: 124px;
  border-radius: 5px;
  color: white;
  margin-top: 9px;
}

.save {
  width: 185px;
  height: 40px;
  border-radius: 5px;
  margin: 50px 0px;
  font-size: 20px;
  font-weight: bold;
}

.collection-image {
  object-fit: contain;
  margin-right: 20px;
  width: 100px;
  height: 100px;
}

.card {
  background-color: #0a223c;
  margin-top: 10px;
}
</style>
