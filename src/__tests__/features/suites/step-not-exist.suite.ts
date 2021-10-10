import { Fusion } from '../../../index';

const pathToFeatures = '../';
const featureFiles = ['step-not-exist.feature'];

featureFiles.flatMap((featureFile) =>
  Fusion(`${pathToFeatures}${featureFile}`, { errors: false })
);
