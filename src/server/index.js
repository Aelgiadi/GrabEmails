// @flow

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */

import app from './app';

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log('Example app listening on port %s!', PORT);
});

module.exports = server;
