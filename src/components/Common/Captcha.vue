<template>
  <div>
      <div v-if="!altchaResponse">
        Verifying you are human... <b-spinner small />
      </div>
      <div v-else>
        Verified you are human <img src="@/assets/noun_check.svg" alt="cleared" />
      </div>
  </div>
</template>
<script lang="ts">
  import { solveChallenge } from 'altcha-lib';
  import { Challenge, Payload } from 'altcha-lib/dist/types';
  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component({})
  export default class Captcha extends Vue {
    altchaResponse: Payload[] | '' = '';

    aborts: AbortController[] = [];

    @Watch('altchaResponse')
    maybeEmit() {
      if (this.altchaResponse) {
        this.$emit('response', {
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
