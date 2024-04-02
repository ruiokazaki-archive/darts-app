// FYI: https://www.dartslive.com/us/guide/rating/
const RATE_SCORES = [
  {
    rate: 1,
    score: 0.0,
  },
  {
    rate: 2,
    score: 1.3,
  },
  {
    rate: 3,
    score: 1.5,
  },
  {
    rate: 4,
    score: 1.7,
  },
  {
    rate: 5,
    score: 1.9,
  },
  {
    rate: 6,
    score: 2.1,
  },
  {
    rate: 7,
    score: 2.3,
  },
  {
    rate: 8,
    score: 2.5,
  },
  {
    rate: 9,
    score: 2.7,
  },
  {
    rate: 10,
    score: 2.9,
  },
  {
    rate: 11,
    score: 3.1,
  },
  {
    rate: 12,
    score: 3.3,
  },
  {
    rate: 13,
    score: 3.5,
  },
  {
    rate: 14,
    score: 3.75,
  },
  {
    rate: 15,
    score: 4.0,
  },
  {
    rate: 16,
    score: 4.25,
  },
  {
    rate: 17,
    score: 4.5,
  },
  {
    rate: 18,
    score: 4.75,
  },
] as const;

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
