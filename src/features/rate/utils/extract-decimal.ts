/**
 * 整数を除いた少数第二位までの値を抽出する
 * @param { number } rating
 * @returns { number } 少数第二位までの値を整数で返す
 */
export function extractDecimal(rating: number) {
  if (rating < 0) throw new Error('rating must be greater than or equal to 0');

  return Math.floor((rating * 100) % 100);
}
