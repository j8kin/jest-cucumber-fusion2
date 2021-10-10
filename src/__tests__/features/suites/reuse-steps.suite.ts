import { Fusion } from '../../../index';
import '../step-definitions/import-all-steps';

const pathToFeatures = '../';
const featureFiles = ['reuse.feature'];

featureFiles.flatMap((featureFile) =>
  Fusion(`${pathToFeatures}${featureFile}`)
);
