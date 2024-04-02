import { Typography } from '@/components/ui/typography';
import { extractDecimal } from '@/features/rate/utils';
import { ApexChartsWrapper } from '@/lib/apexcharts/apexcharts-wrapper';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';

const MIN_RATING_VALUE = 1 as const;

type Props = {
  rating: number;
  ratingDiff: number;
};

const Presenter: FC<Props> = ({ rating, ratingDiff }) => {
  return (
    <div className='relative h-80 w-full'>
      <div className='-translate-x-1/2 absolute top-1/3 left-1/2 z-10 flex transform flex-col items-center'>
        <Typography variant='small'>Rating</Typography>
        <Typography as='p' variant='h2' className='-mt-1 tracking-normal'>
          {rating.toFixed(2)}
        </Typography>
        <div className='flex items-center'>
          {ratingDiff > 0 ? (
            <ChevronUp className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
          ) : (
            <ChevronDown className='h-[0.625rem] w-[0.625rem] stroke-lime-200' />
          )}
          <Typography className='text-lime-200 text-xs'>
            {ratingDiff.toFixed(2)}
          </Typography>
        </div>
      </div>
      <ApexChartsWrapper
        series={[extractDecimal(rating) || MIN_RATING_VALUE]}
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
  );
};

export const RatingChart = memo(Presenter);
