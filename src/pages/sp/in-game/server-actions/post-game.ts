'use server';

import { postGame } from '@/entities/game/api/postGame';
import { redirect } from 'next/navigation';

export async function postGameActions(formData: FormData) {
  const response = await postGame(formData);

  if (response.status === 201) {
    redirect('/');
  }
}
