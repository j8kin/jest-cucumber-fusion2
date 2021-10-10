import { Fusion } from '../../../index';
import '../step-definitions/import-all-steps';

const pathToFeatures = '../';
const featureFiles = ['step-not-exist-2.feature'];

featureFiles.flatMap((featureFile) =>
  Fusion(`${pathToFeatures}${featureFile}`, { errors: false })
);
