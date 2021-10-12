import { When, Then, And } from '../../../index';
import { getCurrentRocket } from '../suites/reuse-definition.suite';

And('I drop my mic', () => {
  const micDropped = true;
});

When('I relaunch the rocket', () => {
  const rocketUsed = getCurrentRocket();
  rocketUsed.launch();
});

Then('the rocket end up in space again', () => {
  const rocketUsed = getCurrentRocket();
  expect(rocketUsed.isInSpace).toBe(true);
});
