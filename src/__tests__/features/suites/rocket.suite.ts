import { Given, When, Then, And, But, Fusion } from '../../../index';
import { Rocket } from '../../src/rocket';
import { stepArgType } from '../step-definitions/step-helpers';

let rocket: Rocket;

Given('I am Elon Musk attempting to launch a rocket into space', () => {
  rocket = new Rocket();
});

When('I launch the rocket', () => {
  rocket.launch();
});

When("I launch the '<rocket>'", () => {
  rocket.launch();
});

When(/^I launch my personal rocket named '(.*)'$/, (nameRocket) => {
  expect(nameRocket).toBeDefined();
  rocket.launch();
});

Then('the rocket should end up in space', () => {
  expect(rocket.isInSpace).toBe(true);
});

// Complex Regex :  at position (\[(?: *\d+(?: |, |,)*)+\]) with no value
And(
  /^my position in 2D space is (\[(?: *\d+(?: |, |,)*)+\])$/,
  (arrayPosition: stepArgType) => {
    if (typeof arrayPosition !== 'string')
      throw new Error('Invalid step parameter type');

    const isAnArray = JSON.parse(arrayPosition);
    expect(isAnArray).toBeInstanceOf(Array);
  }
);

And(/^the booster\(s\) should land back on the launch pad$/, () => {
  expect(rocket.boostersLanded).toBe(true);
});

But('nobody should doubt me ever again', () => {
  expect('people').not.toBe('haters');
});

Fusion('../rocket.feature');
