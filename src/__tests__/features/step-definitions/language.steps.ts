import { OnlineSales } from '../../src/online-sales';
import { Before, Given, When, Then, But, And } from '../../../index';
import { stepArgType } from '../step-definitions/step-helpers';

let onlineSales: OnlineSales;
let salesPrice: number | undefined;

Before(() => {
  onlineSales = new OnlineSales();
});

Given(/^ik heb een t-shirt$/, (item: stepArgType) => {
  onlineSales.hasItem('Rick Astley t-shirt');
});

When(/^ik een t-shirt wil verkopen$/, (item: stepArgType) => {
  salesPrice = onlineSales.sellItem('Rick Astley t-shirt');
});

Then(/^ontvang ik €22$/, (item: stepArgType) => {
  expect(salesPrice).toEqual(22);
});

And(/^ben ik blij$/, (item: stepArgType) => {
  expect('ik').not.toEqual('boos');
});

But(/^heb ik geen t-shirts over$/, (item: stepArgType) => {
  expect(onlineSales.listedItems).not.toContain('Rick Astley t-shirt');
});

Given(/^ik heb een: (.*)$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  onlineSales.hasItem(item);
});

When(/^ik (.*) verkoop$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parametertype');
  salesPrice = onlineSales.sellItem(item);
});

Then(
  /^zou ik er €(\d+) voor moeten krijgen$/,
  (expectedSalesPrice: stepArgType) => {
    if (typeof expectedSalesPrice !== 'string')
      throw new Error('Invalid step parametertype');
    expect(salesPrice).toBe(Number(expectedSalesPrice));
  }
);

Given(/^'(.*)' is te koop$/, (object: stepArgType) => {
  if (typeof object !== 'string') throw new Error('Invalid step parametertype');
  onlineSales.hasItem(object);
});

When(/^ik '(.*)' koop$/, (object: stepArgType) => {
  if (typeof object !== 'string') throw new Error('Invalid step parametertype');
  salesPrice = onlineSales.sellItem(object);
});

Then(/^heb ik €(\d+) uitgegeven$/, (amount: stepArgType) => {
  expect(salesPrice).toEqual(100);
});

Given('mijn voorraad bevat:', (table: stepArgType) => {
  if (typeof table === 'string') throw new Error('Invalid step parametertype');
  table.forEach((row) => {
    onlineSales.hasItem(row.Object);
  });
});

When('ik de volgende producten toevoeg:', (table: stepArgType) => {
  if (typeof table === 'string') throw new Error('Invalid step parametertype');
  onlineSales.hasItem(table[0].Object);
});

Then(
  /^zitten er (\d) objecten in mijn voorraad, bestaant uit:$/,
  (nbre: stepArgType, table: stepArgType) => {
    if (typeof nbre !== 'string') throw new Error('Invalid step parametertype');
    if (typeof table === 'string')
      throw new Error('Invalid step parametertype');
    expect(onlineSales.allItems.length).toBe(Number(nbre));
    expect(onlineSales.allItems.length).toBe(table.length);

    table.forEach((_row, index) => {
      expect(onlineSales.allItems).toContain(table[index].Object);
    });
  }
);
