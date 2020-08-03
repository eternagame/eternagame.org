<template>
  <transition name="slide">
    <div ref="mobileSidebar" class="mobile-sidebar  d-lg-none" v-show="isOpen">
      <nav>
        <div class="d-flex justify-content-end">
          <button class="btn p-0" @click="isOpen = false">
            <img src="@/assets/sidebar/Cross.svg" class="cross-icon" />
          </button>
        </div>
        <slot></slot>
      </nav>
    </div>
  </transition>
</template>

<script lang="ts">
  import { Component, PropSync, Vue, Watch, Ref } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class MobileSidebar extends Vue {
    @Ref() mobileSidebar!: HTMLDivElement;

    @PropSync('show', {required: true}) isOpen!: boolean;

    mounted() {
      document.addEventListener('click', this.onDocumentClick);
    }

    beforeDestroy() {
      document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick(event: Event) {
      const element = event.srcElement as HTMLElement;
      if (
        element &&
        !element.classList.contains('sidebar') &&
        !this.mobileSidebar.contains(element)
      ) {
        this.isOpen = false;
      }
    }

    @Watch('$route')
    onRouteChange() {
      this.isOpen = false;
    }
  }
</script>

<style lang="scss" scoped>
  .mobile-sidebar {
    height: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    background-color: #101010;
    overflow-x: hidden;
    width: 250px;
    padding: 15px 22.5px;
    z-index: 2000;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: right 0.5s;
  }
  .slide-enter,
  .slide-leave-to {
    right: -250px;
  }
</style>
