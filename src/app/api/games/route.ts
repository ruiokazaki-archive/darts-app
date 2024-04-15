import type { DartsScore, Game, GameWithScores } from '@/entitie/game/types';
import { sql } from '@vercel/postgres';

export async function GET() {
  const { rows: games } = await sql<Game>`SELECT * FROM games`;
  const { rows: scores } = await sql<DartsScore>`SELECT * FROM darts_scores`;

  const gamesWithScores: GameWithScores[] = games.map(game => ({
    ...game,
    scores: scores.filter(score => score.game_id === game.id),
  }));

  return Response.json(gamesWithScores, {
    status: 200,
    statusText: 'OK',
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const scores = {
    20: {
      throws: formData.get('target-20-throws_count'),
      marks: formData.get('target-20-marks_count'),
    },
    19: {
      throws: formData.get('target-19-throws_count'),
      marks: formData.get('target-19-marks_count'),
    },
    18: {
      throws: formData.get('target-18-throws_count'),
      marks: formData.get('target-18-marks_count'),
    },
    17: {
      throws: formData.get('target-17-throws_count'),
      marks: formData.get('target-17-marks_count'),
    },
    16: {
      throws: formData.get('target-16-throws_count'),
      marks: formData.get('target-16-marks_count'),
    },
    15: {
      throws: formData.get('target-15-throws_count'),
      marks: formData.get('target-15-marks_count'),
    },
    bull: {
      throws: formData.get('target-bull-throws_count'),
      marks: formData.get('target-bull-marks_count'),
    },
  };

  if (
    Object.values(scores).some(
      score =>
        typeof score.throws !== 'string' ||
        Number.isNaN(Number(score.throws)) ||
        typeof score.marks !== 'string' ||
        Number.isNaN(Number(score.marks)),
    )
  ) {
    return new Response(null, { status: 400, statusText: 'Bad Request' });
  }

  const played_at = new Date().toISOString();

  await sql`INSERT INTO games (played_at) VALUES (${played_at});`;
  const { rowCount, rows } =
    await sql<Game>`SELECT * FROM games WHERE played_at = ${played_at}`;

  if (rowCount !== 1) {
    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }

  const newGame = rows[0];

  const result = await Promise.all([
    sql`INSERT INTO darts_scores (game_id, target, throws, marks) VALUES (${
      newGame.id
    }, '20', ${scores['20'].throws as string}, ${
      scores['20'].marks as string
    });`,
    sql`INSERT INTO darts_scores (game_id, target, throws, marks) VALUES (${
      newGame.id
    }, '19', ${scores['19'].throws as string}, ${
      scores['19'].marks as string
    });`,
    sql`INSERT INTO darts_scores (game_id, target, throws, marks) VALUES (${
      newGame.id
    }, '18', ${scores['18'].throws as string}, ${
      scores['18'].marks as string
    });`,
    sql`INSERT INTO darts_scores (game_id, target, throws, marks) VALUES (${
      newGame.id
    }, '17', ${scores['17'].throws as string}, ${
      scores['17'].marks as string
    });`,
    sql`INSERT INTO darts_scores (game_id, target, throws, marks) VALUES (${
      newGame.id
    }, '16', ${scores['16'].throws as string}, ${
      scores['16'].marks as string
    });`,
    sql`INSERT INTO darts_scores (game_id, target, throws, marks) VALUES (${
      newGame.id
    }, '15', ${scores['15'].throws as string}, ${
      scores['15'].marks as string
    });`,
    sql`INSERT INTO darts_scores (game_id, target, throws, marks) VALUES (${
      newGame.id
    }, 'BULL', ${scores.bull.throws as string}, ${
      scores.bull.marks as string
    });`,
  ]);

  if (result.some(r => r.rowCount !== 1)) {
    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }

  return Response.json(
    {
      data: JSON.stringify(scores),
    },
    { status: 201, statusText: 'Created' },
  );
}
