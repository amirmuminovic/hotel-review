import express from 'express';
import loaders from './loaders';
import config from './config';
import logger from './logger';

const startServer = async () => {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port, () => {
    logger.info(`Hotel Review is live on port ${config.port}!`);
  });
};

startServer();
