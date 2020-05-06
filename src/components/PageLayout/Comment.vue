<template>
  <div class="d-flex">
    <img src="@/assets/navbar/DefaultIcon.svg" />
    <div>
      <p style="font-weight:bold">{{ name }}</p>
      <p>{{ created }}</p>
      <p>{{ comment }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueDOMPurifyHTML from 'vue-dompurify-html';

  Vue.use(VueDOMPurifyHTML);

  @Component({
    components: {},
  })
  export default class Comment extends Vue {
    @Prop()
    private name!: string;

    @Prop()
    private created!: string;

    @Prop()
    private comment!: string;
  }
</script>

<style scoped lang="scss">
  .header-content {
    bottom: 10px;
    left: 10px;
  }

  .body {
    padding: 40px 30px 5px;
  }
</style>
