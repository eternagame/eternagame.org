export default interface LabsExploreData {
  labs: LabCardData[]
}
export interface LabCardData {
  affiliation: string
  cover_image?: string
  created: string
  exp_phase: string
  exp_phase_end?: any
  exp_phase_start?: any
  founder: string
  founder_uid: string
  is_active: boolean
  nid: string
  num_slots: string
  puzzles: string
  selection?: any
  title: string
}
