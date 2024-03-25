import { getGames } from "@/app/api/games/fetcher";

export default async function Home() {
  const games = await getGames();

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
            <td>{game.scores.reduce((acc, score) => acc + score.throws, 0)}</td>
          </tr>
        ))}
      </table>
    </main>
  );
}
