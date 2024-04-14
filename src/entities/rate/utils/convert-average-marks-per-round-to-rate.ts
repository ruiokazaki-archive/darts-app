import { RATE_SCORES } from '@/entities/rate/constants/rating-table';

export const convertAverageMarksPerRoundToRate = (
  averageMarksPerRound: number,
): number => {
  const rateScore = RATE_SCORES.find(
    (_, index, array) =>
      averageMarksPerRound >= array[index].score &&
      (index === array.length - 1 ||
        averageMarksPerRound < array[index + 1].score),
  );

  if (!rateScore) {
    throw new Error('averageMarksPerRoundの値が定義されたスコア範囲外です。');
  }

  // 最後のレートのスコアかどうかを確認
  if (rateScore === RATE_SCORES[RATE_SCORES.length - 1]) {
    return rateScore.rate;
  }

  const nextRateScore =
    RATE_SCORES[RATE_SCORES.findIndex(rs => rs === rateScore) + 1];
  const scoreRange = nextRateScore.score - rateScore.score;
  const progress = averageMarksPerRound - rateScore.score;
  const progressRate = progress / scoreRange;
  const realRate = rateScore.rate + progressRate;

  return realRate;
};
