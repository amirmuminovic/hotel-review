import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import logger from '../logger';
import {
  authRoutes, hotelRoutes, favoritesRoutes, reviewRoutes,
} from '../routes';
import { AuditService, ErrorService } from '../services';

const appInitializer = async ({ app }) => {
  app.use(cors());
  app.use(json());
  app.use(helmet());
  app.use(urlencoded({ extended: false }));

  app.use('*', (req, res, next) => {
    req.startTime = new Date();
    next();
  });

  app.use(authRoutes);
  app.use(hotelRoutes);
  app.use(favoritesRoutes);
  app.use(reviewRoutes);

  app.use('*', (req, res) => {
    const duration = new Date() - req.startTime;
    logger.info(JSON.stringify({
      duration,
      method: req.method,
      url: req.originalUrl,
      userAgent: req.headers['user-agent'],
      status: res.statusCode,
      remoteAddress: req.headers['X-Forwarded-For'],
    }));
    (new AuditService()).recordAudit({
      user: req.user,
      timestamp: new Date(),
      route: `${req.method} ${req.originalUrl}`,
      jwt: req.headers.authorization,
      userAgent: req.headers['user-agent'],
      status: res.statusCode || 200,
      remoteAddress: req.headers['X-Forwarded-For'],
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, _) => {
    res.send(err.message);

    (new ErrorService()).recordError({
      message: err.message,
      stackTrace: err.stack,
      name: err.name,
      endpoint: `${req.method} ${req.originalUrl}`,
    });
  });

  return app;
};

export default appInitializer;
