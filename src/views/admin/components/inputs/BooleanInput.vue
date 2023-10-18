<template>
  <!-- DateTime input -->
  <b-form-datepicker 
    v-if="field.format == 'unixTimestamp'"
    :id="fieldKey"
    :v-model="value"
  ></b-form-datepicker>
  <b-form-input
    v-else
    :id="fieldKey"
    :v-model="value"
    type="number"
    placeholder=""
    :required="field.required"
    :readonly="field.readonly"
  ></b-form-input>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class BooleanInput extends Vue {
    @Prop({ required: true }) fieldKey: string = '';

    @Prop({ required: true }) field: Record<string,any> = {};

    value = '';
  }
</script>

<style lang="scss" scoped>

</style>
