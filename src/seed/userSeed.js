import { hash } from 'bcryptjs';

import { UserModel } from '../models';
import logger from '../logger';
import { userTypes } from '../utils';

const sampleUsers = [
  {
    name: 'amir1',
    email: 'amir.muminovic192@gmail.com',
    type: userTypes.admin,
    password: 'test123',
    valid: true,
  },
  {
    name: 'amir2',
    email: 'amir.muminovic192+1@gmail.com',
    type: userTypes.regular,
    password: 'test321',
    valid: true,
  },
];

const seedReviews = async () => {
  try {
    const elementsExist = await UserModel.findOne({});
    if (!elementsExist) {
      logger.info('Cleaning old records...');
      await UserModel.deleteMany({});
      sampleUsers[0].password = await hash(sampleUsers[0].password, 12);
      sampleUsers[1].password = await hash(sampleUsers[1].password, 12);
      logger.info('Old records cleaned...');
      logger.info('User seed initiated...');
      await UserModel.insertMany(sampleUsers);
      logger.info('User seed successfully completed!');
    }
  } catch (error) {
    logger.error(`Error occured while seeding Users: ${JSON.stringify(error)}`);
  }
};

export default seedReviews;
