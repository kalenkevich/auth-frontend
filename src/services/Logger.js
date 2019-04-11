import { makeLogger } from '@zenvo/core-ui';
import Settings, { Environment } from '../../config/settings';

export default makeLogger(Environment, Settings);
