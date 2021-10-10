const { Given, Then, And, Fusion } = require('../../../index');

const { Rocket } = require('../../src/rocket');

let rocket;
function getCurrentRocket() {
  return rocket;
}

Given(/^I am Elon Musk and I launched a rocket in space already$/, () => {
  rocket = new Rocket();
});

require('../step-definitions/reuse-code.steps')(getCurrentRocket);

const stepBody = [
  /^the mission was said to be '(.*)'$/,
  (sayingForTheMission) => {
    expect(sayingForTheMission).toBeDefined();
  }
];

Then(...stepBody);
And(...stepBody);

Fusion('../reuse-definition.feature');
