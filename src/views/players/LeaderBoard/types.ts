export default interface LeaderBoardData {
  users: UserData[];
}

export interface UserData {
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
