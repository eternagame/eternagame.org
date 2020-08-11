import DefaultAvatar from '@/assets/navbar/DefaultIcon.svg';
import { NotificationItem } from '@/types/common-types';

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
      return 'BLOG';
    }
    return formatted;
  },
  typeColor(notification: NotificationItem | {type: string} | null): string | null {
    if (!notification) return null;
    switch (notification.type.toLowerCase()) {
      case 'blogs':
        return '#53b64e';
      case 'labs':
        return '#50b2dc';
      case 'announcements':
      case 'news':
        return '#f39c12';
      default:
        return '#53b64e';
    }
  },
  getPuzzleLink(key: string) {
    switch (key) {
      case 'register':
        return '/web/register/';
      case 'tutorial':
      case 'switch_tutorial':
        return `${process.env.VUE_APP_API_BASE_URL}/web/tutorials/`;
      case 'puzzle_solver':
      case 'lab':
      case 'top_player':
      case 'millionaire':
        // return 'https://eternagame.org/web/challenges/';
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
      case 'eterna100':
        return '/news/6136054/';
      case 'side_quest_just_for_fun':
        // return "/web/puzzle/" + current_puzzle + "/";
        return '/puzzles/?search=Fun&sort=date';
      case 'side_quest_nova_videos':
        return 'http://www.pbs.org/wgbh/nova/labs/lab/rna/';
      case 'side_quest_challenge_puzzles':
        // return 'https://eternagame.org/web/challenges/?size=50&notcleared=true&sort=solved';
        return '/puzzles/?notcleared=true&sort=solved';
      case 'side_quest_puzzle_of_the_day':
        return '/puzzles/?size=1&search:SPPuzzleOfTheDay&notcleared=true&sort=date';
      case 'side_quest_eterna100':
        return '/puzzles/?search=:Eterna100&notcleared=true&sort=solved';
      case 'side_quest_best_lab_practices':
        // return "/web/puzzle/" + current_puzzle + "/";
        return '/puzzles/?search=%5BLab%20Tutorial%5D&sort=date';
      case 'side_quest_switch_puzzles':
        // return "/web/puzzle/" + current_puzzle + "/";
        return '/puzzles/?search=switch&switch=checked&sort=date';
      case 'side_quest_create_a_puzzle':
        return `${process.env.VUE_APP_API_BASE_URL}/game/puzzlemaker/`;
      case 'side_quest_create_a_tutorial':
        // return "https://eternagame.org/game/puzzlemaker/"
        return 'https://docs.google.com/document/d/1m9vkiZO9_MslT1qOXGpsfvKyCtWLLJcsW0BIbCZgHu8';
      case 'side_quest_create_a_script':
        return `${process.env.VUE_APP_API_BASE_URL}/web/script/create/`;
      case 'side_quest_covid19_potd':
        // return 'https://eternagame.org/web/playerpuzzles/?search=:COVID19&sort=solved';
        return '/puzzles/?search=:COVID19&sort=solved';
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
        // return 'https://eternagame.org/web/challenges/?size=50&notcleared=true&sort=solved';
        return '/puzzles/?size=50&notcleared=true&sort=solved';
      case 'side_quest_puzzle_of_the_day':
        return '/puzzles/?size=1&search:SPPuzzleOfTheDay&notcleared=true&sort=date';
      case 'side_quest_eterna100':
        return '/puzzles/?size=50&search=:Eterna100&notcleared=true&sort=solved';
      case 'side_quest_best_lab_practices':
        return '/puzzles/?search=%5BLab%20Tutorial%5D&sort=date';
      case 'side_quest_switch_puzzles':
        return '/puzzles/?search=switch&switch=checked&sort=date';
      case 'side_quest_create_a_puzzle':
        return `${process.env.VUE_APP_API_BASE_URL}/game/puzzlemaker/`;
      case 'side_quest_create_a_tutorial':
        // return 'https://eternagame.org/web/tutscripts/';
        return 'https://docs.google.com/document/d/1m9vkiZO9_MslT1qOXGpsfvKyCtWLLJcsW0BIbCZgHu8';
      case 'side_quest_create_a_script':
        return `${process.env.VUE_APP_API_BASE_URL}/web/script/`;
      case 'side_quest_covid19_potd':
        // return 'https://eternagame.org/web/playerpuzzles/?search=:COVID19&sort=solved';
        return '/puzzles/?search=:COVID19&sort=solved';
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
};
