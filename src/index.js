import express from 'express';
import https from 'https';
import fs from 'fs';

import loaders from './loaders';
import config from './config';
import logger from './logger';

const privateKey = fs.readFileSync('./ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

const startServer = async () => {
  const app = express();

  await loaders({ expressApp: app });

  https.createServer(credentials, app)
    .listen(3000, () => {
      logger.info(`Hotel Review is live on port ${config.port}!`);
    });
};

startServer();
