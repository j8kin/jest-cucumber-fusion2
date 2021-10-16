import { Given } from '../../../index';
import { stepArgType, onlineSales } from '../step-definitions/step-helpers';

Given(/^I have (\d+) items for sales$/, (nItems: stepArgType) => {
  if (typeof nItems !== 'string')
    throw new Error('Invalid step parameter type');
  expect(onlineSales).toBeDefined();
  expect(onlineSales.listedItems.size).toBe(Number(nItems));
});

Given(/^I have a\(n\) (.*)$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  expect(onlineSales.hasItem(item)).toBeTruthy;
});

Given(
  /^I have an Item named '<ThatCouldLookLikeAnOutlineVariable>'$/,
  (item: stepArgType) => {
    expect(onlineSales.hasItem('Autographed Neil deGrasse Tyson book'))
      .toBeTruthy;
  }
);

Given(/^I want to sell all my (.*)$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  onlineSales.sellItem(item);
});
