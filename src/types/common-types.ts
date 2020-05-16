export interface UserData {
  points: string;
  uid: string;
  created: string;
  picture: string;
}

export interface NewsItem {
  title: string;
  uid: string;
}

export interface MeQueryResponse {
  achievements: {
    [achievementName: string]: {
      level: string;
      image: string;
      title: string;
      desc: string;
      past: string;
    };
  };
  achievement_roadmap: {
    key: string;
    level: number;
    current_level: string;
    image: string;
    title: string;
    desc: string;
    maxlevel: number;
    verb: string;
    past: string;
    to_next: number;
  }[];
  current_lab: string;
}
