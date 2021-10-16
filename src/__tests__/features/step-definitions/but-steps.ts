import { But } from '../../../index';
import { stepArgType, onlineSales } from './step-helpers';

But(/'(.*)' is not one of my item\(s\) for sale$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  expect(onlineSales).toBeDefined();
  expect(onlineSales.hasItem(item)).toBeFalsy();
});
