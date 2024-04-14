import type { GameWithScores } from '@/entities/game/types';

const totalMarks80 = (game: GameWithScores) =>
  game.scores.reduce(
    (acc, score) => (score.target === 'BULL' ? acc : acc + score.marks),
    0,
  );

const totalMarks100 = (game: GameWithScores) =>
  game.scores.reduce((acc, score) => acc + score.marks, 0);

export const averageMarksPerRound80 = (game: GameWithScores) =>
  (totalMarks80(game) /
    game.scores.reduce(
      (acc, score) => (score.target === 'BULL' ? acc : acc + score.throws),
      0,
    )) *
  3;
export const averageMarksPerRound100 = (game: GameWithScores) =>
  (totalMarks100(game) /
    game.scores.reduce((acc, score) => acc + score.throws, 0)) *
  3;
