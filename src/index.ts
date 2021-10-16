import { defineFeature, loadFeature } from 'jest-cucumber';
import {
  DefineScenarioFunctionWithAliases,
  StepsDefinitionCallbackOptions
} from 'jest-cucumber/dist/src/feature-definition-creation';
import {
  Options,
  ParsedScenario,
  ParsedScenarioOutline,
  ParsedStep
} from 'jest-cucumber/dist/src/models';

export type CallBack = (
  ...args: Array<string | Array<Record<string, string>>>
) => void | Promise<void>;

type stepExec = [
  stepMatcher: string | RegExp,
  stepDefinitionCallback: (...args: any[]) => any
];

type StepsType = 'given' | 'when' | 'then' | 'and' | 'but';

let before: CallBack | undefined = undefined;
let after: CallBack | undefined = undefined;

const stepsDefinition: Map<StepsType, Map<string | RegExp, CallBack>> = new Map<
  StepsType,
  Map<string | RegExp, CallBack>
>();

/**
 * Main Fusion-Glue function to upload feature file into jest-cuccumber
 * @param featureFileToLoad Feature-file name
 * @param options Jest Cucumber options (Optional)
 */
export const Fusion = (featureFileToLoad: string, options?: Options) => {
  const fullpath = module.parent?.path;
  const feature = loadFeature(`${fullpath}\\${featureFileToLoad}`, options);

  defineFeature(feature, (testFn) => {
    if (feature.scenarios.length > 0) {
      matchJestTestSuiteWithCucumberFeature(
        feature.scenarios,
        beforeEach,
        afterEach,
        testFn
      );
    }
    if (feature.scenarioOutlines.length > 0) {
      matchJestTestSuiteWithCucumberFeature(
        feature.scenarioOutlines,
        beforeEach,
        afterEach,
        testFn
      );
    }
  });
};

const addToStepsDefinition = (
  stepType: StepsType,
  stepName: string | RegExp,
  fnToCall: CallBack
) => {
  if (!stepsDefinition.has(stepType)) {
    stepsDefinition.set(stepType, new Map<string | RegExp, CallBack>());
  }
  stepsDefinition.get(stepType)?.set(stepName, fnToCall);
};

export const Given = (stepName: string | RegExp, fnToCall: CallBack) => {
  addToStepsDefinition('given', stepName, fnToCall);
};

export const When = (stepName: string | RegExp, fnToCall: CallBack) => {
  addToStepsDefinition('when', stepName, fnToCall);
};

export const Then = (stepName: string | RegExp, fnToCall: CallBack) => {
  addToStepsDefinition('then', stepName, fnToCall);
};

export const And = (stepName: string | RegExp, fnToCall: CallBack) => {
  addToStepsDefinition('and', stepName, fnToCall);
};

export const But = (stepName: string | RegExp, fnToCall: CallBack) => {
  addToStepsDefinition('but', stepName, fnToCall);
};

export const Before = (fnToCall: CallBack) => (before = fnToCall);
export const After = (fnToCall: CallBack) => (after = fnToCall);

const matchJestTestSuiteWithCucumberFeature = (
  featureScenariosOrOutline: (ParsedScenario | ParsedScenarioOutline)[],
  beforeEachFn: jest.Lifecycle,
  afterEachFn: jest.Lifecycle,
  testFn: DefineScenarioFunctionWithAliases
) => {
  // register before once before all scenario
  //   otherwise it register as much as number scenarios exists
  // Number of calls verified in before-and-after.suites.ts
  if (before != null) beforeEachFn(before);

  featureScenariosOrOutline.forEach((currentScenarioOrOutline) => {
    matchJestTestWithCucumberScenario(
      currentScenarioOrOutline.title,

      // when scenario outline table contains examples then jest-cucumber.loadFeature
      //  calculates scenario parameters and place them into currentScenarioOrOutline.scenarios[0].steps
      // at the same time currentScenarioOrOutline.steps contains pure steps without
      //  example substutions for example if the scenario outline looks like:
      //   Scenario Outline: test scenario
      //     Given Step sentence
      //       | field     |
      //       | <example> |
      //   Examples:
      //     | example |
      //     | myValue |
      //  then currentScenarioOrOutline.steps will contain {field: '<example>'}
      //  and at the same time currentScenarioOrOutline.scenarios[0].steps will contain {field: 'myValue'}
      'scenarios' in currentScenarioOrOutline
        ? currentScenarioOrOutline.scenarios[0].steps
        : currentScenarioOrOutline.steps,
      testFn
    );
  });

  // register after once before all scenario (see more infore above)
  if (after != null) afterEachFn(after);
};

const matchJestTestWithCucumberScenario = (
  currentScenarioTitle: string,
  currentScenarioSteps: ParsedStep[],
  testFn: DefineScenarioFunctionWithAliases
) => {
  testFn(
    currentScenarioTitle,
    ({ given, when, then, and, but, pending, defineStep }) => {
      currentScenarioSteps.forEach((currentStep) => {
        matchJestDefinitionWithCucumberStep(
          { given, when, then, and, but, pending, defineStep },
          currentStep
        );
      });
    }
  );
};

const matchJestDefinitionWithCucumberStep = (
  verbFunction: StepsDefinitionCallbackOptions,
  currentStep: ParsedStep
) => {
  const foundMatchingStep = findMatchingStep(currentStep);
  if (!foundMatchingStep) return;

  switch (currentStep.keyword) {
    case 'given':
      verbFunction.given(foundMatchingStep[0], foundMatchingStep[1]);
      break;
    case 'when':
      verbFunction.when(foundMatchingStep[0], foundMatchingStep[1]);
      break;
    case 'then':
      verbFunction.then(foundMatchingStep[0], foundMatchingStep[1]);
      break;
    case 'and':
      verbFunction.then(foundMatchingStep[0], foundMatchingStep[1]);
      break;
    case 'but':
      verbFunction.then(foundMatchingStep[0], foundMatchingStep[1]);
      break;
    /* istanbul ignore next */
    default:
      // this code should never be reached and create for code-defence purpose
      break;
  }
};

const findMatchingStep = (currentStep: ParsedStep): stepExec | undefined => {
  const scenarioType = currentStep.keyword as StepsType;
  const scenarioSentence = currentStep.stepText;
  const stepCategory: Map<string | RegExp, CallBack> | undefined =
    stepsDefinition.get(scenarioType);

  if (stepCategory == null) return undefined;

  let foundStep: string | RegExp | undefined = undefined;
  for (let [stepName] of stepCategory) {
    if (typeof stepName === 'string') {
      if (stepName === scenarioSentence) {
        foundStep = stepName;
        break;
      }
    } else {
      // regepx
      if (scenarioSentence.match(stepName)) {
        foundStep = stepName;
        break;
      }
    }
  }

  if (foundStep === undefined) return undefined;

  const fnToCall = stepsDefinition.get(scenarioType)!.get(foundStep)!;
  return [
    scenarioSentence,
    typeof foundStep === 'string'
      ? fnToCall
      : injectArgs(scenarioSentence, foundStep, currentStep, fnToCall)
  ];
};

const injectArgs = (
  scenarioSentence: string,
  regExpStep: RegExp,
  currentFeatureStep: ParsedStep,
  fnToExecute: CallBack
): CallBack => {
  const imputArgs: Array<string | Array<Record<string, string>>> = [];

  const exprMatches = regExpStep.exec(scenarioSentence);

  /* istanbul ignore next */
  // this code should never be reached and create for code-defence purpose
  if (exprMatches == null) return fnToExecute;

  exprMatches!.forEach((match, groupIndex) => {
    if (groupIndex > 0) imputArgs.push(match);
  });

  const stepTableArgs = currentFeatureStep.stepArgument;
  if (stepTableArgs != null && typeof stepTableArgs !== 'string') {
    // add table as input arguments
    imputArgs.push(stepTableArgs as Record<string, string>[]);
  }
  if (imputArgs.length > 0) return () => fnToExecute(...imputArgs);

  /* istanbul ignore next */
  // this code should never be reached and create for code-defence purpose
  return fnToExecute;
};
