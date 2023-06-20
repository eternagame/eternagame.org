import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { debounce } from 'lodash';
import GalleryColumn from './GalleryColumn.vue';

@Component({
  components: {},
})
export default class Gallery extends Vue {
  functional = true;

  @Prop() readonly md?: string;

  @Prop() readonly sm?: string;

  @Prop({ default: false }) readonly setCur!: string;

  mounted() {
    if (this.setCur) window.addEventListener('scroll', this.boundScrollHandler);
  }

  beforeDestroy() {
    if (this.setCur) window.removeEventListener('scroll', this.boundScrollHandler);
  }

  @Watch('setCur')
  setCurChanged(newVal: boolean) {
    if (newVal) {
      window.addEventListener('scroll', this.boundScrollHandler);
    } else {
      window.removeEventListener('scroll', this.boundScrollHandler);
    }
  }

  private scrollHandler() {
   const children = this.$vnode.componentInstance?.$children || [];
   const firstRowChild = children[0];
   const firstTop = firstRowChild?.$el.getBoundingClientRect().top || 0;
   const nextRowChild = children.find(
    (child) => child.$el.getBoundingClientRect().top !== firstTop
   );
   const nextTop = nextRowChild?.$el.getBoundingClientRect().top || firstTop;
   const cur = (() => {
    // We only have one row - not only can we not make any assumptions about where the
    // next row is, we don't need to!
    if (!nextRowChild) return 0;

    // The first row is the first one in the viewport
    if (firstTop > 0) return 0;

    const rowHeight = nextTop - firstTop;
    const rowsOffscreen = Math.ceil(-(firstTop / rowHeight));

    const columnCount = children.indexOf(nextRowChild);
    return rowsOffscreen * columnCount;
   })();

   const {cur: oldCur, ...query} = this.$route.query;
   if (cur.toString() !== (oldCur || '0')) {
    this.$router.replace({
      name: this.$route.name!,
      query: {
        ...query,
        ...(cur !== 0 ? {cur: cur.toString()} : {})
      },
      params: { keepScroll: 'true' }
    }).catch(e => e);
   }
  }

  private boundScrollHandler = debounce(this.scrollHandler.bind(this), 100);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public render(h: CreateElement) {
    const { md, sm } = this;
    this.$nextTick(() => this.scrollHandler());
    return (
      <b-form-row class="row-eq-height">
        {(this.$slots.default || []).map(vnode => (
          <GalleryColumn props={{ md, sm }}>{[vnode]}</GalleryColumn>
        ))}
      </b-form-row>
    );
  }
}
