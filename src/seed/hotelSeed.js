import { Types } from 'mongoose';

import { HotelModel } from '../models';
import logger from '../logger';

const sampleHotels = [
  {
    _id: new Types.ObjectId('5e95d37ced6f16010b616dee'),
    name: 'Hilton Malta',
    address: 'Portomaso, STJ 4012 St. Julianʼs, Malta',
    description: 'Set on the seafront in Saint Julian\'s, the Hilton Malta is a luxury 5-star hotel offering panoramic views of the Mediterranean Sea and a modern décor.',
    lat: 35.922457,
    long: 14.493488,
  },
  {
    _id: new Types.ObjectId('5e95d37ced6f16010b616def'),
    name: 'Bilton Malta',
    address: 'Portomaso, STJ 4012 St. Julianʼs, Malta',
    description: 'Set on the seafront in Saint Julian\'s, the Hilton Malta is a luxury 5-star hotel offering panoramic views of the Mediterranean Sea and a modern décor.',
    lat: 35.922457,
    long: 14.493488,
  },
];

const seedReviews = async () => {
  try {
    const elementsExist = await HotelModel.findOne({});
    if (!elementsExist) {
      logger.info('Cleaning old records...');
      await HotelModel.deleteMany({});
      logger.info('Old records cleaned...');
      logger.info('Hotel seed initiated...');
      await HotelModel.insertMany(sampleHotels);
      logger.info('Hotel seed successfully completed!');
    }
  } catch (error) {
    logger.error(`Error occured while seeding Hotel: ${JSON.stringify(error)}`);
  }
};

export default seedReviews;
