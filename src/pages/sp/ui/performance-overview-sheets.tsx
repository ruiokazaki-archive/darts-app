import { Typography } from '@/shared/ui/typography';
import { ChevronDown, ChevronUp, Sheet } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';

type Props = {
  totalThrowsLatest: number;
  totalThrowsDiff: number;
  averageMarks80Latest: number;
  averageMarks80Diff: number;
  averageMarks100Latest: number;
  averageMarks100Diff: number;
};

const Component: FC<Props> = ({
  totalThrowsLatest,
  totalThrowsDiff,
  averageMarks80Latest,
  averageMarks80Diff,
  averageMarks100Latest,
  averageMarks100Diff,
}) => {
  return (
    <div className='grid h-28 w-full grid-cols-3 gap-2'>
      <Sheet>
        <div className='flex flex-col items-center py-4'>
          <Typography as='h3' variant='p-bold'>
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
              className={totalThrowsDiff < 0 ? 'text-lime-200' : 'text-red-200'}
              variant='small'
            >
              {totalThrowsDiff.toFixed(0)}
            </Typography>
          </div>
        </div>
      </Sheet>
      <Sheet>
        <div className='flex flex-col items-center py-4'>
          <Typography as='h3' variant='p-bold'>
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
              variant='small'
            >
              {averageMarks80Diff.toFixed(2)}
            </Typography>
          </div>
        </div>
      </Sheet>
      <Sheet>
        <div className='flex flex-col items-center py-4'>
          <Typography as='h3' variant='p-bold'>
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
              variant='small'
            >
              {averageMarks100Diff.toFixed(2)}
            </Typography>
          </div>
        </div>
      </Sheet>
    </div>
  );
};

export const PerformanceOverviewSheets = memo(Component);
