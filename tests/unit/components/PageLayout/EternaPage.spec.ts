import {
  shallowMount, mount, Wrapper,
} from '@vue/test-utils';
import BootstrapVue, { EmbedPlugin } from 'bootstrap-vue';
import Vuex, { Store, ActionTree, MutationTree } from 'vuex';
import Vue from 'vue';
import EternaPage from '@/components/PageLayout/EternaPage.vue';
import MobileSidebar from '@/components/PageLayout/MobileSidebar.vue';
import { localVue } from '../../localVue';

describe('EternaPage.vue', () => {
  const sidebarContentClass = 'test-sidebar-content';
  const bodyContentClass = 'test-body-content';

  let store: Store<any>;
  let mutations: MutationTree<any>;
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    mutations = {
      'mobileStore/showPageSidebar': jest.fn(),
    };
    store = new Vuex.Store({
      mutations,
    });
    wrapper = shallowMount(EternaPage, {
      slots: {
        default: `<div class="${bodyContentClass}"></div>`,
        sidebar: `<div class="${sidebarContentClass}"></div>`,
      },
      propsData: {
        title: 'Title',
      },
      localVue,
      store,
    });
  });

  it('Should render the default slot under .body, and only there', () => {
    expect(wrapper.findAll(`.${bodyContentClass}`)).toHaveLength(1);
    expect(wrapper.findAll(`.body>.${bodyContentClass}`)).toHaveLength(1);
  });

  it('Should display the sidebar slot in the normal sidebar, in the header section, and in the mobile sidebar', () => {
    expect(wrapper.findAll(`.${sidebarContentClass}`)).toHaveLength(3);
    expect(wrapper.findAll(`.page-title .${sidebarContentClass}`)).toHaveLength(1);
    expect(wrapper.findAll(`.sidebar .${sidebarContentClass}`)).toHaveLength(1);
    expect(wrapper.findAll(`mobilesidebar-stub .${sidebarContentClass}`)).toHaveLength(1);
  });

  it('Should fire `MobileSidebar.openMenu` when the `mobileStore/showPageSidebar` mutation is called', async () => {
    const mockFn = jest.fn();
    (wrapper.find(MobileSidebar).vm as any).openMenu = mockFn;
    expect(mockFn).not.toBeCalled();
    store.commit('mobileStore/showPageSidebar');
    await Vue.nextTick();
    expect(mockFn).toBeCalledTimes(1);
  });
});
