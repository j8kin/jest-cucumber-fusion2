import { Then } from '../../../index';
import { stepArgType, onlineSales } from '../step-definitions/step-helpers';
import { salesPrice } from './when-steps';

Then(/^I have (\d+) items for sales$/, (nItems: stepArgType) => {
  if (typeof nItems !== 'string')
    throw new Error('Invalid step parameter type');
  expect(onlineSales).toBeDefined();
  expect(onlineSales.listedItems.size).toBe(Number(nItems));
});

Then(/^I should still get \$(\d+)$/, (expectedSalesPrice: stepArgType) => {
  if (typeof expectedSalesPrice !== 'string')
    throw new Error('Invalid step parameter type');

  expect(salesPrice).toBe(Number(expectedSalesPrice));
});

Then(
  /^the (\d+)(?:th|d|nd|rd|st) item (\d+)(?:th|d|nd|rd|st) price has a price amount of (\d+) which is a '(\w*)'$/,
  (
    indexItem: stepArgType,
    indexPrice: stepArgType,
    amountPrice: stepArgType,
    typePrice: stepArgType
  ) => {
    if (typeof amountPrice !== 'string')
      throw new Error('Invalid step parameter type');

    expect(salesPrice).toBe(Number(amountPrice));
  }
);

Then(/^I should get \$(\d+)$/, (expectedSalesPrice: stepArgType) => {
  if (typeof expectedSalesPrice !== 'string')
    throw new Error('Invalid step parameter type');
  expect(salesPrice).toBe(Number(expectedSalesPrice));
});

Then(/^I get \$<Amount>$/, (expectedSalesPrice: stepArgType) => {
  expect(salesPrice).toBe(100);
});
