const path = require('path');
const _ = require('lodash');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();
const enforceSSL = _.get(process, 'env.enforceSSL', 'false');
const isSSLEnabled = enforceSSL.toLowerCase() === 'true';

app.use(sslRedirect([isSSLEnabled ? process.env.NODE_ENV : '[NO-ENVIRONMENT-DEFINED]']));
app.use('/public', express.static(`${__dirname}/public`));
app.use('/assets', express.static(`${__dirname}/src/assets`));
app.use('/', express.static(`${__dirname}/dist`));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

app.listen(process.env.PORT || 8080);
