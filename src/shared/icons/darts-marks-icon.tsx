'use client';

import { Typography } from '@/shared/ui/typography';
import { type SVGProps, memo } from 'react';
const SvgComponent = ({
  counts,
  ...props
}: SVGProps<SVGSVGElement> & {
  counts: { marksCount?: number; missesCount?: number };
}) => {
  if (counts.marksCount)
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='3rem'
        height='3rem'
        fill='none'
        viewBox='0 0 49 48'
        aria-hidden='true'
        {...props}
      >
        <path
          fill='#fff'
          fillRule='evenodd'
          clipRule='evenodd'
          d={(() => {
            switch (counts.marksCount) {
              case 1:
                return 'm42.667 0-42 42 6 6 42-42-6-6Z';
              case 2:
                return 'M18 24 0 42l6 6 18-18 18 18 6-6-18-18L48 6l-6-6-18 18L6 0 0 6l18 18Z';
              case 3:
                return 'm10.983 31.35 7.35-7.35-7.819-7.82a15.843 15.843 0 0 0-1.695 7.155c0 2.923.788 5.662 2.164 8.016Zm-4.608 4.608L.333 42l6 6 6.094-6.094a22.17 22.17 0 0 0 12.302 3.702 22.17 22.17 0 0 0 11.82-3.392L42.334 48l6-6-5.578-5.579a22.174 22.174 0 0 0 4.247-13.086A22.17 22.17 0 0 0 43.3 11.033L48.333 6l-6-6-4.98 4.981a22.17 22.17 0 0 0-12.624-3.92c-4.89 0-9.413 1.576-13.087 4.248L6.333 0l-6 6 5.514 5.514a22.17 22.17 0 0 0-3.392 11.82c0 4.688 1.447 9.036 3.92 12.624Zm26.37-26.37a15.837 15.837 0 0 0-8.016-2.163c-3.13 0-6.047.903-8.508 2.463L24.333 18l8.412-8.411Zm5.925 6.075L30.333 24l7.842 7.842a15.835 15.835 0 0 0 2.464-8.507c0-2.782-.714-5.397-1.969-7.672ZM31.882 37.55 24.334 30l-7.276 7.276a15.838 15.838 0 0 0 7.672 1.968c2.573 0 5.003-.61 7.154-1.695Z';
            }
          })()}
        />
      </svg>
    );

  if (counts.missesCount)
    return (
      <Typography as='p' variant='h1'>
        {counts.missesCount === 1 && '🥺'}
        {counts.missesCount === 2 && '😢'}
        {counts.missesCount === 3 && '😭'}
      </Typography>
    );

  return null;
};
export const DartsMarksIcon = memo(SvgComponent);
