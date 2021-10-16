import { When } from '../../../index';
import { stepArgType, onlineSales } from '../step-definitions/step-helpers';

// Test Variable
export var salesPrice: number | undefined;

When(
  /^I bought a new item '(.*)' at the price of (\d+)$/,
  (item: stepArgType, price: stepArgType) => {
    if (typeof item !== 'string')
      throw new Error('Invalid step parameter type');
    if (typeof price !== 'string')
      throw new Error('Invalid step parameter type');
    onlineSales.buyItem(item, Number(price));
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
