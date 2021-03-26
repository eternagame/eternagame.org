<template>
  <b-col cols="12" class="col-md-4 col-sm-6 list-item-container card">
    <a href="item.link" target="_blank">
      <img
        :src="getImgUrl(item.imgRef)"
        :alt="item.imgAlt"
        class="graphic"
      />
      <p class="year">
        {{ $t(item.date) }}
      </p>
      <h4 class="header">
        {{ $t(item.title) }}
      </h4>
      <p class="source">
        {{ $t(item.source) }}
      </p>
    </a>
  </b-col>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {AboutPublicationItem} from '@/types/common-types';

  @Component({})
  export default class AboutPublicationCard extends Vue {
    @Prop({ required: true }) readonly item!: AboutPublicationItem;

    getImgUrl(path: string) {
      const images = require.context('@/assets/about', false, /\.jpg$/);
      return images(`./${  path  }.jpg`);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  $breakpoint-small: 768px;
  
  .list-item-container {
    width: 100%;
    max-width: 300px;
    padding: 0;
    margin: 0 10px;
    background-color: #043468;
    border-radius: 5px;
    box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
      2px 2px 3px 0px rgb(94 93 102 / 10%);
    transition: box-shadow 0.15s ease-in-out;

    & a {
      padding: 10px;
      padding-bottom: 50px;
    }

    &:hover {
      box-shadow: 1px 1px 0px 0px rgb(94 93 102 / 8%),
      2px 5px 10px 0px rgb(94 93 102 / 10%);
    }

    @media (max-width: $breakpoint-small) {
      margin-bottom: 3rem;
    }
  }
  .graphic {
    width: 100%;
    height: 167px;
    border-radius: 2.5px;
    margin-bottom: 0.69rem;
  }
  .year {
    font-size: 0.875rem;
    color: #ffffff;
  }
  .header {
    font-size: 1rem;
    color: #ffffff;
    font-weight: bolder;
  }
  .source {
    position: absolute;
    bottom: 0;
    color: #ffffff;
    font-style: italic;
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
