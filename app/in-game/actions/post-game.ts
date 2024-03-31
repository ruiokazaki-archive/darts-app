'use server';

import { postGame } from '@/app/api/games/fetcher';
import { redirect } from 'next/navigation';

export async function postGameActions(formData: FormData) {
  const response = await postGame(formData);

  if (response.status === 201) {
    redirect('/');
  }
}
