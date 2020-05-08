<template>
  <b-nav-dropdown
    right
    class="d-block d-md-inline-block dropdown"
    size="lg"
    variant="link"
    toggle-class="px-0 text-decoration-none"
    no-caret
    @show="onShow"
  >
    <template #button-content>
      <div>
        <slot name="icon"></slot>
        <span class="d-md-none">
          <slot name="text"></slot>
        </span>
      </div>
    </template>
    <slot></slot>
  </b-nav-dropdown>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class NavbarIcon extends Vue {
    onShow() {
      this.$emit('shown');
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep img {
    width: 35px;
    height: 35px;
  }

  ::v-deep a {
    padding-right: 10px !important;
    padding-left: 10px !important;
    border-radius: 3px;
  }
</style>
