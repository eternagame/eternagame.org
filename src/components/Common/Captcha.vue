<template>
  <div>
    <vue-recaptcha
        ref="recaptcha"
        sitekey="6LcFwUsUAAAAAOQ9szhauSNv2bJuBOUtw_pGrRnd"
        recaptchaHost="www.recaptcha.net"
        :loadRecaptchaScript="true"
        @verify="recaptchaResponse = $event"
      />
      <div v-if="!altchaResponse">
        Completing secondary verification... <b-spinner small />
      </div>
  </div>
</template>
<script lang="ts">
  import { solveChallenge } from 'altcha-lib';
  import { Challenge, Payload } from 'altcha-lib/dist/types';
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import VueRecaptcha from 'vue-recaptcha';

  @Component({
    components: {
      VueRecaptcha,
    },
  })
  export default class Captcha extends Vue {
    recaptchaResponse = '';

    altchaResponse: Payload[] | '' = '';

    aborts: AbortController[] = [];

    @Watch('recaptchaResponse')
    @Watch('altchaResponse')
    maybeEmit() {
      if (this.altchaResponse) {
        this.$emit('response', {
          recaptcha: this.recaptchaResponse,
          altcha: this.altchaResponse
        });
      }
    }

    async mounted() {
      const challenges: {altcha: Challenge[]} = (await this.$http.get('/get/antispam_challenge')).data;
      const solves = challenges.altcha.map(
        (challenge) => ({
          challenge,
          ...solveChallenge(challenge.challenge, challenge.salt, challenge.algorithm, challenge.maxnumber)
        })
      );
      this.aborts = solves.map((solve) => solve.controller);
      this.altchaResponse = (await Promise.all(solves.map(async ({challenge, promise}) => ({
        challenge,
        solution: await promise
      })))).map(({challenge, solution}) => ({
        algorithm: challenge.algorithm,
        challenge: challenge.challenge,
        number: solution?.number ?? 0,
        salt: challenge.salt,
        signature: challenge.signature
      }));
      this.aborts = [];
    }

    async destroyed() {
      this.aborts.forEach((controller) => controller.abort());
    }
  }
</script>
