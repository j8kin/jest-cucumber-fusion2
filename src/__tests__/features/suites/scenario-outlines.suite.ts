import { Before, Given, When, Then, And, But, Fusion } from '../../../index';
import { OnlineSales } from '../../src/online-sales';
import { stepArgType } from '../step-definitions/step-helpers';

let onlineSales: OnlineSales;
let salesPrice: number | undefined;

Before(() => {
  onlineSales = new OnlineSales();
});

Given(/^I have a\(n\) (.*)$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  onlineSales.listItem(item);
});

Given(
  /^I have an Item named '<ThatCouldLookLikeAnOutlineVariable>'$/,
  (item: stepArgType) => {
    onlineSales.listItem('Autographed Neil deGrasse Tyson book');
  }
);

When(/^I sell the (.*)$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  salesPrice = Number(onlineSales.sellItem(item));
});

When(/^I sell <ThatCouldLookLikeAnOutlineVariable With Spaces in it>$/, () => {
  salesPrice = Number(
    onlineSales.sellItem('Autographed Neil deGrasse Tyson book')
  );
});

Then(/^I should get \$(\d+)$/, (expectedSalesPrice: stepArgType) => {
  if (typeof expectedSalesPrice !== 'string')
    throw new Error('Invalid step parameter type');
  expect(salesPrice).toBe(Number(expectedSalesPrice));
});

Then(/^I get \$<Amount>$/, (expectedSalesPrice: stepArgType) => {
  expect(salesPrice).toBe(100);
});

Given(/^I want to sell all my (.*)$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  onlineSales.listItem(item);
});

When(
  /^I sell all my (.*) at the price of \$(\d+) CAD$/,
  (item: stepArgType, expectedSalesPrice: stepArgType) => {
    if (typeof item !== 'string')
      throw new Error('Invalid step parameter type');
    if (typeof expectedSalesPrice !== 'string')
      throw new Error('Invalid step parameter type');

    salesPrice = Number(onlineSales.sellItem(item));
    if (salesPrice) salesPrice = Number(expectedSalesPrice);
  }
);

When(
  /^I sell all my (.*) with a starting price of \$(\d+) at the rebate price of \$(\d+)$/,
  (
    item: stepArgType,
    startingPrice: stepArgType,
    expectedSalesPrice: stepArgType
  ) => {
    if (typeof item !== 'string')
      throw new Error('Invalid step parameter type');
    if (typeof expectedSalesPrice !== 'string')
      throw new Error('Invalid step parameter type');

    salesPrice = Number(onlineSales.sellItem(item));
    if (salesPrice) {
      salesPrice = Number(expectedSalesPrice);
    } else {
      salesPrice = undefined;
    }
  }
);

When(
  /^I sell all my (.*) with a starting price of \$(\d+) at the fantastic price of (\d+)\$ USD which is nice$/,
  (
    item: stepArgType,
    startingPrice: stepArgType,
    expectedSalesPrice: stepArgType
  ) => {
    if (typeof item !== 'string')
      throw new Error('Invalid step parameter type');
    if (typeof expectedSalesPrice !== 'string')
      throw new Error('Invalid step parameter type');

    salesPrice = Number(onlineSales.sellItem(item));
    if (salesPrice) {
      salesPrice = Number(expectedSalesPrice);
    } else {
      salesPrice = undefined;
    }
  }
);

When(
  /^I sell all my (.*) with a starting price of \$(\d+) at the fantastic price of (\d+)\$ CAD which is nice$/,
  (
    item: stepArgType,
    startingPrice: stepArgType,
    expectedSalesPrice: stepArgType
  ) => {
    if (typeof item !== 'string')
      throw new Error('Invalid step parameter type');
    if (typeof expectedSalesPrice !== 'string')
      throw new Error('Invalid step parameter type');

    salesPrice = Number(onlineSales.sellItem(item));
    if (salesPrice) {
      salesPrice = Number(expectedSalesPrice);
    } else {
      salesPrice = undefined;
    }
  }
);

When(
  /^I sell all my (.*) with a starting price of \$(\d+) at the rebate price of (\d+)\$ CAD which is nice$/,
  (
    item: stepArgType,
    startingPrice: stepArgType,
    expectedSalesPrice: stepArgType
  ) => {
    if (typeof item !== 'string')
      throw new Error('Invalid step parameter type');
    if (typeof expectedSalesPrice !== 'string')
      throw new Error('Invalid step parameter type');

    salesPrice = Number(onlineSales.sellItem(item));
    if (salesPrice) {
      salesPrice = Number(expectedSalesPrice);
    } else {
      salesPrice = undefined;
    }
  }
);

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

Fusion('../scenario-outlines.feature');
