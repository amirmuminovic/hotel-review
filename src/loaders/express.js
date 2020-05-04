import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

// import logger from '../logger';
import { authRoutes, hotelRoutes, favoritesRoutes, reviewRoutes } from '../routes';


const appInitializer = async ({ app }) => {
  app.use(cors());
  app.use(json());
  app.use(helmet());
  app.use(urlencoded({ extended: false }));

  // app.use('*', (req, res, next) => {
  //   req.startTime = new Date();
  //   next();
  // });

  app.use(authRoutes);
  app.use(hotelRoutes);
  app.use(favoritesRoutes);
  app.use(reviewRoutes);

  // app.use('*', (req) => {
  //   const duration = new Date() - req.startTime;
  //   logger.info(JSON.stringify({
  //     duration,
  //     method: req.method,
  //     url: req.url,
  //     userAgent: req.headers['user-agent'],
  //     status: req.status,
  //     remoteAddress: req.headers['X-Forwarded-For'],
  //   }));
  // });

  return app;
};

export default appInitializer;
