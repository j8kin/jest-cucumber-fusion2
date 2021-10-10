# Jest Cucumber Fusion 2

Write 'pure' cucumber test in Jest without syntax clutter 


## Overview
Build on top of [Jest-cucumber](https://github.com/bencompton/jest-cucumber), Jest-Cucumber-Fusion2 handle the writing of the corresponding Jest test steps using an uncluttered cucumber style.
Instead of using `describe` and `it` blocks, you instead write a Jest test for each scenario, and then define `Given`, `When`, and `Then` step definitions inside of your Jest tests. 
Jest-Cucumber-Fusion2 then allows you to link these Cucumber tests to your javascript Cucumber feature steps.
Adding a `Fusion`call, the links between your Feature definition and your Steps definition is handled automatically and the necessary scaffolding for jest-cucumber is build behind the scene.
Now use jest naturally in your project like you would use the native Cucumber library.

This project is forked from [Jest-cucumber-fusion](https://github.com/b-yond-infinite-network/jest-cucumber-fusion). It fix some Major bug [Issue#27](https://github.com/b-yond-infinite-network/jest-cucumber-fusion/issues/27) and converted to use Typescript instead of JavaScript
The only one difference that jest-cucumber-fusion2 is not supported nested step definitions in steps 
file (see. src\__tests__\features\step-definitions\reuse-steps-example.steps.ts)

## Motivation

Jest-cucumber is an amazing project but forces you to write a lot of repetitive scaffolding code to setup the link betwen Jest and Cucumber.
With Jest-Cucumber-Fusion2, it really takes only the minimal code possible:
 - a Cucumber Feature file with gherkin sentences
 - a Cucumber Step definition file with your javascript validation code, ended with the `Fusion` function to link the two  

Jest-cucumber-fusion is awesom project but it seems it lost it support and major bug are not fixed.
Also jest-cucumber-fusion is used pure JavaScript and jest-cucumber-fusion2 use Typescript instead.

## Getting Started

### Install Jest Cucumber Fusion:

```
npm install jest-cucumber-fusion2 --save-dev
```

### Add a Feature file:

```gherkin
###filename: rocket-launching.feature
Feature: Rocket Launching

Scenario: Launching a SpaceX rocket
  Given I am Elon Musk attempting to launch a rocket into space
  When I launch the rocket
  Then the rocket should end up in space
  And the booster(s) should land back on the launch pad
  And nobody should doubt me ever again
```

### Test infastructure
It is possible to use "old" jest-cucumber-fusion infrastructure but it is more convinent to use a new one:
```
project/**/
│   
│   
│
└─── __tests__          <- test folder somewere in your project
│   └─── feature
│   |    │   test-feature.feature <- feature files could be placed directly in feature folder
│   |    └─── some-folder
|   |          └─── another-test.feature <- or feature files could be placed in subfolders
|   └─── steps
|   |     |   test-steps-file.steps.ts (or js) <- step definition file(s) 
|   |     |   ...
|   |
|   └─── suites <- main entry poit tests these files contain Fusion-calls
|         |   test-suite1.suite.ts (or js) <- these files contain list of features to be executed
|         |   ...
```

### Add the following to your package.json configuration:
The best solution is to create separate jest.config.json then to add this into package.json
Example of package.json:
```javascript
"jest": { testMatch: ['**/__tests__/**/*.suite.[jt]s?(x)'], } 
// if you prefer to use old infrastructure use:
// "jest": { testMatch: ['**/__tests__/**/*.steps.[jt]s?(x)'], } 
```
Example of jest.config.json:
```javascript
module.exports = {
  testMatch: ['**/__tests__/**/*.(suite|test).[jt]s?(x)'],
};
```

### Add a your Cucumber Step definition file in steps folder
```javascript
// filename: rocket-launching.steps.ts
import { Given, When, Then, And, But } from 'jest-cucumber-fusion2'
// or in javascript
// filename: rocket-launching.steps.js
const { Given, When, Then, And, But } = require( 'jest-cucumber-fusion' )
```

### Load any dependency you need to do your test
Typescript:
```typescript
// filename: rocket-launching.steps.ts
import { Given, When, Then, And, But } from 'jest-cucumber-fusion2'
import {Rocket} from '../../src/rocket'

```
Or JavaScript:
```javascript
//filename: rocket-launching.steps.js
const { Given, When, Then, And, But, Fusion } = require( 'jest-cucumber-fusion' )

const { Rocket } = require( '../../src/rocket' )
let rocket
```

### Add steps definitions:
Typescript:
```typescript
import { Given, When, Then, And, But } from 'jest-cucumber-fusion2'
import {Rocket} from '../../src/rocket'

let rocket

Given( 'I am Elon Musk attempting to launch a rocket into space', () => {
    rocket = new Rocket()
});
```
Or in JavaScript:
```javascript
//filename: rocket-launching.steps.js
const { Given, When, Then, And, But, Fusion } = require( 'jest-cucumber-fusion' )

const { Rocket } = require( '../../src/rocket' )
let rocket

Given( 'I am Elon Musk attempting to launch a rocket into space', () => {
    rocket = new Rocket()
} )

When( 'I launch the rocket', () => {
    rocket.launch()
} )

Then( 'the rocket should end up in space', () => {
    expect(rocket.isInSpace).toBe(true)
} )

And( /^the booster\(s\) should land back on the launch pad$/, () => {
    expect(rocket.boostersLanded).toBe(true)
} )

But( 'nobody should doubt me ever again', () => {
    expect('people').not.toBe('haters')
} )
```

### Adding the Fusion() call at the end of the Step definition file
It is recomended to use suite files for it
```typescript
import { Fusion } from 'jest-cucumber-fusion2';
import '../steps/rocket-launching.steps.ts';

const pathToFeatures = '../';
const featureFiles = ['rocket.feature', 'falcon-rocket.feature','falcon-havy-rocket,feature'];

featureFiles.flatMap((featureFile) =>
  Fusion(`${pathToFeatures}${featureFile}`) // here is the call of Fusion-glue
);
```

You have to match it with your Cucumber Feature definition file:
```javascript
//filename: rocket-launching.steps.js
const { Given, When, Then, And, But, Fusion } = require( 'jest-cucumber-fusion' )

const { Rocket } = require( '../../src/rocket' )
let rocket

Given( 'I am Elon Musk attempting to launch a rocket into space', () => {
    rocket = new Rocket()
} )

When( 'I launch the rocket', () => {
    rocket.launch()
} )

Then( 'the rocket should end up in space', () => {
    expect(rocket.isInSpace).toBe(true)
} )

And( /^the booster\(s\) should land back on the launch pad$/, () => {
    expect(rocket.boostersLanded).toBe(true)
} )

But( 'nobody should doubt me ever again', () => {
    expect('people').not.toBe('haters')
} )


Fusion( 'rocket-launching.feature' )
```

## Adding coverage
Since we're using jest, it is very easy to generate the code coverage of your Cucumber test:
```javascript
"jest": {
    "testMatch": [
      "**/*.steps.js"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/test/"
    ],
    "coverageDirectory": "./coverage/",
    "collectCoverage": true
  }
```

 
## Additional Documentation 

  * [Gherkin tables](./docs/GherkinTables.md)
  * [Step definition arguments](./docs/StepDefinitionArguments.md)
  * [Scenario outlines](./docs/ScenarioOutlines.md)
  * [Re-using step definitions](./docs/ReusingStepDefinitions.md)  
  * [Configuration options](./docs/AdditionalConfiguration.md)
  * [Running the examples](./docs/RunningTheExamples.md)
  * [Language](./docs/Language.md)
