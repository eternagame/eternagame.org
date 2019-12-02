import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuex);

/* eslint-disable */
export { localVue };
