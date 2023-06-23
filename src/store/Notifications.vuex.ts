import { NotificationItem } from '@/types/common-types';
import { AxiosInstance } from 'axios';
import { throttle } from 'lodash';
import { createModule } from 'vuex-class-component';

const VuexModule = createModule({
  strict: false,
});

export default function createNotificationStore($http: AxiosInstance) {
  class NotificationStore extends VuexModule {
    unreadCount = 0;

    notifications: NotificationItem[] = [];

    notificationsAreUpdating = false;

    readonly REFRESH_FREQUENCY = 90 * 1000;

    private async doUpdate() {
      const res = await $http.get('/get/?type=noti_count_for_user&cache_bust=2');
      this.unreadCount = +res.data.data.noti_count;
    }

    update = throttle(this.doUpdate, this.REFRESH_FREQUENCY);
  }

  return NotificationStore;
}
