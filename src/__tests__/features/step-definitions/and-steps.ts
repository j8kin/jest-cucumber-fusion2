import { And } from '../../../index';
import { stepArgType, onlineSales } from './step-helpers';

And(/'(.*)' is one of my item\(s\) for sale$/, (item: stepArgType) => {
  if (typeof item !== 'string') throw new Error('Invalid step parameter type');
  expect(onlineSales.hasItem(item)).toBeTruthy();
});
