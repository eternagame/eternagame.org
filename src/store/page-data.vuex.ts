/* eslint-disable max-classes-per-file */
import { createModule } from 'vuex-class-component';
import { AxiosInstance } from 'axios';

const VuexModule = createModule({
  strict: false,
});

export default class PageData extends VuexModule {
  // TODO https://github.com/eternagame/eternagame.org/issues/17 improve typing
  data: any = null;
}
