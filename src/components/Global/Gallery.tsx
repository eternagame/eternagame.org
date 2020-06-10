import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import GalleryColumn from './GalleryColumn.vue';

@Component({
  components: {},
})
export default class Gallery extends Vue {
  functional = true;

  @Prop() readonly md?: string;

  @Prop() readonly sm?: string;

  public render(h: CreateElement) {
    const { md, sm } = this;
    return (
      <b-form-row class="row-eq-height">
        {(this.$slots.default || []).map(vnode => (
          <GalleryColumn props={{ md, sm }}>{[vnode]}</GalleryColumn>
        ))}
      </b-form-row>
    );
  }
}
