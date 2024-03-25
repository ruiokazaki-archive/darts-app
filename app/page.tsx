import { Game, DartsScore, GameWithScores } from "@/types/game";
import { sql } from "@vercel/postgres";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default async function Home() {
  const { rows: games } = await sql<Game>`SELECT * FROM games`;
  const { rows: scores } = await sql<DartsScore>`SELECT * FROM darts_scores`;

  const gamesWithScores: GameWithScores[] = games.map((game) => ({
    ...game,
    scores: scores.filter((score) => score.game_id === game.id),
  }));

  return (
    <main>
      <h1>Games</h1>
      <ul>
        {gamesWithScores.map((game) => (
          <li key={game.id}>
            <h2>Game {game.id}</h2>
            <ul>
              {game.scores.map((score) => (
                <li key={score.id}>
                  {score.target} - {score.throws} throws
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
