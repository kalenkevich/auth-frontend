import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import { Theme } from '@zenvo/core-ui';
import Routes from './routes';
import Application from './application/ApplicationComponent';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <Application>
        <Routes/>
      </Application>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
