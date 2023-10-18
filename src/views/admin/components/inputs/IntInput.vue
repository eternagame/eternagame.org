<template>
  <!-- DateTime input -->
  <b-form-datepicker 
    v-if="field.format == 'unixTimestamp'"
    :id="fieldKey"
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
  ></b-form-datepicker>
  <b-form-select 
    v-else-if="field?.choices"
    :options="field.choices.map(option => ({...option, text:option.name}))"
    :id="key"
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    placeholder=""
    :required="field.required"
    :plaintext="field.readonly"
  ></b-form-select>
  <b-form-input
    v-else
    :id="fieldKey"
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
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
  export default class IntInput extends Vue {
    @Prop({ required: true }) fieldKey: string;

    @Prop({ required: true }) field: Record<string,any>;

    value = '';
  }
</script>

<style lang="scss" scoped>

</style>
