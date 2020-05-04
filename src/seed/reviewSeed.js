import { Types } from 'mongoose';

import { ReviewModel } from '../models';
import logger from '../logger';

const sampleReviews = [
  {
    author: 'amir1',
    rating: 5,
    description: 'Best hotel you\'ll find on Malta',
    hotelID: new Types.ObjectId('5e95d37ced6f16010b616dee'),
  },
];

const seedReviews = async () => {
  try {
    const elementsExist = await ReviewModel.findOne({});
    if (!elementsExist) {
      logger.info('Cleaning old records...');
      await ReviewModel.deleteMany({});
      logger.info('Old records cleaned...');
      logger.info('Review seed initiated...');
      await ReviewModel.insertMany(sampleReviews);
      logger.info('Review seed successfully completed!');
    }
  } catch (error) {
    logger.error(`Error occured while seeding Reviews: ${JSON.stringify(error)}`);
  }
};

export default seedReviews;
