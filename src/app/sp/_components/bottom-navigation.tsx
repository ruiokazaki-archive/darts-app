'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/shadcn/utils';
import {
  CalendarDaysIcon,
  Gamepad2Icon,
  HomeIcon,
  LineChartIcon,
  SettingsIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { memo } from 'react';

const getCurrentPageType = (pathname: string) => {
  if (pathname.startsWith('/sp/data')) return 'DATA';
  if (pathname.startsWith('/sp/in-game')) return 'IN_GAME';
  if (pathname.startsWith('/sp/activities')) return 'ACTIVITIES';
  if (pathname.startsWith('/sp/settings')) return 'SETTINGS';

  return 'HOME';
};

const Presenter: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isCurrentPage = getCurrentPageType(pathname);

  if (isCurrentPage === 'IN_GAME') return null;

  return (
    <div className='relative grid h-14 grid-cols-[1fr_1fr_auto_1fr_1fr] bg-zinc-800 pt-2'>
      <Button
        className='flex h-full flex-col justify-end gap-0.5 bg-transparent p-0 hover:bg-transparent hover:opacity-60'
        onClick={() => router.push('/sp/')}
      >
        <HomeIcon
          className={cn(
            'size-6',
            isCurrentPage !== 'HOME' && 'stroke-gray-500',
          )}
        />
        <Typography
          variant='detail'
          className={cn(isCurrentPage !== 'HOME' && 'text-gray-500')}
        >
          Home
        </Typography>
      </Button>
      <Button
        className='flex h-full flex-col justify-end gap-0.5 bg-transparent p-0 hover:bg-transparent hover:opacity-60'
        onClick={() => router.push('/sp/data')}
      >
        <LineChartIcon
          className={cn(
            'size-6',
            isCurrentPage !== 'DATA' && 'stroke-gray-500',
          )}
        />
        <Typography
          variant='detail'
          className={cn(isCurrentPage !== 'DATA' && 'text-gray-500')}
        >
          Data
        </Typography>
      </Button>
      <div className='w-16'>
        <Button
          className='-translate-x-1/2 -top-4 absolute left-1/2 size-14 rounded-full border-4 border-zinc-800 bg-transparent bg-white p-0'
          variant='ghost'
          onClick={() => router.push('/sp/in-game')}
        >
          <Gamepad2Icon className='size-7 stroke-zinc-800' />
        </Button>
      </div>
      <Button
        className='flex h-full flex-col justify-end gap-0.5 bg-transparent p-0 hover:bg-transparent hover:opacity-60'
        onClick={() => router.push('/sp/activities')}
      >
        <CalendarDaysIcon
          className={cn(
            'size-6',
            isCurrentPage !== 'ACTIVITIES' && 'stroke-gray-500',
          )}
        />
        <Typography
          variant='detail'
          className={cn(isCurrentPage !== 'DATA' && 'text-gray-500')}
        >
          Activities
        </Typography>
      </Button>
      <Button
        className='flex h-full flex-col justify-end gap-0.5 bg-transparent p-0 hover:bg-transparent hover:opacity-60'
        onClick={() => router.push('/sp/settings')}
      >
        <SettingsIcon
          className={cn(
            'size-6',
            isCurrentPage !== 'SETTINGS' && 'stroke-gray-500',
          )}
        />
        <Typography
          variant='detail'
          className={cn(isCurrentPage !== 'DATA' && 'text-gray-500')}
        >
          Settings
        </Typography>
      </Button>
    </div>
  );
};

export const BottomNavigation = memo(Presenter);
