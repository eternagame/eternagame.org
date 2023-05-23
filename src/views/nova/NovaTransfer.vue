<template>
    <EternaPage>
      <div class="overview">
        <h2 class="overview-title">
          Eterna is a citizen science game that recruits players to design RNA molecules for
          biomedical research.
        </h2>
        <h3 class="overview-subtitle text-muted">
          Take your next steps on your RNA puzzle-solving journey and join the Eterna community.
        </h3>
      </div>
      <div class="details">
        <b-card>
          <p>
            Register or log in to your Eterna account to claim your NOVA Labs badge and 5000 points, then
            continue playing and participate in exciting challenges to advance science. To learn more,
            check out the <router-link to="/about">About Eterna</router-link> page.
          </p>
          <div class="actions">
            <b-btn
              v-if="$vxm.user.loggedIn"
              variant="primary"
              @click="transfer"
              :disabled="pending"
            >
              Transfer Your Credit
              <b-spinner v-if="pending" small></b-spinner>
            </b-btn>
            <b-btn variant="primary" v-b-modal.modal-register v-if="!$vxm.user.loggedIn">Register</b-btn>
            <b-btn variant="primary" v-b-modal.modal-login v-if="!$vxm.user.loggedIn">Log In</b-btn>
          </div>
        </b-card>
      </div>
    </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';

  @Component({
    components: {
      EternaPage,
    },
  })
  export default class NovaTransfer extends Vue {
    pending = false;

    async transfer() {
      this.pending = true;
      await this.$http.post('/login/', new URLSearchParams({
        name: this.$vxm.user.username ?? '',
        type: 'novatransfer'
      }));
      this.$router.push('/');
    }

    @Watch('$vxm.user.newAchievements')
    achievementsUpdated(newAchievements: {title: string}[]) {
      if (newAchievements.some(ach => ach.title.includes('NOVA'))) {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="scss">
  .overview {
    max-width: 820px;
    margin: 2rem auto;
  }

  .overview-title {
    font-size: 1.9rem;
    line-height: 2.5rem;
  }

  .overview-subtitle {
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: normal;
  }

  h2 {
    line-height: 4rem;
    font-size: 2rem;
    font-weight: bold;
  }

  .details {
    max-width: 620px;
    margin: auto;
  }

  .actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
</style>
