import { ApexChartsWrapper } from '@/shared/libs/apexcharts/apexcharts-wrapper';
import { Sheet } from '@/shared/ui/sheet';
import { format } from '@formkit/tempo';
import { type FC, memo } from 'react';

type Props = {
  games: {
    played_at: string;
    rating: number;
  }[];
  title: string;
};

const Component: FC<Props> = ({ games, title }) => {
  return (
    <Sheet className='h-64 w-full p-2'>
      <ApexChartsWrapper
        series={[
          {
            name: 'Rating',
            data: games.map(game => Number(game.rating.toFixed(2))),
          },
        ]}
        width='100%'
        height='100%'
        type='line'
        options={{
          chart: {
            height: '100%',
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000000',
              top: -4,
              left: 0,
              blur: 4,
              opacity: 0.25,
            },
            toolbar: {
              show: false,
            },
            selection: {
              enabled: false,
            },
            zoom: {
              enabled: false,
            },
          },
          colors: ['#3b82f6'],
          stroke: {
            curve: 'straight',
          },
          title: {
            text: title,
            align: 'center',
            offsetY: 20,
            style: {
              color: 'white',
              fontSize: '1rem',
            },
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['transparent'],
            },
          },
          markers: {
            size: 1,
          },
          xaxis: {
            categories: games.map(game => format(game.played_at, 'MM/DD')),
            labels: {
              style: {
                colors: 'white',
              },
            },
          },
          yaxis: {
            min:
              Number(
                games
                  .slice()
                  .sort((a, b) => a.rating - b.rating)[0]
                  .rating.toFixed(0),
              ) - 1,
            max:
              Number(
                games
                  .slice()
                  .sort((a, b) => b.rating - a.rating)[0]
                  .rating.toFixed(0),
              ) + 1,
            tickAmount:
              Number(
                games
                  .slice()
                  .sort((a, b) => b.rating - a.rating)[0]
                  .rating.toFixed(0),
              ) +
              1 -
              (Number(
                games
                  .slice()
                  .sort((a, b) => a.rating - b.rating)[0]
                  .rating.toFixed(0),
              ) -
                1),
            labels: {
              style: {
                colors: 'white',
              },
            },
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        }}
      />
    </Sheet>
  );
};

export const RatingLineChart = memo(Component);
