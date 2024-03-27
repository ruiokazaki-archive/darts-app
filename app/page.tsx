import { getGames } from "@/app/api/games/fetcher";
import { convertAverageMarksPerRoundToRate } from "@/common/convertAverageMarksPerRoundToRate";
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
            <th>Average Marks per Round(80%)</th>
            <th>Average Marks per Round(FULL)</th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 && (
            <tr>
              <td colSpan={11}>No data</td>
            </tr>
          )}
          {games.map((game) => {
            const totalMarks80 = games.reduce(
              (acc, game) =>
                acc +
                game.scores.reduce(
                  (acc, score) =>
                    score.target === "BULL" ? acc : acc + score.marks,
                  0
                ),
              0
            );

            const totalMarksFull = games.reduce(
              (acc, game) =>
                acc + game.scores.reduce((acc, score) => acc + score.marks, 0),
              0
            );

            const averageMarksPerRound80 =
              (totalMarks80 /
                game.scores.reduce(
                  (acc, score) =>
                    score.target === "BULL" ? acc : acc + score.throws,
                  0
                )) *
              3;
            const averageMarksPerRoundFull =
              (totalMarksFull /
                game.scores.reduce((acc, score) => acc + score.throws, 0)) *
              3;

            return (
              <tr key={game.id}>
                <td>{`${new Date(game.played_at).getFullYear()}/${
                  new Date(game.played_at).getMonth() + 1
                }/${new Date(game.played_at).getDate()} ${new Date(
                  game.played_at
                ).getHours()}:${new Date(game.played_at).getMinutes()}`}</td>
                <td>
                  {game.scores.find((score) => score.target === "20")?.throws}（
                  {game.scores.find((score) => score.target === "20")?.marks}）
                </td>
                <td>
                  {game.scores.find((score) => score.target === "19")?.throws}（
                  {game.scores.find((score) => score.target === "19")?.marks}）
                </td>
                <td>
                  {game.scores.find((score) => score.target === "18")?.throws}（
                  {game.scores.find((score) => score.target === "18")?.marks}）
                </td>
                <td>
                  {game.scores.find((score) => score.target === "17")?.throws}（
                  {game.scores.find((score) => score.target === "17")?.marks}）
                </td>
                <td>
                  {game.scores.find((score) => score.target === "16")?.throws}（
                  {game.scores.find((score) => score.target === "16")?.marks}）
                </td>
                <td>
                  {game.scores.find((score) => score.target === "15")?.throws}（
                  {game.scores.find((score) => score.target === "15")?.marks}）
                </td>
                <td>
                  {game.scores.find((score) => score.target === "BULL")?.throws}
                  （
                  {game.scores.find((score) => score.target === "BULL")?.marks}
                  ）
                </td>
                <td>
                  {game.scores.reduce((acc, score) => acc + score.throws, 0)}（
                  {game.scores.reduce((acc, score) => acc + score.marks, 0)}）
                </td>
                <td>
                  {averageMarksPerRound80.toFixed(2)}（
                  {convertAverageMarksPerRoundToRate(averageMarksPerRound80)}）
                </td>
                <td>
                  {averageMarksPerRoundFull.toFixed(2)}（
                  {convertAverageMarksPerRoundToRate(averageMarksPerRoundFull)}
                  ）
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link href="/in-game">ゲームを開始</Link>
    </main>
  );
}
