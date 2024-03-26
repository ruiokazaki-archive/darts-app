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
  const scores = {
    20: formData.get("target-20"),
    19: formData.get("target-19"),
    18: formData.get("target-18"),
    17: formData.get("target-17"),
    16: formData.get("target-16"),
    15: formData.get("target-15"),
    bull: formData.get("target-bull"),
  };

  if (
    Object.values(scores).some(
      (score) => typeof score !== "string" || isNaN(Number(score))
    )
  ) {
    return new Response(null, { status: 400, statusText: "Bad Request" });
  }

  const played_at = new Date().toISOString();

  await sql`INSERT INTO games (played_at) VALUES (${played_at});`;
  const { rowCount, rows } =
    await sql<Game>`SELECT * FROM games WHERE played_at = ${played_at}`;

  if (rowCount !== 1) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  const newGame = rows[0];

  const result = await Promise.all([
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (${
      newGame.id
    }, '20', ${scores["20"] as string});`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (${
      newGame.id
    }, '19', ${scores["19"] as string});`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (${
      newGame.id
    }, '18', ${scores["18"] as string});`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (${
      newGame.id
    }, '17', ${scores["17"] as string});`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (${
      newGame.id
    }, '16', ${scores["16"] as string});`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (${
      newGame.id
    }, '15', ${scores["15"] as string});`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (${
      newGame.id
    }, 'BULL', ${scores["bull"] as string});`,
  ]);

  if (result.some((r) => r.rowCount !== 1)) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

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
