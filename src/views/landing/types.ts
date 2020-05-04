export default interface HomeData {
  achievement_roadmap: Array<Achievement>;
}

export interface Achievement {
  current_level: number;
  key: string;
}
