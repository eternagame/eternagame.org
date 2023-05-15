<template>
  <b-button-group class="mt-2">
    <b-button
      @click="$vxm.pagination.navigation = 0"
      :class="{ enabled: $vxm.pagination.navigation === 0}"
      title="Navigate with pages"
      aria-label="pages"
    >
      <b-icon-file-earmark-plus />
    </b-button>
    <b-button
      @click="$vxm.pagination.navigation = 1"
      :class="{ enabled: $vxm.pagination.navigation === 1}"
      title="Navigate with infinite scroll"
      aria-label="scroll"
    >
      <b-icon-arrow-down />
    </b-button>
  </b-button-group>
</template>
<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator';
  import { BIconFileEarmarkPlus, BIconArrowDown } from 'bootstrap-vue';

  @Component({
    components: {
      BIconFileEarmarkPlus,
      BIconArrowDown,
    }
  })
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
<style lang="scss" scoped>
@import '@/styles/global.scss';
button.enabled {
  background-color: darken($secondary, 15%);
  border-color: darken($secondary, 15%)
}
</style>
