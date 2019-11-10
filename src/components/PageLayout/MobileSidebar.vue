<template>
  <transition name="slide">
    <div ref="sidebar" class="sidebar" v-show="isOpen">
      <nav>
        <div class="d-flex justify-content-end">
          <button class="btn cross-button" @click="closeMenu">
            <img src="@/assets/sidebar/Cross.svg" class="cross-icon"/>
          </button>
        </div>
        <slot></slot>
      </nav>
    </div>
  </transition>
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch,
  } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class MobileSidebar extends Vue {
    $refs!: {
      sidebar: HTMLDivElement;
    };

    created() {
      document.addEventListener('click', (event) => {
        const element = event.srcElement as HTMLElement;
        if (element && !element.classList.contains('sidebar') && !this.$refs.sidebar.contains(element)) {
          this.closeMenu();
        }
      });
    }

    isOpen = false;

    openMenu() {
      this.isOpen = true;
    }

    closeMenu() {
      this.isOpen = false;
    }

    @Watch('$route')
    onRouteChange() {
      this.closeMenu();
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    height: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    background-color: #101010;
    overflow-x: hidden;
    width: 250px;
    padding: 10px;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }
  .slide-enter, .slide-leave-to {
    width: 0;
    padding: 10px 0;
  }


</style>
