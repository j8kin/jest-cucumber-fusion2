import { Given, Then, And, Fusion } from '../../../index';
import { Rocket } from '../../src/rocket';
import { stepArgType } from '../step-definitions/step-helpers';
import '../step-definitions/reuse-code.steps';

// this is not a good example of spep re-usage but it is leave as is
//   to display that it is possible as in jest-cucumber-fusion
// use example form reuse-steps-example.steps.ts

let rocket: Rocket;
export const getCurrentRocket = () => {
  return rocket;
};

Given(/^I am Elon Musk and I launched a rocket in space already$/, () => {
  rocket = new Rocket();
});

Then(
  /^the mission was said to be '(.*)'$/,
  (sayingForTheMission: stepArgType) => {
    expect(sayingForTheMission).toBeDefined();
  }
);
And(
  /^the mission was said to be '(.*)'$/,
  (sayingForTheMission: stepArgType) => {
    expect(sayingForTheMission).toBeDefined();
  }
);

Fusion('../reuse-definition.feature');
