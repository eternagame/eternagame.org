<template>
  <b-col class="page-content card list-item-container">
    <a target="_blank" :href="item.link">
      <div>
        <div class="download-button">
            <img
            src="@/assets/about/download-icon.svg"
            alt="eterna download icon"
            class="download-button__icon"
            />
        </div>
        <h4 class="header">
        {{ $t(item.title) }}
        </h4>
        <p class="description">
        {{ $t(item.description) }}
        </p>
      </div>
    </a>
  </b-col>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {AboutMediaItem} from '@/types/common-types';

  @Component({})
  export default class AboutMediaCard extends Vue {
    @Prop({ required: true }) readonly item!: AboutMediaItem;
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .list-item-container {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0 10px;
    margin-bottom: 20px;
    background-color: #043468;
    border-radius: 5px;
    box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
    2px 2px 3px 0px rgb(94 93 102 / 10%);
    transition: box-shadow 0.15s ease-in-out;

    & a {
      padding: 10px 20px;
      padding-top: 20px;
    }

    &:hover {
    box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
    2px 5px 10px 0px rgb(94 93 102 / 10%);
    }
  }
  .download-button {
      position: absolute;
      top: 15px;
      right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      width: 30px;
      height: 30px;
      border-radius: 15px;

      &__icon {
          width: 12px;
          height: 12px;
      }
  }
  .header {
      color: #ffffff;
      font-size: 1rem;
      font-weight: bolder;
      margin-bottom: 30px;
  }
  .description {
      color: #ffffff;
      font-size: 0.875rem;
  }
  .card {
    color: $white;
    margin-bottom: 1.5rem;
    max-height: 600px;
    // cursor: pointer;
    transition: background-color 0.5s ease;
  }

  .card:hover {
    background-color: #21508c;
  }

  a:hover {
    text-decoration: none;
  }
</style>
