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
];

// Average Marks per Roundをレートに変換する
export function convertAverageMarksPerRoundToRate(
  averageMarksPerRound: number,
): number {
  const { rate } = RATE_SCORES.slice()
    .reverse()
    .find(
      rate => rate.score <= averageMarksPerRound,
    ) as (typeof RATE_SCORES)[number];

  if (!rate) {
    throw new Error('averageMarksPerRoundの値が定義されたスコア範囲外です。');
  }

  return rate;
}
