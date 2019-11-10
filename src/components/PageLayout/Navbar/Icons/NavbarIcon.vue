<template>
  <b-nav-dropdown
    class="d-block d-md-inline-block"
    size="lg"
    variant="link"
    toggle-class="px-0 text-decoration-none"
    no-caret
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
  export default class NavbarIcon extends Vue {}
</script>

<style lang="scss" scoped>
::v-deep img {
  width: 28px;
}
</style>
