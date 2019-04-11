import _ from 'lodash';
import DefaultSettings from './default';
import LocalSettings from './local';
import DevelopmentSettings from './development';
import StagingSettings from './staging';
import ProductionSettings from './production';

export const getEnvironmentSettings = (environment) => {
  switch (environment) {
    case 'development':
      return DevelopmentSettings;
    case 'staging':
      return StagingSettings;
    case 'production':
      return ProductionSettings;
    default:
      return LocalSettings;
  }
};

export const getGlobalSettings = environment => Object.keys(environment || {}).reduce((currentSettings, key) => {
  _.set(currentSettings, key, environment[key]);

  return currentSettings;
}, {});

export const Environment = process.env.ENVIRONMENT;
export const EnvironmentSettings = getEnvironmentSettings(Environment);
export const GlobalSettings = getGlobalSettings(process.env);
export const ResultSettings = _.merge(
  {},
  DefaultSettings,
  EnvironmentSettings,
  GlobalSettings,
);

export default ResultSettings;
