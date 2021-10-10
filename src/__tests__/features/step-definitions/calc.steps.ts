import { Given } from '../../../index';
import { add } from '../../src/calc';
import { stepArgType } from './step-helpers';

Given('I add 1 and 2 and expect 3', () => {
  const answer = add(1, 2);
  expect(answer).toBe(3);
});

Given(
  /I add (\d+) and (\d+) and expect (\d+)/,
  (f: stepArgType, s: stepArgType, res: stepArgType) => {
    const answer = add(Number(f), Number(s));
    expect(answer).toBe(Number(res));
  }
);

Given('I calculate the following:', (table: stepArgType) => {
  if (typeof table === 'string') {
    throw new Error('Incorrect step usage. Use table instead of strings.');
  }
  table.forEach((row) => {
    const answer = add(Number(row.first), Number(row.second));
    expect(answer).toBe(Number(row.expected));
  });
});

Given(
  /I add '(\d+)' to the following numbers:/,
  (num: stepArgType, table: stepArgType) => {
    if (typeof num !== 'string') {
      throw new Error(
        `Incorrect step usage. Use number instead of table. ${num} type: ${typeof num}`
      );
    }
    if (typeof table === 'string') {
      throw new Error('Incorrect step usage. Use table instead of strings.');
    }

    table.forEach((row) => {
      const answer = add(Number(num), Number(row.number));
      expect(answer).toBe(Number(row.expected));
    });
  }
);
