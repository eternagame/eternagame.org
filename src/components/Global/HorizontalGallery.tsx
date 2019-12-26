import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';

@Component({
  components: {

  },
})
export default class Gallery extends Vue {
  functional = true;

  public render(h: CreateElement) {
    return (
      <div class="d-flex">
        <horizontal-gallery-arrow direction="left"/>
        <b-form-row class="row-eq-height">
          {(this.$slots.default || []).map(vnode => <b-col cols="3" md="4" sm="12">{[vnode]}</b-col>)}
        </b-form-row>
        <horizontal-gallery-arrow direction="right"/>
      </div>
    );
  }
}
