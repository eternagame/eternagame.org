import { Prop, Vue, Component } from 'vue-property-decorator';

@Component class SidebarPanelMixin extends Vue {
  @Prop({ required: true })
  isInSidebar!: boolean;
}
export default SidebarPanelMixin;
