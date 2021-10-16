import { Before, After, Given, Fusion } from '../../../index';
import { stepArgType } from '../step-definitions/step-helpers';

let someNumber: number = 0;

Before(() => {
  if (someNumber !== 42) {
    someNumber = someNumber + 1;
  }
});

After(() => {
  if (someNumber === 12) {
    // set 42 to verify this value in next scenario
    someNumber = 42;
  }
});

Given(/^Some Number is (\d+)$/, (num: stepArgType) => {
  if (typeof num !== 'string') throw new Error('Invalid step parameter type');
  expect(someNumber).toBe(Number(num));
});

Given(/^Set Some Number to (\d+)$/, (num: stepArgType) => {
  if (typeof num !== 'string') throw new Error('Invalid step parameter type');
  someNumber = Number(num);
});

Fusion('../fusion-before-after.feature');
