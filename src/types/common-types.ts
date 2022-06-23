export interface UserData {
  points: string;
  synths: string;
  uid: string;
  created: string;
  picture: string;
  name: string;
  ['Personal Name']: string;
  mail: string;
  ['News mail notification']: string;
  ['Mail notification']: string;
  ['Certificate public']: string;
  Profile: string;
  is_lab_member: boolean;
  Survey: string;
  is_admin: boolean;
}

export interface LatestPuzzle {
  title: string;
  puznid: string;
}

export interface ClearedPuzzle {
  nid: string;
  title: string;
  type: string;
  id: string;
}

export interface CreatedPuzzle {
  id: string;
  title: string;
  type: string;
}

export interface SynthesizedDesign {
  title: string;
  id: string;
  puznid: string;
  score: string;
}

export interface ProfileGroup {
  group_nid: string;
  group_title: string;
  founder: string;
}

export interface FollowItem {
  nid: string;
  uid: string;
  id: string;
  updated_time: string;
  expired_time: string | null;
  type: string;
}

export interface ProfileAchievement {
  level: string;
  image: string;
  title: string;
  desc: string;
  past: string;
  type: string;
}

export interface UserResponse {
  user: UserData;
  follow: FollowItem[];
  // Each to its own tab
  latest_puzzles?: LatestPuzzle[];
  cleared_puzzles?: ClearedPuzzle[];
  created_puzzles?: CreatedPuzzle[];
  synthesized?: SynthesizedDesign[];
  // About tab
  my_group?: ProfileGroup[];
  my_pending_group?: ProfileGroup[];
  achievements?: {
    [name: string]: ProfileAchievement
  }
  all_achievements?: {
    [name: string]: ProfileAchievement
  }
}

export interface CommentItem {
  cid: string;
  name: string;
  uid: string;
  comment: string;
  created: string;
  picture: string;
}

export interface RefreshAchievement {
  level: number;
  image: string;
  title: string;
  desc: string;
  past: string;
}

export interface RoadmapAchievement {
  key: string;
  level: number;
  current_level: number | string;
  image: string;
  title: string;
  desc: string;
  maxlevel: number;
  verb: string;
  past: string;
  to_next: number;
  prereq?: string;
  current_puzzle?: string;
}

export interface ProcessedRoadmapAchievement extends RoadmapAchievement {
  prereqSatisfied: boolean;
}

export interface MeQueryResponse {
  achievements: {
    [achievementName: string]: ProfileAchievement;
  };
  achievement_roadmap: RoadmapAchievement[];
  current_lab: string;
}

export interface Publication {
  nid: string;
  title: string;
  journal: string;
  pub_date: string;
  timestamp: number;
  link: string;
  has_player_authors: boolean;
  authors: string;
  image: string;
  is_preprint: string;
  abstract: string;
  pdf_link: string;
  review_link: string | null;
  status: boolean;
}

export interface Publications {
  playerpubslist: Publication[];
  researcherpubslist: Publication[];
}

export interface PuzzleItem {
  id: string;
  nid: string;
  title: string;
  created: string;
  username: string;
  userpicture: string;
  "made-by-player": string;
  "num-cleared": string;
  type: string;
  "solved-by-bot": string | null;
  reward: string;
  "made-for-lab": string | null;
  folder: string;
  number_of_states: number;
  'next-puzzle': string;
  'has3d': string;
  }

export interface PuzzleList {
  puzzles: PuzzleItem[];
  num_puzzles: string;
  cleared?: ClearedPuzzle[];
}

export interface Puzzle {
  title: string;
  created: string;
  rna_type: string;
  uid: string;
  username: string;
  userpicture: string;
  reward: string;
  secstruct: string;
  "num-cleared": string;
  "num-submissions": string;
  id: string;
  body: string;
  folder: string | null;
  "made-by-player": string;
  type: string;
  // Format of this stuff is a bit wacky, a bunch of it is specific to EternaJS, and we don't use it
  // anyways, so let's just leave them excluded unless we really need them for some reason.
  // "locks": null,
  // "beginseq": null,
  // "usetails": null,
  // "constraints": "SHAPE,0",
  // "scoring": null,
  // "tutorial-level": "123",
  // "ui-specs": ""
  // "rscript": null,
  // "solved-by-bot": null,
  // "object": null,
  // "annotations": null,
  // "last-round": null,
  // "next-puzzle": null,
  // "objective": null,
  // "check_hairpin": null,
  // "cloud_round": null,
  // "hint": null,
  // "coauthor": "[\"Eterna100\"]",
  // "max-votes": 0
}

export interface PuzzleResponse {
  puzzle: Puzzle;
  nid: string;
  comments: CommentItem[];
  cleared?: ClearedPuzzle[];
}

export interface Group {
  nid: string;
  body: string;
  name: string;
  group_members: UserData[];
  founder_uid: string;
  is_private: string;
  created: string;
  picture: string;
  score: number;
  founder_name: string;
  founder_picture: string;
  num_members: number;
}

export interface GroupResponse {
  group: Group;
  comments: CommentItem[];
  total_num_comments: number;
  group_members: UserData[];
  group_admins: UserData[];
  uid: string;
  is_member: boolean;
  is_pending: boolean;
  is_admin: boolean;
  is_following: boolean;
}

export interface GroupItem {
  nid: string;
  name: string;
  founder_picture: string;
  founder_name: string;
  founder_uid: string;
  is_private: string;
  group_members: string;
  created: string;
  picture: string;
  num_members: string;
}

export interface JoinedGroup {
  name: string;
  nid: string;
}

export interface GroupList {
  groups: GroupItem[];
  num_groups: string;
  joined?: JoinedGroup[];
}

export interface CollectionItem {
  nid: string;
  title: string;
  desc: string;
  userpicture: string;
  username: string;
  uid: string;
  created: string;
  image: string;
  puzzles: string;
  num_completers: string;
  quest: boolean;
  progress: number;
}

export interface CollectionResponse {
  collection: CollectionItem;
  comments: CommentItem[];
  total_num_comments: number;
  uid: string;
}

export interface CreatedCollection {
  name: string;
  nid: string;
}

export interface CollectionList {
  collections: CollectionItem[];
  num_collections: string;
  created?: CreatedCollection[];
}

export interface NewsArticle {
  title: string;
  nid: string;
  body: string;
  created: string;
}

export enum NotificationType {
  NOTIFICATION = 'notifications',
  GROUP = 'groups',
  REWARD = 'rewards',
  NEWS = 'news',
  BLOG = 'blogs'
}

export enum NotificationMessageType {
  PRIVATE_MESSAGE = 'message',
  COMMENT = 'comment',
  GROUP_MESSAGE = 'group_message'
}

export interface NotificationMessageBase<MessageType extends NotificationMessageType, ContentType> {
  type: MessageType;
  created: number;
  sender: string;
  content: ContentType;
}

export type PrivateNotificationMessage = NotificationMessageBase<
  NotificationMessageType.PRIVATE_MESSAGE,
  string
>;

// Group invites don't carry information about the group,
// it just looks like a PM. Why isn't it a PM? Or why doesn't it include
// group info anyways? Or why not just be its own message type with the invite
// text handled on the frontend? Who knows.
export type UserDirectGroupMessage = NotificationMessageBase<
  NotificationMessageType.GROUP_MESSAGE,
  string
>;

export type RegularGroupNotificationMessage = NotificationMessageBase<
  NotificationMessageType.GROUP_MESSAGE,
  {
    body: string;
    group: string;
  }
>;

export type GroupNotificationMessage = UserDirectGroupMessage | RegularGroupNotificationMessage;

export type CommentNotificationMessage<NodeType = string> = NotificationMessageBase<
  NotificationMessageType.COMMENT,
  {
    body: string;
    node: {
      id: string;
      title: string;
      node_type: NodeType;
    }
  }
>;

export type NotificationMessage =
  PrivateNotificationMessage
  | GroupNotificationMessage
  | CommentNotificationMessage;

export interface DirectedNotificationItemBase {
  type: NotificationType.NOTIFICATION | NotificationType.GROUP;
  target_uid:	string;
  target_name: string;
  target_picture: string;
  target2_uid: string;
  target2_name: string;
  target2_picture: string;
  updated_time: string;
  timestamp: string;
  nid: string;
  message: NotificationMessage[];
}

export interface NotificationNotificationItem extends DirectedNotificationItemBase {
  type: NotificationType.NOTIFICATION;
  message: PrivateNotificationMessage[] | [CommentNotificationMessage];
}

export interface GroupNotificationItem extends DirectedNotificationItemBase {
  type: NotificationType.GROUP;
  message: [GroupNotificationMessage|CommentNotificationMessage<'eterna_group'>]
}

type DirectedNotificationItem = NotificationNotificationItem | GroupNotificationItem;

export interface PrivateMessageNotificationItem extends NotificationNotificationItem {
  message: PrivateNotificationMessage[];
}

interface CommentNotificationItemType extends DirectedNotificationItemBase {
  message: [CommentNotificationMessage];
}

export type CommentNotificationItem = DirectedNotificationItem & CommentNotificationItemType;

export interface RewardNotificationItem {
  type: NotificationType.REWARD;
  title: string;
  nid: string;
  created: string;
  sticky: string;
  field_reward_type_value: 'DESIGN' | 'VOTE';
  field_reward_solution_nid_value: string;
  field_reward_solution_title_value: string;
  field_reward_puzzle_nid_value: string;
  field_reward_puzzle_title_value: string;
  field_reward_amount_value: string;
  timestamp: string;
}

export interface NewsItem {
  type: NotificationType.NEWS;
  commentcount: string;
  title: string;
  nid: string;
  created: string;
  sticky: string;
  body: string;
  timestamp: string;
}

export interface BlogItem {
  type: NotificationType.BLOG;
  title: string;
  nid: string;
  uid: string;
  created:	string;
  sticky: string;
  body: string;
  filepath: string | null;
  timestamp: string;
  comments: CommentItem[];
}

export interface ChallengeItem{
  abstract: string;
  affiliation: string;
  blurb: string;
  body: string;
  challenge_status: string;
  cover_image: string;
  donors: string | null; // no current challenges have donors
  nid: string;
  update_summary: string | null;
  video: string;
}
export interface DateItem{
  month: number;
  year: number;
}

export interface AboutMediaItem {
  link: string;
  title: string;
  description: string;
}

// The combined news and blogs list uses the same logic and creates the same fields
// as notifications, and news and blog responses in notifications and the list
// both return the same thing, so long story short we're treating them the same way
export type NotificationItem =
  NotificationNotificationItem
  | GroupNotificationItem
  | RewardNotificationItem
  | NewsItem
  | BlogItem;

export function isDirectedNotificationItem(notification: NotificationItem): notification is DirectedNotificationItem {
  return notification.type === NotificationType.NOTIFICATION || notification.type === NotificationType.GROUP;
}

export function isNotiNotiItem(notification: NotificationItem): notification is NotificationNotificationItem {
  return notification.type === NotificationType.NOTIFICATION;
}

export function isPMNotiItem(notification: NotificationItem): notification is PrivateMessageNotificationItem {
  return isNotiNotiItem(notification) && notification.message[0].type === NotificationMessageType.PRIVATE_MESSAGE;
}

export function isCommentNotiItem(notification: NotificationItem): notification is CommentNotificationItem {
  return isDirectedNotificationItem(notification) && ( notification.message[0].type === NotificationMessageType.COMMENT);
}
