import { describe, expect, test } from 'vitest';
import { extractDecimal } from './extract-decimal';

describe('extractDecimal関数のテスト', () => {
  test('0を入力した場合、0を返す', () => {
    expect(extractDecimal(0)).toBe(0);
  });

  test('小数点以下が2桁の数値を入力した場合、そのままの値を返す', () => {
    expect(extractDecimal(1.23)).toBe(23);
  });

  test('小数点以下が3桁以上の数値を入力した場合、少数第二位までを返す', () => {
    expect(extractDecimal(4.567)).toBe(56);
  });

  test('負の数を入力した場合、エラーを投げる', () => {
    expect(() => extractDecimal(-1)).toThrow(
      'rating must be greater than or equal to 0',
    );
  });

  test('整数を入力した場合、0を返す', () => {
    expect(extractDecimal(5)).toBe(0);
  });

  test('小数点第一位が0の場合、正確な値を返す', () => {
    expect(extractDecimal(0.05)).toBe(5);
  });
});
