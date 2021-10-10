import { Then, And, CallBack } from '../../../index';
import { stepArgType } from './step-helpers';

const stepBody: [string | RegExp, CallBack] = [
  /^Reuse Step Example test: '(.*)'/,
  (text: stepArgType) => {
    expect(text).toBeDefined();
  }
];

// this is the difference from jest-cucumber-fusion
// in jest-cucumber-fusion it is possible to write:
// Then( And (/^Step Definition with '(.*)'$/, (paramter) => {}));
// right now do not know how to implement it
Then(...stepBody);
And(...stepBody);
