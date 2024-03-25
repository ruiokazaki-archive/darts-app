export type Game = {
  id: string;
  created_at: string;
  played_at: string;
};

export type DartsScore = {
  id: string;
  game_id: string;
  target: "20" | "19" | "18" | "17" | "16" | "15" | "BULL";
  throws: number;
};

export type GameWithScores = Game & {
  scores: DartsScore[];
};
