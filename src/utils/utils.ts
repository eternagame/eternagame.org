export default {
  getPuzzleMiddleThumbnail(nid: string) {
    return `https://s3.amazonaws.com/eterna/puzzle_mid_thumbnails/thumbnail${nid}.png`;
  },
  getPuzzleCloudThumbnail(nid: string) {
    return `https://s3.amazonaws.com/eterna/puzzle_cloud_thumbnails/thumbnail${nid}.png`;
  },
  getPuzzleLink(key: string) {
    switch (key) {
      case 'register':
        return '/web/register/';
      case 'tutorial':
      case 'switch_tutorial':
        return 'https://eternagame.org/web/tutorials/';
      case 'puzzle_solver':
      case 'lab':
      case 'top_player':
      case 'millionaire':
        return 'https://eternagame.org/web/challenges/';
      case 'comments':
        return '/news/';
      case 'profile_desc':
        return '/account';
      case 'follower':
        return '/leaderboards/?sort=synthesizes';
      case 'leader':
        return '/leaderboards';
      case 'vote':
      case 'synthesizer':
      case 'lab_winner':
        return '/labs/';
      case 'puzzle_architect':
        return 'https://eternagame.org/web/playerpuzzles/';
      case 'nova':
        return 'http://www.pbs.org/wgbh/nova/labs/lab/rna/';
      case 'eternacon2015':
        return 'https://sites.google.com/site/eternacon2015/';
      case 'eterna100':
        return '/news/6136054/';
      case 'side_quest_just_for_fun':
        // return "/web/puzzle/" + current_puzzle + "/";
        return 'https://eternagame.org/web/playerpuzzles/?size=24&search=Fun&sort=date';
      case 'side_quest_nova_videos':
        return 'http://www.pbs.org/wgbh/nova/labs/lab/rna/';
      case 'side_quest_challenge_puzzles':
        // return 'https://eternagame.org/web/challenges/?size=50&notcleared=true&sort=solved';
        return '/puzzles/?size=50&notcleared=true&sort=solved';
      case 'side_quest_puzzle_of_the_day':
        return 'https://eternagame.org/web/playerpuzzles/?size=1&search:SPPuzzleOfTheDay&notcleared=true&sort=date';
      case 'side_quest_eterna100':
        return 'https://eternagame.org/web/playerpuzzles/?size=50&search=:Eterna100&notcleared=true&sort=solved';
      case 'side_quest_best_lab_practices':
        // return "/web/puzzle/" + current_puzzle + "/";
        return 'https://eternagame.org/web/playerpuzzles/?skip=72&search=%5BLab%20Tutorial%5D&sort=date';
      case 'side_quest_switch_puzzles':
        // return "/web/puzzle/" + current_puzzle + "/";
        return 'https://eternagame.org/web/playerpuzzles/?size=24&search=switch&switch=checked&sort=date';
      case 'side_quest_create_a_puzzle':
        return 'https://eternagame.org/game/puzzlemaker/';
      case 'side_quest_create_a_tutorial':
        // return "https://eternagame.org/game/puzzlemaker/"
        return 'https://docs.google.com/document/d/1m9vkiZO9_MslT1qOXGpsfvKyCtWLLJcsW0BIbCZgHu8';
      case 'side_quest_create_a_script':
        return 'https://eternagame.org/web/script/create/';
      case 'side_quest_covid19_potd':
        // return 'https://eternagame.org/web/playerpuzzles/?search=:COVID19&sort=solved';
        return '/puzzles/?search=COVID19&sort=solved';
      default:
        return null;
    }
    return null;
  },
  getQuestLink(key: string) {
    switch (key) {
      case 'side_quest_just_for_fun':
        return 'https://eternagame.org/web/playerpuzzles/?size=24&search=Fun&sort=date';
      case 'side_quest_nova_videos':
        return 'http://www.pbs.org/wgbh/nova/labs/lab/rna/';
      case 'side_quest_challenge_puzzles':
        // return 'https://eternagame.org/web/challenges/?size=50&notcleared=true&sort=solved';
        return '/puzzles/?size=50&notcleared=true&sort=solved';
      case 'side_quest_puzzle_of_the_day':
        return 'https://eternagame.org/web/playerpuzzles/?size=1&search:SPPuzzleOfTheDay&notcleared=true&sort=date';
      case 'side_quest_eterna100':
        return 'https://eternagame.org/web/playerpuzzles/?size=50&search=:Eterna100&notcleared=true&sort=solved';
      case 'side_quest_best_lab_practices':
        return 'https://eternagame.org/web/playerpuzzles/?skip=72&search=%5BLab%20Tutorial%5D&sort=date';
      case 'side_quest_switch_puzzles':
        return 'https://eternagame.org/web/playerpuzzles/?size=24&search=switch&switch=checked&sort=date';
      case 'side_quest_create_a_puzzle':
        return 'https://eternagame.org/game/puzzlemaker/';
      case 'side_quest_create_a_tutorial':
        return 'https://eternagame.org/web/tutscripts/';
      case 'side_quest_create_a_script':
        return 'https://eternagame.org/web/script/';
      case 'side_quest_covid19_potd':
        // return 'https://eternagame.org/web/playerpuzzles/?search=:COVID19&sort=solved';
        return '/puzzles/?search=COVID19&sort=solved';
      default:
        return null;
    }
    return null;
  },
};
