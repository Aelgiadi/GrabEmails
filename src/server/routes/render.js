// @flow

import express from 'express';
import React from 'react';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../shared/app';

const router = express.Router();

router.route('').get((req, res) => {
  const context = {};
  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Budget</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
});

module.exports = router;
