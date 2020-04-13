export default interface LeaderBoardData {
  users: PlayerCardData[];
}

export interface PlayerCardData {
  id: string;
  name?: string;
  picture: string;
}
