export type esCallResultModel = {
  took: Number;
  timed_out: boolean;
  hits: esCallResultHitsContainer;
};

export type esCallResultHitsContainer = {
  total: number;
  max_score: number;
  hits: Array<esCallResultHit>;
};

export type esCallResultHit = {
  _index: string;
  _id: string;
  _score: number;
  _source: { id: string; title: string };
};

export type simplifiedResult = {
  id: string;
  title: string;
  score: string;
  isTitleGreen: boolean;
  isIdGreen: boolean;
};

export type esAnalysisResult = {
  tokens: Array<esAnalysisToken>;
};

export type esAnalysisToken = {
  token: string;
  start_offset: number;
  end_offset: number;
};
