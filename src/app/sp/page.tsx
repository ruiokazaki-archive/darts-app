import { getGames } from '@/app/api/games/fetcher';
import Heading from '@/components/ui/heading';
import { Typography } from '@/components/ui/typography';
import { ApexChartsWrapper } from '@/lib/apexcharts/apexcharts-wrapper';
import { ChevronUp } from 'lucide-react';

export const runtime = 'edge';
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const result = await getGames();
  if (result.status !== 200)
    return new Response('Error', { status: result.status });

  // const games = result.data;

  return (
    <main>
      <Heading variant='h1' className='sr-only'>
        TopPage
      </Heading>

      <div className='relative mx-auto my-10 h-80 w-[calc(100%_-_4rem)]'>
        <div className='-translate-x-1/2 absolute top-1/3 left-1/2 z-10 flex transform flex-col items-center'>
          <Typography variant='small'>Rating</Typography>
          <Typography as='p' variant='h2' className='-mt-1 tracking-normal'>
            2.99
          </Typography>
          <div className='flex items-center'>
            <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
            <Typography className='text-lime-200 text-xs'>0.30</Typography>
          </div>
        </div>
        <ApexChartsWrapper
          series={[75]}
          width='100%'
          height='100%'
          type='radialBar'
          options={{
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  size: '70%',
                  background: '#18181B',
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    color: '#000000',
                    top: -4,
                    left: 0,
                    blur: 4,
                    opacity: 0.25,
                  },
                },
                track: {
                  background: '#27272A',
                  strokeWidth: '70%',
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
                  show: false,
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
            labels: ['Rating'],
          }}
        />
      </div>
    </main>
  );
}
