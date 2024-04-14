'use client';

import { DartsMarksIcon } from '@/shared/icons/darts-marks-icon';
import { Button } from '@/shared/ui/button';
import { Sheet } from '@/shared/ui/sheet';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Typography } from '@/shared/ui/typography';
import { AlertTriangle, Table } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { postGameActions } from './server-actions/post-game';

const TARGETS = ['20', '19', '18', '17', '16', '15', 'bull'] as const;
type Target = (typeof TARGETS)[number];

const Component: FC = () => {
  const [currentTarget, setCurrentTarget] = useState<Target>(TARGETS[0]);

  const [scores, setScores] = useState<{
    [key in Target]: { marksCount: number; throwsCount: number };
  }>({
    20: { marksCount: 0, throwsCount: 0 },
    19: { marksCount: 0, throwsCount: 0 },
    18: { marksCount: 0, throwsCount: 0 },
    17: { marksCount: 0, throwsCount: 0 },
    16: { marksCount: 0, throwsCount: 0 },
    15: { marksCount: 0, throwsCount: 0 },
    bull: { marksCount: 0, throwsCount: 0 },
  });

  const handleChange = (
    target: Target,
    difference: number,
    throwsCount = 1,
  ) => {
    setScores(prevScores => ({
      ...prevScores,
      [target]: {
        marksCount: prevScores[target].marksCount + difference,
        throwsCount: prevScores[target].throwsCount + throwsCount,
      },
    }));
  };

  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (scores[currentTarget].marksCount < 10) {
      return;
    }

    const nextTargetIndex = TARGETS.indexOf(currentTarget) + 1;
    if (nextTargetIndex < TARGETS.length) {
      setCurrentTarget(TARGETS[nextTargetIndex]);
    } else {
      submitRef.current?.click();
    }
  }, [scores, currentTarget]);

  return (
    <div className='px-4'>
      <Sheet className='my-4 grid h-[calc(100dvw_-_2rem_-_2rem)] w-[calc(100dvw_-_2rem)] place-items-center'>
        <span className='absolute size-[calc(100dvw_-_2rem_-_2rem_-_2.5rem)] rounded-full bg-red-900' />
        <span className='absolute size-[calc(100dvw_-_2rem_-_2rem_-_5rem)] rounded-full bg-red-700' />
        <span className='absolute size-[calc(100dvw_-_2rem_-_2rem_-_7.5rem)] rounded-full bg-red-800' />
        <span className='absolute size-[calc(100dvw_-_2rem_-_2rem_-_10rem)] rounded-full bg-red-700' />
        <span className='absolute size-[calc(100dvw_-_2rem_-_2rem_-_12.5rem)] rounded-full bg-red-900' />
        <Typography variant='h1' as='p' className='absolute'>
          {currentTarget}
        </Typography>
      </Sheet>

      <div className='my-4'>
        <Typography variant='h4' as='p'>
          {scores[currentTarget].throwsCount} Throws Made
        </Typography>
        <Typography variant='h4' as='p'>
          {10 - scores[currentTarget].marksCount} Marks Left
        </Typography>
      </div>

      <div className='gird-rows-2 grid grid-cols-3 gap-2'>
        <Sheet className='grid place-items-center gap-2 px-2 py-5' asChild>
          <button
            disabled={scores[currentTarget].marksCount >= 10}
            type='button'
            onClick={() => handleChange(currentTarget, 1)}
          >
            <Typography variant='p-bold'>1 Mark</Typography>
            <DartsMarksIcon counts={{ marksCount: 1 }} />
          </button>
        </Sheet>
        <Sheet className='grid place-items-center gap-2 px-2 py-5' asChild>
          <button
            disabled={scores[currentTarget].marksCount >= 10}
            type='button'
            onClick={() => handleChange(currentTarget, 2)}
          >
            <Typography variant='p-bold'>2 Marks</Typography>
            <DartsMarksIcon counts={{ marksCount: 2 }} />
          </button>
        </Sheet>
        <Sheet className='grid place-items-center gap-2 px-2 py-5' asChild>
          <button
            disabled={
              scores[currentTarget].marksCount >= 10 || currentTarget === 'bull'
            }
            type='button'
            onClick={() => handleChange(currentTarget, 3)}
          >
            <Typography variant='p-bold'>3 Marks</Typography>
            <DartsMarksIcon counts={{ marksCount: 3 }} />
          </button>
        </Sheet>
        <Sheet className='grid place-items-center gap-2 px-2 py-5' asChild>
          <button
            disabled={scores[currentTarget].marksCount >= 10}
            type='button'
            onClick={() => handleChange(currentTarget, 0, 1)}
          >
            <Typography variant='p-bold'>1 Miss</Typography>
            <DartsMarksIcon counts={{ missesCount: 1 }} />
          </button>
        </Sheet>
        <Sheet className='grid place-items-center gap-2 px-2 py-5' asChild>
          <button
            disabled={scores[currentTarget].marksCount >= 10}
            type='button'
            onClick={() => handleChange(currentTarget, 0, 2)}
          >
            <Typography variant='p-bold'>2 Misses</Typography>
            <DartsMarksIcon counts={{ missesCount: 2 }} />
          </button>
        </Sheet>
        <Sheet className='grid place-items-center gap-2 px-2 py-5' asChild>
          <button
            disabled={scores[currentTarget].marksCount >= 10}
            type='button'
            onClick={() => handleChange(currentTarget, 0, 3)}
          >
            <Typography variant='p-bold'>3 Misses</Typography>
            <DartsMarksIcon counts={{ missesCount: 3 }} />
          </button>
        </Sheet>
      </div>

      <div className='my-4 w-[calc(100dvw_-_2rem)]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {TARGETS.map(target => (
                <TableHead className='uppercase' key={target}>
                  <Typography variant='body'>{target}</Typography>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='text-left'>
                <Typography variant='body'>Throws</Typography>
              </TableCell>
              {TARGETS.map(target => (
                <TableCell className='text-right'>
                  <Typography variant='body'>
                    {scores[target].throwsCount}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className='text-left'>
                <Typography variant='body'>Marks</Typography>
              </TableCell>
              {TARGETS.map(target => (
                <TableCell className='text-right'>
                  <Typography variant='body'>
                    {scores[target].marksCount}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Button
        className='mx-auto my-10 flex w-fit gap-2 bg-zinc-800 hover:bg-zinc-800 hover:opacity-60'
        asChild
      >
        <Link href='/sp'>
          <AlertTriangle size='1rem' />
          <Typography variant='body'>Quit Game</Typography>
        </Link>
      </Button>

      <form action={postGameActions}>
        <input
          id='target-20-throws_count'
          type='hidden'
          name='target-20-throws_count'
          value={scores[20].throwsCount}
        />
        <input
          id='target-19-throws_count'
          type='hidden'
          name='target-19-throws_count'
          value={scores[19].throwsCount}
        />
        <input
          id='target-18-throws_count'
          type='hidden'
          name='target-18-throws_count'
          value={scores[18].throwsCount}
        />
        <input
          id='target-17-throws_count'
          type='hidden'
          name='target-17-throws_count'
          value={scores[17].throwsCount}
        />
        <input
          id='target-16-throws_count'
          type='hidden'
          name='target-16-throws_count'
          value={scores[16].throwsCount}
        />
        <input
          id='target-15-throws_count'
          type='hidden'
          name='target-15-throws_count'
          value={scores[15].throwsCount}
        />
        <input
          id='target-bull-throws_count'
          type='hidden'
          name='target-bull-throws_count'
          value={scores.bull.throwsCount}
        />
        <input
          id='target-20-marks_count'
          type='hidden'
          name='target-20-marks_count'
          value={scores[20].marksCount}
        />
        <input
          id='target-19-marks_count'
          type='hidden'
          name='target-19-marks_count'
          value={scores[19].marksCount}
        />
        <input
          id='target-18-marks_count'
          type='hidden'
          name='target-18-marks_count'
          value={scores[18].marksCount}
        />
        <input
          id='target-17-marks_count'
          type='hidden'
          name='target-17-marks_count'
          value={scores[17].marksCount}
        />
        <input
          id='target-16-marks_count'
          type='hidden'
          name='target-16-marks_count'
          value={scores[16].marksCount}
        />
        <input
          id='target-15-marks_count'
          type='hidden'
          name='target-15-marks_count'
          value={scores[15].marksCount}
        />
        <input
          id='target-bull-marks_count'
          type='hidden'
          name='target-bull-marks_count'
          value={scores.bull.marksCount}
        />
        <button
          hidden
          ref={submitRef}
          type='submit'
          disabled={Object.values(scores).some(score => score.marksCount < 10)}
        >
          Finish
        </button>
      </form>
    </div>
  );
};

export default memo(Component);
