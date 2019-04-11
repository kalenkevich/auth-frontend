import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ThemeProvider } from 'react-jss';
import Routes from './routes';
import Application from './application/ApplicationComponent';
import theme from './theme';

loadableReady(() => ReactDOM.hydrate(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Application>
        <Routes/>
      </Application>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
));
