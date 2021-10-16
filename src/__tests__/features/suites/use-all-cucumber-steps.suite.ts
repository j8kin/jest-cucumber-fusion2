import { Fusion } from '../../../index';
import '../step-definitions/import-all-steps';

const pathToFeatures = '../';
const featureFiles = ['all-cucumber-steps.feature'];

featureFiles.flatMap((featureFile) =>
  Fusion(`${pathToFeatures}${featureFile}`)
);
