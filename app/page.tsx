import { getGames } from "@/app/api/games/fetcher";
import Link from "next/link";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default async function Home() {
  const result = await getGames();
  if (result.status !== 200)
    return new Response("Error", { status: result.status });

  const games = result.data;

  return (
    <main>
      <h1>Games</h1>
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
          }
        `}
      </style>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>20</th>
            <th>19</th>
            <th>18</th>
            <th>17</th>
            <th>16</th>
            <th>15</th>
            <th>BULL</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 && (
            <tr>
              <td colSpan={9}>No data</td>
            </tr>
          )}
          {games.map((game) => (
            <tr key={game.id}>
              <td>{`${new Date(game.played_at).getFullYear()}/${new Date(
                game.played_at
              ).getMonth()}/${new Date(game.played_at).getDay()} ${new Date(
                game.played_at
              ).getHours()}:${new Date(game.played_at).getMinutes()}`}</td>
              <td>
                {game.scores.find((score) => score.target === "20")?.throws}
              </td>
              <td>
                {game.scores.find((score) => score.target === "19")?.throws}
              </td>
              <td>
                {game.scores.find((score) => score.target === "18")?.throws}
              </td>
              <td>
                {game.scores.find((score) => score.target === "17")?.throws}
              </td>
              <td>
                {game.scores.find((score) => score.target === "16")?.throws}
              </td>
              <td>
                {game.scores.find((score) => score.target === "15")?.throws}
              </td>
              <td>
                {game.scores.find((score) => score.target === "BULL")?.throws}
              </td>
              <td>
                {game.scores.reduce((acc, score) => acc + score.throws, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/in-game">ゲームを開始</Link>
    </main>
  );
}
