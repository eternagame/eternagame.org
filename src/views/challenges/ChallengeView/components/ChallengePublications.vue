<template>
  <div v-if="challenge">
    <div class="challenge-publications">
      <h4 class="header">
        Publications
      </h4>
      <div>
        <div
          v-for="(publication, i) in challenge.publications"
          :key="i"
          class="publication"
        >
        <div class="row">
          <div class="publication-image col-sm-4 order-2 order-sm-1">
            <img v-if="publication.image" :src="`/sites/default/files/${publication.image}`" alt="" />
            <div v-else class="publication-image-placeholder">
              <img class="publication-image-placeholder-image" src="@/assets/logomark_eterna.svg" alt="" />
            </div>
          </div>
          <div class="publication-info col-sm order-1 order-sm-2">
            <h5 class="publication-title">
              <a
                v-if="publication.link"
                :href="publication.link"
                target="_blank"
              >
                {{ publication.title }}
              </a>
              <span v-else>{{ publication.title }}</span>
            </h5>
            <p class="publication-details">
              <a
                v-if="publication.pdf_link"
                class="publication-details-journal"
                :href="publication.pdf_link"
                target="_blank"
              >
                {{ publication.journal }}
              </a>
              <span
                v-else
                class="publication-details-journal"
              >
                {{ publication.journal }}
              </span>
              - {{ publication.pub_date }}
            </p>
            <p class="publication-overview" v-dompurify-html="publication.authors"></p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ChallengeData } from '@/views/challenges/ChallengeView/types';

  @Component({
    components: {},
  })
  export default class ChallengePublications extends Vue {
    @Prop({ required: true }) readonly challenge!: ChallengeData;
  }
</script>

<style scoped lang="scss">
  .challenge-publications {
    border-bottom: 1px solid #14467d;
  }

  .header {
    margin-bottom: 2rem;
  }

  .publication {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2.5rem;

    &-image {
      position: relative;
      text-align: center;
      flex-basis: 100%;
      flex-grow: 0;
      flex-shrink: 0;

      & > img {
        width: 80%;
      }

      &-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10%;
        width: 80%;
        height: 60%;
        min-height: 100px;
        border-radius: 5px;
        background-color: #041227;

        &-image {
          height: 50px;
        }
      }
    }

    &-info {
      margin-left: 2rem;
    }

    &-title {
      font-size: 1rem;
      font-weight: 700;

      & a {
        color: #ffffff;
      }
    }

    &-details {
      font-size: 0.8rem;
      font-weight: 700;

      &-journal {
        color: #F39C12;
      }
    }

    &-overview {
      font-size: 0.8rem;
      margin-bottom: 0;
    }
  }
</style>
