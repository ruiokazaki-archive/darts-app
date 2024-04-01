import { getGames } from '@/app/api/games/fetcher';
import { convertAverageMarksPerRoundToRate } from '@/common/convert-average-marks-per-round-to-rate';
import { Button } from '@/components/ui/button';
import { ApexChartsWrapper } from '@/lib/apexcharts/apexcharts-wrapper';
import { format } from '@formkit/tempo';
import Link from 'next/link';

export const runtime = 'edge';
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const result = await getGames();
  if (result.status !== 200)
    return new Response('Error', { status: result.status });

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
          {games.map(game => {
            const totalMarks80 = game.scores.reduce(
              (acc, score) =>
                score.target === 'BULL' ? acc : acc + score.marks,
              0,
            );

            const totalMarksFull = game.scores.reduce(
              (acc, score) => acc + score.marks,
              0,
            );

            const averageMarksPerRound80 =
              (totalMarks80 /
                game.scores.reduce(
                  (acc, score) =>
                    score.target === 'BULL' ? acc : acc + score.throws,
                  0,
                )) *
              3;
            const averageMarksPerRoundFull =
              (totalMarksFull /
                game.scores.reduce((acc, score) => acc + score.throws, 0)) *
              3;

            return (
              <tr key={game.id}>
                <td>
                  {format({
                    date: game.played_at,
                    format: 'YYYY/MM/DD H:mm',
                    locale: 'ja',
                    tz: 'Asia/Tokyo',
                  })}
                </td>
                <td>
                  {game.scores.find(score => score.target === '20')?.throws}（
                  {game.scores.find(score => score.target === '20')?.marks}）
                </td>
                <td>
                  {game.scores.find(score => score.target === '19')?.throws}（
                  {game.scores.find(score => score.target === '19')?.marks}）
                </td>
                <td>
                  {game.scores.find(score => score.target === '18')?.throws}（
                  {game.scores.find(score => score.target === '18')?.marks}）
                </td>
                <td>
                  {game.scores.find(score => score.target === '17')?.throws}（
                  {game.scores.find(score => score.target === '17')?.marks}）
                </td>
                <td>
                  {game.scores.find(score => score.target === '16')?.throws}（
                  {game.scores.find(score => score.target === '16')?.marks}）
                </td>
                <td>
                  {game.scores.find(score => score.target === '15')?.throws}（
                  {game.scores.find(score => score.target === '15')?.marks}）
                </td>
                <td>
                  {game.scores.find(score => score.target === 'BULL')?.throws}（
                  {game.scores.find(score => score.target === 'BULL')?.marks}）
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
      <Button asChild variant='link'>
        <Link href='/in-game'>ゲームを開始</Link>
      </Button>
      <ApexChartsWrapper
        series={[75]}
        width={600}
        height={400}
        type='radialBar'
        options={{
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: '70%',
                background: '#fff',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: '#fff',
                strokeWidth: '67%',
                margin: 0,
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35,
                },
              },
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: '#888',
                  fontSize: '17px',
                },
                value: {
                  color: '#111',
                  fontSize: '36px',
                  show: true,
                },
              },
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#ABE5A1'],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
          stroke: {
            lineCap: 'round',
          },
          labels: ['Percent'],
        }}
      />
    </main>
  );
}
