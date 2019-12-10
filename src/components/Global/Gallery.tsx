import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';
import GalleryColumn from './GalleryColumn.vue';

@Component({
  components: {
    GalleryColumn,
  },
})
export default class Gallery extends Vue {
  functional = true;

  public render(h: CreateElement) {
    return (
      <b-form-row class="row-eq-height">
        {(this.$slots.default || []).map((vnode) => <GalleryColumn>{[vnode]}</GalleryColumn>)}
      </b-form-row>
    );
  }
}
