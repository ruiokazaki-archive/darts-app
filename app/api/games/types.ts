export type Game = {
  id: string;
  created_at: string;
  played_at: string;
};

export type DartsScore = {
  id: string;
  game_id: string;
  target: CricketNumber;
  throws: number;
};

type CricketNumber = "20" | "19" | "18" | "17" | "16" | "15" | "BULL";

export type GameWithScores = Game & {
  scores: DartsScore[];
};
