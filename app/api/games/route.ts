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

export async function POST(request: Request) {
  const formData = await request.formData();

  return Response.json(
    {
      data: {
        "target-20": formData.get("target-20"),
        "target-19": formData.get("target-19"),
        "target-18": formData.get("target-18"),
        "target-17": formData.get("target-17"),
        "target-16": formData.get("target-16"),
        "target-15": formData.get("target-15"),
        "target-bull": formData.get("target-bull"),
      },
    },
    { status: 201, statusText: "Created" }
  );
}
