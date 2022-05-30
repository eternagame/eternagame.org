<template>
  <div>
    <div class="center">
      <img
        :src="image"
        :alt="title"
        :class="{ 'achievement--thumbnail__grayscale': isAchieved }"
        @click="$emit('handler')"
      />
      <div v-if="getLevels() != 0">
        {{getLevels()}}
      </div>
    </div>
    <p class="caption">{{ title }}</p>
  </div>
</template>

<script lang="ts">
  import { ProfileAchievement } from '@/types/common-types';
  import { Component, Vue, Prop } from 'vue-property-decorator';


  @Component({
    components: {},
  })
  export default class AchievementCard extends Vue {
    @Prop({ required: true }) readonly image!: string;

    @Prop({ required: true }) readonly title!: string;

    @Prop({ required: true }) readonly isAchieved!: boolean;

    @Prop({required: false}) readonly achievement!: ProfileAchievement;

    getLevels(): number {
      if (!Object.prototype.hasOwnProperty.call(this.achievement, 'title')) {
        return Object.values(this.achievement).length;
      } 
      return 0;
    
    }

  }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
img {
  max-width: 80%;
  width: 200px;
  margin: 1rem auto;
  transition: ease 0.3s;
  // Fix Safari image height: https://stackoverflow.com/questions/10760243/safari-image-size-auto-height-css
  align-self: flex-start;
}
.center:hover img {
  max-width: 100%;
  width: 250px;
  margin: 0rem auto;
}

.center {
  display: flex;
  justify-content: center;
}

.caption {
  visibility: hidden;
  opacity: 0;
  transition: ease 0.3s;

  color: $yellow;
  font-weight: bold;
  text-align: center;

  background-color: $dark-blue;
  border-radius: 0.3rem 0.3rem;
  border: solid 1px $yellow;
  padding: 0.3rem;

  // Center the caption, and place it below image.
  z-index: 3;
  position: absolute;
  top: 100%;
  left: 50%;
  width: 100%;
  margin-left: -50%;
}
.center:hover + .caption {
  visibility: visible;
  opacity: 1;
}
.achievement--thumbnail__grayscale {
  filter: grayscale(100%);
}
</style>
