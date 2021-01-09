import { verify } from 'jsonwebtoken';

import config from '../config';
import logger from '../logger';
import { UserDataAccess } from '../data';
import { userTypes } from '../utils';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id, type } = await verify(token, config.jwtSecret);
    const searchQuery = { _id: id, 'tokens.token': token, type };
    const userDataAccess = new UserDataAccess({ searchQuery });
    const user = await userDataAccess.fetchUser();
    if (user) {
      req.user = user;
      next();
    } else {
      logger.warn('Unauthorized access attempt.');
      throw new Error(JSON.stringify({
        status: 401,
        name: 'Unauthorized access attempt.',
        errmsg: 'You are not authorized to perform this action.',
      }));
    }
  } catch (error) {
    logger.error(error);
    res.status = 401;
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.type !== userTypes.admin) {
    res.sendStatus(401);
  } else {
    next();
  }
};

export {
  isAdmin,
  isAuthenticated,
};
