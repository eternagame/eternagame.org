import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';
import CarouselSlide from './CarouselSlide.vue';

@Component({
  components: {},
})
export default class Carousel extends Vue {
  functional = true;
  @Prop() private md!: string;

  @Prop() private sm!: string;

  public render(h: CreateElement) {
    const { md, sm } = this;
    return (
      <div>
        <h1>Hi</h1>
        <b-carousel class="row-eq-height">
          {(this.$slots.default || []).map((vnode) => (
            <CarouselSlide props={{ md, sm }}>{[vnode]}</CarouselSlide>
          ))}
        </b-carousel>
      </div>
    );
  }
}
