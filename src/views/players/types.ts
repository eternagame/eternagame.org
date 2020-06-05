import { UserData } from '@/types/common-types';

export interface FollowData {}

export interface UserItem {
  uid: string;
  name: string;
  points: string;
  synths: string;
  created: string;
  picture: string;
}

export interface UsersData {
  users: UserItem[];
  follows: FollowData[];
}

export interface SynthesizedData {
  title: String,
  id: String,
  puznid: String,
  score: String,
}