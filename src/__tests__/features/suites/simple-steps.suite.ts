import { Fusion } from '../../../index';
import '../step-definitions/import-all-steps';

const pathToFeatures = '../';
const featureFiles = [
  'simple-test.feature',
  'steps-with-tables.feature',
  'empty.feature'
];

featureFiles.flatMap((featureFile) =>
  Fusion(`${pathToFeatures}${featureFile}`)
);
