<template>
  <b-modal
    ref="modal"
    title="Achievement Unlocked"
    body-class="py-0 mx-auto text-center"
    header-border-variant="primary"
    hide-footer
    @hidden="onHidden"
  >
    <template v-if="achievement">
      <h6>{{achievement.title}}</h6>
      <img :src="achievement.image" />
      <br/>
      <p>{{achievement.desc}}</p>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import { RefreshAchievement } from '@/types/common-types';
  import { BModal } from 'bootstrap-vue';
  import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';

  @Component({})
  export default class AchievementModal extends Vue {
    @Ref() readonly modal!: BModal;

    achievement: RefreshAchievement | null = null;

    @Watch('$vxm.user.newAchievements')
    showNewAchievement() {
      if (this.$vxm.user.newAchievements.length) {
        [this.achievement] = this.$vxm.user.newAchievements;
        this.modal.show();
      } else this.achievement = null;
    }

    onHidden() {
      this.$vxm.user.newAchievements.shift();
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .modal-header {
    -webkit-backdrop-filter: blur(28.125px);
    backdrop-filter: blur(28.125px);
    background-color: #4a90e2;
    padding: 8.4375px;

    .modal-title {
      font-size: 15px;
      font-weight: bold;
      line-height: 1.38;
      margin: 0 auto;
      padding-left: 28.125px;
      text-transform: uppercase;
      text-align: center;
    }

    .close {
      opacity: 0.5;
      color: var(--white);
      margin-left: 0;

      &:focus {
        outline: none;
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }

  ::v-deep .modal-dialog {
    max-width: 375px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .modal-body {
      padding: 0 32.8125px;
      margin-top: 22.5px;

      img {
        width: 10rem;
        padding: 1rem 0;
      }
    }
  }
</style>
