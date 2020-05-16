export default interface QuestViewData {
  puzzles: {
    id: string;
    title: string;
    created: string;
    username: string;
    userpicture: string;
    'made-by-player': string;
    'num-cleared': string;
    type: string;
    'solved-by-bot': null;
    reward: string;
    'made-for-lab': null;
  }[];
  num_puzzles: string;
  cleared: [
    {
      nid: string;
      title: string;
      type: string;
      id: string;
    },
  ];
}
