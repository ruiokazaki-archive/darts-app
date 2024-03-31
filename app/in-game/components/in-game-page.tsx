'use client';

import { postGameActions } from '@/app/in-game/actions/post-game';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { memo, useEffect, useRef, useState } from 'react';

const TARGETS = ['20', '19', '18', '17', '16', '15', 'bull'] as const;
type Target = (typeof TARGETS)[number];

const Presenter: FC = () => {
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

  const buttonStyles: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > = {
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  };

  return (
    <div>
      <h2>
        currentTarget: <span style={{ fontSize: 40 }}>{currentTarget}</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 60px)',
        }}
      >
        <button
          type='button'
          {...buttonStyles}
          disabled={scores[currentTarget].marksCount >= 10}
          onClick={() => handleChange(currentTarget, 1)}
        >
          1MARK
        </button>
        <button
          type='button'
          {...buttonStyles}
          disabled={scores[currentTarget].marksCount >= 10}
          onClick={() => handleChange(currentTarget, 2)}
        >
          2MARK
        </button>
        <button
          type='button'
          {...buttonStyles}
          disabled={
            scores[currentTarget].marksCount >= 10 || currentTarget === 'bull'
          }
          onClick={() => handleChange(currentTarget, 3)}
        >
          3MARK
        </button>
        <button
          type='button'
          {...buttonStyles}
          disabled={scores[currentTarget].marksCount >= 10}
          onClick={() => handleChange(currentTarget, 0)}
        >
          1MISS
        </button>
        <button
          type='button'
          {...buttonStyles}
          disabled={scores[currentTarget].marksCount >= 10}
          onClick={() => handleChange(currentTarget, 0, 2)}
        >
          2MISS
        </button>
        <button
          type='button'
          {...buttonStyles}
          disabled={scores[currentTarget].marksCount >= 10}
          onClick={() => handleChange(currentTarget, 0, 3)}
        >
          3MISS
        </button>
      </div>

      <h3>currentScore: {scores[currentTarget].marksCount}</h3>
      <h3>currentThrows: {scores[currentTarget].throwsCount}</h3>

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

export const InGamePage = memo(Presenter);
