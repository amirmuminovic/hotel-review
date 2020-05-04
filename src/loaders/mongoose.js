import { connect } from 'mongoose';
import config from '../config';

const mongoConnection = async () => {
  const connection = await connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};

export default mongoConnection;
