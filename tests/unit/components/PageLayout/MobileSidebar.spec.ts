import {
  shallowMount, mount, Wrapper,
} from '@vue/test-utils';
import Vue from 'vue';
import MobileSidebar from '@/components/PageLayout/MobileSidebar.vue';
import { localVue } from '../../localVue';

describe('MobileSidebar.vue', () => {
  const contentClass = 'test-body-content';

  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(MobileSidebar, {
      slots: {
        default: `<div class="${contentClass}"></div>`,
      },
      propsData: {
        title: 'Title',
      },
      localVue,
    });
  });

  it('Should render the slot content', () => {
    expect(wrapper.findAll(`.${contentClass}`)).toHaveLength(1);
  });

  it('Should show when calling openMenu', () => {
    expect(wrapper.element.style.display).toBe('none');
    (wrapper.vm as any).openMenu();
    expect(wrapper.element.style.display).toBeFalsy(); // no value == visible
  });

  it('Should close when clicking the cross', () => {
    (wrapper.vm as any).openMenu();
    wrapper.find('.cross-icon').trigger('click');
    expect(wrapper.element.style.display).toBe('none');
  });
});
