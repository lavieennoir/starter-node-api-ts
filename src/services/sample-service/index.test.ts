import 'jest';
import { sum } from '.';

describe('calculate', function () {
  it('add', function () {
    const result = sum(5, 2);
    expect(result).toBe(7);
  });
});
