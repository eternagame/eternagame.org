export interface Script {
  author : {
    name: string;
    uid: string;
  };

  title: string;

  body: string;

  created: string;

  pageview: string;

  type: string;

  success_rate: string | null;

  input: {
    name: string;
    value: string;
  }[];

  source: string;
}