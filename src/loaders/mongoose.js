import { connect } from 'mongoose';
import config from '../config';

const connectToMongoDB = async () => {
  const connection = await connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};

export default connectToMongoDB;
