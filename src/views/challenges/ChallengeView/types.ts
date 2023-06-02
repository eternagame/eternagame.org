import { LabCardData } from "@/views/labs/LabsExplore/types";
import { Publication } from '@/types/common-types';

export interface ChallengeAdminUpdate {
  nid: string;
  timestamp: number;
  created: string;
  title: string;
  body: string;
}

export interface ChallengeData {
  nid: string;
  title: string;
  body: string;
  donors: string;
  affiliation: string;
  video: string;
  teaser_image: string;
  cover_image: string;
  abstract: string;
  update_summary: string;
  challenge_status: string;
  blurb: string;
  publications: Publication[];
  labs: LabCardData[];
  admin_updates: ChallengeAdminUpdate[];
  news_posts: ChallengeAdminUpdate[];
}
