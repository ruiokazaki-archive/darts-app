'use server';

import { redirect } from 'next/navigation';
import { postGame } from '../../../api/games/fetcher';

export async function postGameActions(formData: FormData) {
  const response = await postGame(formData);

  if (response.status === 201) {
    redirect('/');
  }
}
