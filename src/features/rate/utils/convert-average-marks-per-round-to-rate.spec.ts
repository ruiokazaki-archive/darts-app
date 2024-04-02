import { describe, expect, test } from 'vitest';
import { convertAverageMarksPerRoundToRate } from './convert-average-marks-per-round-to-rate';

describe('convertAverageMarksPerRoundToRate', () => {
  test('Average Marks per Roundをレートに変換する', () => {
    expect(convertAverageMarksPerRoundToRate(0).toFixed(2)).toBe('1.00');
    expect(convertAverageMarksPerRoundToRate(1.4).toFixed(2)).toBe('2.50');
    expect(convertAverageMarksPerRoundToRate(4.75).toFixed(2)).toBe('18.00');
  });

  test('Average Marks per Roundをレートに変換する:境界値と進捗率', () => {
    expect(convertAverageMarksPerRoundToRate(1.3).toFixed(2)).toBe('2.00');
    expect(convertAverageMarksPerRoundToRate(1.29).toFixed(2)).toBe('1.99');

    expect(convertAverageMarksPerRoundToRate(3.5).toFixed(2)).toBe('13.00');
    expect(convertAverageMarksPerRoundToRate(3.49).toFixed(2)).toBe('12.95');

    expect(convertAverageMarksPerRoundToRate(4.0).toFixed(2)).toBe('15.00');
    expect(convertAverageMarksPerRoundToRate(3.99).toFixed(2)).toBe('14.96');
  });

  test('Average Marks per Roundが範囲外の場合はエラーを投げる', () => {
    expect(() => convertAverageMarksPerRoundToRate(-1)).toThrow();
  });
});
