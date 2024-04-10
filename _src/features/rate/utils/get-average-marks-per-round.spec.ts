import { describe, expect, test } from 'vitest';
import type { GameWithScores } from '../../../app/api/games/types';
import {
  averageMarksPerRound80,
  averageMarksPerRound100,
} from './get-average-marks-per-round';

const gameWithScores: GameWithScores = {
  id: '',
  created_at: '',
  played_at: '',
  scores: [
    { game_id: '', id: '', target: '20', marks: 3, throws: 3 },
    { game_id: '', id: '', target: '18', marks: 1, throws: 2 },
    { game_id: '', id: '', target: 'BULL', marks: 2, throws: 1 },
  ],
};

describe('averageMarksPerRound80', () => {
  test('BULLを除いたスコアで平均値を計算する', () => {
    expect(averageMarksPerRound80(gameWithScores).toFixed(2)).toBe(
      (
        ((gameWithScores.scores[0].marks + gameWithScores.scores[1].marks) /
          (gameWithScores.scores[0].throws + gameWithScores.scores[1].throws)) *
        3
      ).toFixed(2),
    );
  });
});

describe('averageMarksPerRound100', () => {
  test('全スコアで平均値を計算する', () => {
    expect(averageMarksPerRound100(gameWithScores).toFixed(2)).toBe(
      (
        ((gameWithScores.scores[0].marks +
          gameWithScores.scores[1].marks +
          gameWithScores.scores[2].marks) /
          (gameWithScores.scores[0].throws +
            gameWithScores.scores[1].throws +
            gameWithScores.scores[2].throws)) *
        3
      ).toFixed(2),
    );
  });
});
