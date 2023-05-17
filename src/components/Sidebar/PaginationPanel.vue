<template>
  <div>
    <!--
    <b-button-group>
      <b-button
        @click="$vxm.pagination.navigation = 1"
        :class="{ enabled: $vxm.pagination.navigation === 1}"
        title="Navigate with infinite scroll"
        aria-label="scroll"
      >
        <b-icon-arrow-down />
      </b-button>
      <b-button
        @click="$vxm.pagination.navigation = 0"
        :class="{ enabled: $vxm.pagination.navigation === 0}"
        title="Navigate with pages"
        aria-label="pages"
      >
        <b-icon-file-earmark-plus />
      </b-button>
    </b-button-group>
    <br/><br/>
    -->
    <p style="margin: 0; font-size: 14px;">Showing {{ shownCount }}/{{ totalCount }} results </p>
  </div>
</template>
<script lang="ts">
  import { Component, Watch, Vue, Prop } from 'vue-property-decorator';
  import { BIconFileEarmarkPlus, BIconArrowDown } from 'bootstrap-vue';

  @Component({
    components: {
      BIconFileEarmarkPlus,
      BIconArrowDown,
    }
  })
  export default class PaginationPanel extends Vue {
    @Prop({required: true}) shownCount!: number;

    @Prop({required: true}) totalCount!: number;

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
