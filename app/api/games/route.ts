import { sql } from "@vercel/postgres";
import { Game, DartsScore, GameWithScores } from "./types";

export async function GET() {
  const { rows: games } = await sql<Game>`SELECT * FROM games`;
  const { rows: scores } = await sql<DartsScore>`SELECT * FROM darts_scores`;

  const gamesWithScores: GameWithScores[] = games.map((game) => ({
    ...game,
    scores: scores.filter((score) => score.game_id === game.id),
  }));

  return Response.json(gamesWithScores, {
    status: 200,
    statusText: "OK",
  });
}
