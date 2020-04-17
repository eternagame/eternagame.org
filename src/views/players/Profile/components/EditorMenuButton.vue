<template>
  <button
    type="button"
    class="btn btn-light"
    :class="activeClass"
    @click.prevent="editorParams.commands[command](args)"
  >
    <slot><i class="fas fa-fw" :class="iconClass"></i></slot>
  </button>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';

  Component.registerHooks(['beforeDestroy']);

  @Component({
    components: {},
  })
  export default class EditorMenuButton extends Vue {
    @Prop({
      required: true,
    })
    command!: String;

    @Prop({
      required: true,
      default: () => {},
    })
    editorParams!: Object;

    @Prop({
      type: Object,
      default: () => {},
    })
    args!: Object;

    @Prop({})
    icon!: String;

    get activeClass() {
      return this.editorParams.isActive[this.command]
        && this.editorParams.isActive[this.command](this.args)
        ? 'active'
        : null;
    }

    get iconClass() {
      return `fa-${this.icon ? this.icon : this.command}`;
    }
  }
</script>

<style scoped>
  .btn {
    font-family: Courier, monospace;
  }
</style>
