import DefaultAvatar from '@/assets/navbar/DefaultIcon.svg';
import DefaultGroupAvatar from '@/assets/group.svg';
import DefaultCollectionAvatar from '@/assets/logo.svg';
import { NotificationItem } from '@/types/common-types';
import { Route } from 'vue-router';

export default {
  isExternal(link: string) {
    return !(link.startsWith('/') || link.startsWith('https://eternagame.org/'));
  },
  getPuzzleMiddleThumbnail(nid: string | null) {
    // return `https://s3.amazonaws.com/eterna/puzzle_mid_thumbnails/thumbnail${nid}.png`;
    return (
      nid &&
      `https://renderv2-prod-renderv2bucket86ab868d-1aq5x6e32xf92.s3.amazonaws.com/puzzle_mid_thumbnails/thumbnail${nid}.svg`
    );
  },
  getPuzzleCloudThumbnail(nid: string) {
    return `https://s3.amazonaws.com/eterna/puzzle_cloud_thumbnails/thumbnail${nid}.png`;
  },
  strippedBody(text: string): string {
    // For notification previews, remove all html tags,
    // since tags like <ul> and <img> can break formatting.
    return text && text.replace && text?.replace(/(<([^>]+)>)/gi, '');
  },
  formattedType(notification: NotificationItem): string {
    if (!notification) return '';
    const formatted = notification.type.toUpperCase();
    if (formatted === 'BLOGS') {
      // Unpluralize, since it sounds better
      return 'NEWS';
    }
    return formatted;
  },
  typeColor(notification: NotificationItem | {type: string} | null): string | null {
    if (!notification) return null;
    switch (notification.type.toLowerCase()) {
      case 'blogs':
        return '#f39c12';
      case 'labs':
        return '#50b2dc';
      case 'announcements':
      case 'news':
        return '#f39c12';
      default:
        return '#53b64e';
    }
  },
  getPuzzleLink(key: string, currentPuzzle?: string) {
    switch (key) {
      case 'register':
        return '/';
      case 'puzzle_solver':
      case 'lab':
      case 'top_player':
      case 'millionaire':
        return '/puzzles';
      case 'comments':
        return '/news/';
      case 'profile_desc':
        return '/account';
      case 'follower':
        return '/players/?sort=synthesizes';
      case 'leader':
        return '/players';
      case 'vote':
      case 'synthesizer':
      case 'lab_winner':
        return '/labs/';
      case 'puzzle_architect':
        return `${process.env.VUE_APP_API_BASE_URL}/playerpuzzles/`;
      case 'nova':
        return 'http://www.pbs.org/wgbh/nova/labs/lab/rna/';
      case 'eternacon2015':
        return 'https://sites.google.com/site/eternacon2015/';
      case 'side_quest_just_for_fun':
        if (currentPuzzle) return `/puzzles/${currentPuzzle}`;
        return '/puzzles/?search=Fun&sort=date';
      case 'side_quest_nova_videos':
        return 'http://www.pbs.org/wgbh/nova/labs/lab/rna/';
      case 'side_quest_challenge_puzzles':
        return '/puzzles/?notcleared=true&sort=solved';
      case 'side_quest_eterna100':
        return '/collections/11331936';
      case 'side_quest_best_lab_practices':
        if (currentPuzzle) return `/puzzles/${currentPuzzle}`;
        return '/collections/11331939';
      case 'side_quest_switch_puzzles':
        if (currentPuzzle) return `/puzzles/${currentPuzzle}`;
        return '/puzzles/?search=switch&switch=checked&sort=date';
      case 'side_quest_create_a_puzzle':
        return '/puzzles/create';
      case 'side_quest_create_a_tutorial':
        return 'https://docs.google.com/document/d/1m9vkiZO9_MslT1qOXGpsfvKyCtWLLJcsW0BIbCZgHu8';
      case 'side_quest_create_a_script':
        return `${process.env.VUE_APP_API_BASE_URL}/web/script/create/`;
      case 'side_quest_covid19_potd':
        return '/collections/11331942';
      case 'side_quest_eterna3d_expo':
        return '/collections/11331935';
      default:
        return null;
    }
  },
  getQuestLink(key: string) {
    switch (key) {
      case 'side_quest_just_for_fun':
        return '/puzzles/?search=Fun&sort=date';
      case 'side_quest_nova_videos':
        return 'http://www.pbs.org/wgbh/nova/labs/lab/rna/';
      case 'side_quest_challenge_puzzles':
        return '/puzzles/?size=50&notcleared=true&sort=solved';
      case 'side_quest_eterna100':
        return '/collections/11331936';
      case 'side_quest_best_lab_practices':
        return '/collections/11331939';
      case 'side_quest_switch_puzzles':
        return '/puzzles/?search=switch&switch=checked&sort=date';
      case 'side_quest_create_a_puzzle':
        return '/puzzles/create';
      case 'side_quest_create_a_tutorial':
        return 'https://docs.google.com/document/d/1m9vkiZO9_MslT1qOXGpsfvKyCtWLLJcsW0BIbCZgHu8';
      case 'side_quest_create_a_script':
        return `${process.env.VUE_APP_API_BASE_URL}/web/script/`;
      case 'side_quest_covid19_potd':
        return '/collections/11331942';
      case 'side_quest_eterna3d_expo':
        return '/collections/11331935';
      default:
        return null;
    }
  },
  isLinkInternal(link: string | Object) {
    return (
      link instanceof Object ||
      (link.startsWith('/') &&
        !link.startsWith('/web/') &&
        !link.startsWith('/game/') &&
        !link.endsWith('.php'))
    );
  },
  getAvatar(uri: string | null) {
    if (uri) return /^http/i.exec(uri) ? uri : `/${uri}`;
    return DefaultAvatar;
  },
  getGroupAvatar(uri: string | null) {
    if (uri) return uri;
    return DefaultGroupAvatar;
  },
  getCollectionAvatar(uri: string | null) {
    if (uri) return uri;
    return DefaultCollectionAvatar;
  },
  nonPaginationQueryChanged(
    query: Route['query'],
    oldQuery: Route['query']
  ) {
    const shallowEqual = <T>(a: T[], b: T[]) => {
      if (a === b) {
        return true;
      }

      if (a == null || b == null || a.length !== b.length) {
        return false;
      }

      return a.every((value, index) => value === b[index]);
    };

    const keys = [...new Set([...Object.keys(query), ...Object.keys(oldQuery)])];

    return keys.some((key) => {
      // Size and skip should NOT trigger a re-fetch in FetchMixin, as paginator takes care of those
      if (key === 'size' || key === 'skip') return false;

      const val = query[key];
      const oldVal = oldQuery[key];
      return Array.isArray(val) && Array.isArray(oldVal) ? !shallowEqual(val, oldVal) : val !== oldVal;
    });
  }
};
