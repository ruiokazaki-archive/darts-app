import { getGames } from '@/app/api/games/fetcher';
import Heading from '@/components/ui/heading';
import { RatingChart } from '@/features/rate/components/rating-chart';

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
        <RatingChart rating={3} ratingDiff={2.4248} />
      </div>
    </main>
  );
}
