import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Gallery from '@/components/Global/Gallery';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('Gallery.vue', () => {
  test.each`
    columns
    ${0}
    ${1}
    ${2}
    ${3}
    ${4}
  `('renders $columns columns when given $column elements in the slot', ({ columns }: {columns: number}) => {
  const slot = '<div class="test-content"></div>'.repeat(columns);
  const wrapper = mount(Gallery, {
    slots: {
      default: slot,
    },
    localVue,
  });
  expect(wrapper.findAll('.col-12')).toHaveLength(columns);
});
  it('Should put each slot element in its own column', () => {
    const numElements = 7;
    const slotElements = Array.from({ length: numElements }, (_, i) => `<div class="test-child-${i}"></div>`);
    const slot = slotElements.join('');
    const wrapper = mount(Gallery, {
      slots: {
        default: slot,
      },
      localVue,
    });
    wrapper.findAll('.col-12').wrappers.forEach((column, index) => {
      expect(column.element.children).toHaveLength(1);
      expect(column.element.children[0].outerHTML).toEqual(slotElements[index]);
    });
  });
});
