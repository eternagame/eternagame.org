import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component({
  components: {

  },
})
export default class Gallery extends Vue {
  functional = true;

  public render(h: CreateElement) {
    return (
      <b-form-row class="row-eq-height">
        {(this.$slots.default || []).map((vnode) => <b-col class="mb-2" cols="12" sm="6" md="4">{[vnode]}</b-col>)}
      </b-form-row>
    );
  }
}
