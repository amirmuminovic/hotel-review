import config from './config';

const env = process.env.NODE_ENV || 'development';

export default {
  port: process.env.PORT || config[env].port,
  dbUrl: process.env.DB_URL || config[env].dbUrl,
  sendgridAPIKey: process.env.SENDGRID_API_KEY || config[env].sendgridAPIKey,
  jwtSecret: process.env.JWT_SECRET || config[env].jwtSecret,
};
