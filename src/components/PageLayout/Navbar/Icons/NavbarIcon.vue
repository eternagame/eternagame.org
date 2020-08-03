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
        <span class="d-md-none mx-2">
          <slot name="text"></slot>
        </span>
      </div>
    </template>
    <!-- The default scope slot has the ability to hide the dropdown: 
    https://bootstrap-vue.org/docs/components/nav#comp-ref-b-nav-item-dropdown-slots -->
    <template v-slot="hideDropdown">
      <slot :hide-dropdown="hideDropdown"></slot>
    </template>
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
  ::v-deep .nav-link.dropdown-toggle {
    padding-left: 10px !important;
    padding-right: 10px !important;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  ::v-deep .dropdown-toggle:focus {
    border-radius: 0.5rem;
  }
</style>
