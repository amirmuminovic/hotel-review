import mongooseLoader from './mongoose';
import expressLoader from './express';
import {
  seedUsers,
  seedHotels,
  seedReviews,
} from '../seed';
import logger from '../logger';

const loader = async ({ expressApp }) => {
  logger.info('Initiating connection with DB');
  const mongoConnection = await mongooseLoader();
  logger.info('DB connection established');
  await seedUsers();
  await seedHotels();
  await seedReviews();
  logger.info('Initiating express app');
  const app = await expressLoader({ app: expressApp });
  logger.info('Express app established!');

  return {
    app,
    mongoConnection,
  };
};

export default loader;
