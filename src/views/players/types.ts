import { UserData } from '@/types/common-types';

export interface FollowData {}

export interface UsersData {
  users: Array<UserData>;
  follows: Array<FollowData>;
}

export interface SynthesizedData {
  title: String,
  id: String,
  puznid: String,
  score: String,
}