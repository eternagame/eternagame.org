<template>
    <div style="text-align: center;">
        <span>
            <b-button @click="$emit('input', !value)"
            variant="outline-info" size="sm">{{value ? 'READ LESS': 'READ MORE'}}</b-button>
        </span>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {

    },
  })
  export default class ReadMore extends Vue {
    @Prop()
    value!: boolean;
  }
</script>

<style scoped lang="scss">
    span:after, span:before {
    content: '';
        display: inline-block;
        width: 100px;
        height: 1px;
        background: var(--med-blue);
        vertical-align: 25%;
    }

    a {
      color: var(--med-blue) !important;
    }
</style>
