interface PuzzleData {
  id: string;
  title?: string;
  username: string;
  userpicture: string;
  'made-by-player'?: string;
  'num-cleared'?: string;
  type: string;
  'solved-by-bot'?: boolean;
  reward: string;
  'made-for-lab'?: boolean;
}
export default interface PuzzleDataPage {
  puzzle: PuzzleData;
}
