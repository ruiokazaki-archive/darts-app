import { customFetch } from '../../../common/custom-fetch';
import type { GameWithScores } from './types';

export async function getGames() {
  return customFetch<GameWithScores[]>('/api/games');
}

export async function postGame(data: FormData) {
  if (
    !(
      data.get('target-20-throws_count') &&
      data.get('target-19-throws_count') &&
      data.get('target-18-throws_count') &&
      data.get('target-17-throws_count') &&
      data.get('target-16-throws_count') &&
      data.get('target-15-throws_count') &&
      data.get('target-bull-throws_count') &&
      data.get('target-20-marks_count') &&
      data.get('target-19-marks_count') &&
      data.get('target-18-marks_count') &&
      data.get('target-17-marks_count') &&
      data.get('target-16-marks_count') &&
      data.get('target-15-marks_count') &&
      data.get('target-bull-marks_count')
    )
  )
    return Promise.reject('Missing data');

  return customFetch('/api/games', {
    method: 'POST',
    body: data,
  });
}
