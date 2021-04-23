import { LabCardData } from "@/views/labs/LabsExplore/types";
import { Publication } from '@/types/common-types';

interface ChallengeAdminUpdate {
  nid: string;
  timestamp: number;
  created: string;
  title: string;
  body: string;
}

export interface ChallengeData {
  nid: string;
  title: string;
  abstract: string;
  body: string;
  donors: string;
  cover_image: string;
  video: string;
  affiliation: string;
  admin_updates: ChallengeAdminUpdate[];
  update_summary: string;
  labs: LabCardData[];
  publications: Publication[];
}