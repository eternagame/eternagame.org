<template>
  <div class="read-more" style="text-align: center;">
    <span>
      <b-button @click="$emit('input', !value)" variant="outline-info" size="sm" class="text-uppercase">
        {{ value ? $t('read-more:read-less') : $t('read-more:read-more') }}
      </b-button>
    </span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class ReadMore extends Vue {
    @Prop({ required: true }) readonly value!: boolean;
  }
</script>

<style scoped lang="scss">
  .read-more {
    margin: 20px 0px;
    margin-bottom: 10px;
    width: 100%;
  }

  span:after,
  span:before {
    content: '';
    display: inline-block;
    width: calc(50% - 50px);
    height: 1px;
    background: var(--med-blue);
    vertical-align: 25%;
  }

  a {
    color: var(--med-blue) !important;
  }
</style>
