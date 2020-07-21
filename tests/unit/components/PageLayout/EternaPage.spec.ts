import {
  shallowMount, mount, Wrapper,
} from '@vue/test-utils';
import Vuex, { Store, ActionTree, MutationTree } from 'vuex';
import Vue from 'vue';
import {
  createProxy, mutation, extractVuexModule, createModule,
} from 'vuex-class-component';
import { ProxyWatchers } from 'vuex-class-component/dist/interfaces';
import axios from 'axios';
import EternaPage from '@/components/PageLayout/EternaPage.vue';
import MobileSidebar from '@/components/PageLayout/MobileSidebar.vue';
import MobileStore from '@/store/mobile.vuex';
import { localVue } from '../../localVue';

jest.mock('axios');

type Interface<T> = {
  [P in keyof T]: T[P]
};

describe('EternaPage.vue', () => {
  const sidebarContentClass = 'test-sidebar-content';
  const bodyContentClass = 'test-body-content';

  let store: Store<any>;
  let mutations: MutationTree<any>;
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    const VuexModule = createModule({ strict: false });
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
});
