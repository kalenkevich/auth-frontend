import React from 'react';
import settings from '../../config/settings';

const SettingsContext = React.createContext(settings);

export const SettingsProvider = SettingsContext.Provider;

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
