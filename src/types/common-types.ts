export interface UserData {
  points: string;
  synths: string;
  uid: string;
  created: string;
  picture: string;
  name: string;
  mail: string;
  ['News mail notification']: string;
  ['Mail notification']: string;
  Profile: string;
  is_lab_member_legacy: boolean;
  ten_tools_level: number;
  Survey: string;
}

export interface ActivityItem {
  type: string;
}

export interface UserMessage {
  message: string;
  sender: string;
}

export interface NotificationItem {
  message: UserMessage;
  target_uid: string;
  target2_uid: string;
  target_picture: string;
  target2_picture: string;
  target_name: string;
  target2_name: string;
  content: { body: string } | string;
  sender: string;
}

export interface CommentItem {
  nid: string;
  cid: string;
}

export interface NewsItem {
  title: string;
  uid: string;
  nid: string;
  username: string;
  userpicture: string;
  'made-by-player'?: string;
  'num-cleared'?: string;
  type: string;
  'solved-by-bot'?: boolean;
  reward: string;
  'made-for-lab'?: boolean;
  created: number;
  message?: Array<UserMessage>;
  target_uid: string;
  target2_uid: string;
  target_picture: string;
  target2_picture: string;
  target_name: string;
  target2_name: string;
}

export interface PuzzleItem {
  id: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  level: number;
  current_puzzle: string;
  key: string;
  current_level: number;
  to_next: number;
}
