import type { GameWithScores } from '@/entitie/game/types';
import { customFetch } from '@/shared/api/custom-fetch';

export async function getGames() {
  return customFetch<GameWithScores[]>('/api/games');
}
