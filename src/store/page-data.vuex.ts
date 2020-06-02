/* eslint-disable max-classes-per-file */
import { createModule } from '@/plugins/vuex-class-component/dist/index';
import { AxiosInstance } from 'axios';

const VuexModule = createModule({
  strict: false,
});

export default class PageData extends VuexModule {
  // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
  data: any = null;
}
