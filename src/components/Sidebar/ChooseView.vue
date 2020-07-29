<template>
  <b-form-radio-group class="mt-2" v-model="$vxm.pagination.navigation" :options="options" stacked>
  </b-form-radio-group>
</template>
<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
  export default class ChooseView extends Vue {
    options= [
      { value: 0, text: 'Pages' },
      { value: 1, text: 'Scroll' },
    ];

    @Watch('$vxm.pagination.navigation')
    updateStorage() {
      if (localStorage) {
        localStorage.pagination_method = JSON.stringify(this.$vxm.pagination.navigation);
      }
    }
  }
</script>