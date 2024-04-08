import { getGames } from '@/app/api/games/fetcher';
import { RatingChart } from '@/features/rate/components/rating-chart';
import { RatingLineChart } from '@/features/rate/components/rating-line-chart';
import { convertAverageMarksPerRoundToRate } from '@/features/rate/utils';
import {
  averageMarksPerRound80,
  averageMarksPerRound100,
} from '@/features/rate/utils/get-average-marks-per-round';
import { PerformanceOverviewSheets } from './_components/performance-overview-sheets';

const GAMES_INCLUDED_IN_RATE_CALCULATION = 5 as const;

export default async function Page() {
  const result = await getGames();
  if (result.status !== 200)
    return new Response('Error', { status: result.status });

  const allGames = result.data;
  const latestGames = allGames.slice(0, -1);
  const earlierGames =
    allGames.length > GAMES_INCLUDED_IN_RATE_CALCULATION
      ? allGames.slice(1)
      : allGames;

  const averageMarks80Latest =
    latestGames.reduce((acc, game) => {
      return acc + averageMarksPerRound80(game);
    }, 0) / latestGames.length;

  const averageMarks100Latest =
    latestGames.reduce((acc, game) => {
      return acc + averageMarksPerRound100(game);
    }, 0) / latestGames.length;

  const averageMarks80Earlier =
    earlierGames.reduce((acc, game) => {
      return acc + averageMarksPerRound80(game);
    }, 0) / earlierGames.length;

  const averageMarks100Earlier =
    earlierGames.reduce((acc, game) => {
      return acc + averageMarksPerRound100(game);
    }, 0) / earlierGames.length;

  const totalThrowsLatest =
    latestGames.reduce(
      (total, game) =>
        total +
        game.scores.reduce((scoreTotal, score) => scoreTotal + score.throws, 0),
      0,
    ) / latestGames.length;
  const totalThrowsEarlier =
    earlierGames.reduce(
      (total, game) =>
        total +
        game.scores.reduce((scoreTotal, score) => scoreTotal + score.throws, 0),
      0,
    ) / earlierGames.length;

  const averageMarks80Diff = averageMarks80Latest - averageMarks80Earlier;
  const averageMarks100Diff = averageMarks100Latest - averageMarks100Earlier;
  const totalThrowsDiff = totalThrowsLatest - totalThrowsEarlier;
  const ratingDiff =
    convertAverageMarksPerRoundToRate(averageMarks80Latest) -
    convertAverageMarksPerRoundToRate(averageMarks80Earlier);

  const rating80LineChartData = allGames.map(game => ({
    played_at: game.played_at,
    rating: convertAverageMarksPerRoundToRate(averageMarksPerRound80(game)),
  }));
  const rating100LineChartData = allGames.map(game => ({
    played_at: game.played_at,
    rating: convertAverageMarksPerRoundToRate(averageMarksPerRound100(game)),
  }));

  return (
    <>
      <div className='mx-8 my-10'>
        <RatingChart
          rating={convertAverageMarksPerRoundToRate(averageMarks80Latest)}
          ratingDiff={ratingDiff}
        />
      </div>
      <div className='mx-4 my-10'>
        <PerformanceOverviewSheets
          totalThrowsLatest={totalThrowsLatest}
          totalThrowsDiff={totalThrowsDiff}
          averageMarks80Latest={averageMarks80Latest}
          averageMarks80Diff={averageMarks80Diff}
          averageMarks100Latest={averageMarks100Latest}
          averageMarks100Diff={averageMarks100Diff}
        />
      </div>
      <div className='mx-4 my-10'>
        <RatingLineChart
          games={rating80LineChartData}
          title='80% Rating per Game'
        />
      </div>
      <div className='mx-4 my-10'>
        <RatingLineChart
          games={rating100LineChartData}
          title='100% Rating per Game'
        />
      </div>
    </>
  );
}
