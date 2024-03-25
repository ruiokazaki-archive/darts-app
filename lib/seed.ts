import { sql } from "@vercel/postgres";

export async function seed() {
  const createTable = await Promise.all([
    sql`
    CREATE TABLE games (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      played_at TIMESTAMP WITH TIME ZONE NOT NULL
    );
    `,
    sql`
    CREATE TABLE darts_scores (
      id SERIAL PRIMARY KEY,
      game_id INTEGER REFERENCES games(id),
      target VARCHAR(4) CHECK (target IN ('20', '19', '18', '17', '16', '15', 'BULL')),
      throws INTEGER NOT NULL
    );
    `,
  ]);

  const games = await Promise.all([
    sql`INSERT INTO games (played_at) VALUES ('2024-03-25 10:00:00+09');`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (1, '20', 13);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (1, '19', 13);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (1, '18', 11);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (1, '17', 18);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (1, '16', 8);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (1, '15', 12);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (1, 'BULL', 20);`,

    sql`INSERT INTO games (played_at) VALUES ('2024-03-25 12:00:00+09');`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (2, '20', 13);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (2, '19', 5);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (2, '18', 5);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (2, '17', 10);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (2, '16', 9);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (2, '15', 10);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (2, 'BULL', 17);`,

    sql`INSERT INTO games (played_at) VALUES ('2024-03-25 14:00:00+09');`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (3, '20', 9);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (3, '19', 11);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (3, '18', 7);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (3, '17', 10);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (3, '16', 12);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (3, '15', 8);`,
    sql`INSERT INTO darts_scores (game_id, target, throws) VALUES (3, 'BULL', 7);`,
  ]);

  return {
    createTable,
    games,
  };
}
