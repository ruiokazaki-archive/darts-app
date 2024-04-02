import { getGames } from '@/app/api/games/fetcher';
import { Heading } from '@/components/ui/heading';
import { Sheet } from '@/components/ui/sheet';
import { Typography } from '@/components/ui/typography';
import { RatingChart } from '@/features/rate/components/rating-chart';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default async function Page() {
  const result = await getGames();
  if (result.status !== 200)
    return new Response('Error', { status: result.status });

  // const games = result.data;

  return (
    <main>
      <Heading variant='h1' className='sr-only'>
        TopPage
      </Heading>

      <div className='mx-8 my-10'>
        <RatingChart rating={3.75} ratingDiff={2.4248} />
      </div>

      <div className='mx-4 grid h-28 grid-cols-3 gap-2'>
        <Sheet>
          <div className='flex flex-col items-center py-4'>
            <Typography as='h3' variant='table-header'>
              Throws
            </Typography>
            <Typography variant='h2' as='p' className='tracking-normal'>
              299
            </Typography>
            <div className='flex items-center'>
              {Number(30) < 0 ? (
                <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              ) : (
                <ChevronDown className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              )}
              <Typography className='text-lime-200' variant='detail'>
                {(30).toFixed(2)}
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
              {(2.5).toFixed(2)}
            </Typography>
            <div className='flex items-center'>
              {Number(0.3) > 0 ? (
                <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              ) : (
                <ChevronDown className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              )}
              <Typography className='text-lime-200' variant='detail'>
                {(0.3).toFixed(2)}
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
              {(2.5).toFixed(2)}
            </Typography>
            <div className='flex items-center'>
              {Number(0.3) > 0 ? (
                <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              ) : (
                <ChevronDown className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
              )}
              <Typography className='text-lime-200' variant='detail'>
                {(0.3).toFixed(2)}
              </Typography>
            </div>
          </div>
        </Sheet>
      </div>
    </main>
  );
}
