/* eslint-disable max-classes-per-file */
import { createModule } from 'vuex-class-component';
import { AxiosInstance } from 'axios';

const VuexModule = createModule({
  strict: false,
});

interface CacheData {data: object};
interface CacheError {error: Error};

export function isCacheData(cache: CacheData | CacheError): cache is CacheData {
  return !!(cache && (cache as CacheData).data);
}

export function isCacheError(cache: CacheData | CacheError): cache is CacheError {
  return !!(cache && (cache as CacheError).error);
}

export default function createFetchDataStore() {
  class FetchDataStore extends VuexModule {
    ssrCache: (CacheData | CacheError)[] = [];
  }
  return FetchDataStore;
}
