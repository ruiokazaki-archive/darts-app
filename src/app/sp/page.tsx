import { getGames } from '@/app/api/games/fetcher';
import { Heading } from '@/components/ui/heading';
import { Sheet } from '@/components/ui/sheet';
import { Typography } from '@/components/ui/typography';
import { RatingChart } from '@/features/rate/components/rating-chart';
import { convertAverageMarksPerRoundToRate } from '@/features/rate/utils';
import {
  averageMarksPerRound80,
  averageMarksPerRound100,
} from '@/features/rate/utils/get-average-marks-per-round';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

  return (
    <main>
      <Heading variant='h1' className='sr-only'>
        TopPage
      </Heading>

      <div className='mx-8 my-10'>
        <RatingChart
          rating={convertAverageMarksPerRoundToRate(averageMarks80Latest)}
          ratingDiff={ratingDiff}
        />
      </div>

      <div className='mx-4 grid h-28 grid-cols-3 gap-2'>
        <Sheet>
          <div className='flex flex-col items-center py-4'>
            <Typography as='h3' variant='table-header'>
              Throws
            </Typography>
            <Typography variant='h2' as='p' className='tracking-normal'>
              {totalThrowsLatest.toFixed(0)}
            </Typography>
            <div className='flex items-center'>
              {totalThrowsDiff < 0 ? (
                <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              ) : (
                <ChevronDown className='h-[0.625rem] w-[0.625rem] stroke-red-200' />
              )}
              <Typography
                className={
                  totalThrowsDiff < 0 ? 'text-lime-200' : 'text-red-200'
                }
                variant='detail'
              >
                {totalThrowsDiff.toFixed(0)}
              </Typography>
            </div>
          </div>
        </Sheet>
        <Sheet>
          <div className='flex flex-col items-center py-4'>
            <Typography as='h3' variant='table-header'>
              MPR 80
            </Typography>
            <Typography variant='h2' as='p' className='tracking-normal'>
              {averageMarks80Latest.toFixed(2)}
            </Typography>
            <div className='flex items-center'>
              {averageMarks80Diff > 0 ? (
                <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              ) : (
                <ChevronDown className='h-[0.625rem] w-[0.625rem] stroke-red-200' />
              )}
              <Typography
                className={
                  averageMarks80Diff > 0 ? 'text-lime-200' : 'text-red-200'
                }
                variant='detail'
              >
                {averageMarks80Diff.toFixed(2)}
              </Typography>
            </div>
          </div>
        </Sheet>
        <Sheet>
          <div className='flex flex-col items-center py-4'>
            <Typography as='h3' variant='table-header'>
              MPR 100
            </Typography>
            <Typography variant='h2' as='p' className='tracking-normal'>
              {averageMarks100Latest.toFixed(2)}
            </Typography>
            <div className='flex items-center'>
              {averageMarks100Diff > 0 ? (
                <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              ) : (
                <ChevronDown className='h-[0.625rem] w-[0.625rem] stroke-red-200' />
              )}
              <Typography
                className={
                  averageMarks100Diff > 0 ? 'text-lime-200' : 'text-red-200'
                }
                variant='detail'
              >
                {averageMarks100Diff.toFixed(2)}
              </Typography>
            </div>
          </div>
        </Sheet>
      </div>
    </main>
  );
}
