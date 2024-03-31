import { describe, expect, test } from 'vitest';
import { convertAverageMarksPerRoundToRate } from './convert-average-marks-per-round-to-rate';

describe('convertAverageMarksPerRoundToRate', () => {
  // テストは日本語で
  test('Average Marks per Roundをレートに変換する', () => {
    expect(convertAverageMarksPerRoundToRate(0)).toBe(1);
    expect(convertAverageMarksPerRoundToRate(1.4)).toBe(2);
    expect(convertAverageMarksPerRoundToRate(4.75)).toBe(18);
  });

  test('Average Marks per Roundをレートに変換する:境界値', () => {
    expect(convertAverageMarksPerRoundToRate(1.3)).toBe(2);
    expect(convertAverageMarksPerRoundToRate(1.29)).toBe(1);

    expect(convertAverageMarksPerRoundToRate(3.5)).toBe(13);
    expect(convertAverageMarksPerRoundToRate(3.49)).toBe(12);

    expect(convertAverageMarksPerRoundToRate(4.0)).toBe(15);
    expect(convertAverageMarksPerRoundToRate(3.99)).toBe(14);
  });

  test('Average Marks per Roundが範囲外の場合はエラーを投げる', () => {
    expect(() => convertAverageMarksPerRoundToRate(-1)).toThrow();
  });
});
