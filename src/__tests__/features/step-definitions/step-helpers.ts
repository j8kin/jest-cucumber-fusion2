import { OnlineSales } from '../../src/online-sales';
export type stepArgType = string | Record<string, string>[];

// Software Under Test
export const onlineSales: OnlineSales = new OnlineSales();
