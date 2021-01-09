import { sign } from 'jsonwebtoken';
import { UserDataAccess } from '../data';
import { UserService } from '../services';
import logger from '../logger';
import config from '../config';
import UserSchema from '../validations/UserSchema';

const registerController = async (req, res, next) => {
  const userData = req.body;
  try {
    await UserSchema.validateAsync(req.body);
    logger.info('Creating new user...');
    const userDataAccess = new UserDataAccess({ data: userData });
    const user = await userDataAccess.createUser();
    logger.info(`Successfully created user ${user.id}.`);

    logger.info('Sending registration link...');
    const userService = new UserService(user, { mailTransport: true });
    await userService.registerUser();
    logger.info('Registration link successfully sent!');

    res.status(201).send({
      message: 'User successfuly created',
    });
  } catch (error) {
    next(error);
  }
};

const registrationConfirmationController = async (req, res, next) => {
  const { confirmationCode } = req.params;
  const searchQuery = {
    confirmationCode,
    confirmationCodeExpiration: { $gt: Date.now() },
  };

  try {
    const userDataAccess = new UserDataAccess({ searchQuery });
    const user = await userDataAccess.fetchUser();
    if (user) {
      const userService = new UserService(user, { mailTransport: true });
      await userService.confirmRegistration();
      res.status(200).send({
        message: 'Registration confirmed.',
      });
    } else {
      res.status(404).send({
        error: 'User with that condition couldnt be found',
        message: 'No user found with that confrimation code / confrimation code expired.',
        path: req.path,
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const searchQuery = { email, valid: true };

  try {
    await UserSchema.validateAsync(req.body);
    const userDataAccess = new UserDataAccess({ searchQuery });
    const user = await userDataAccess.fetchUser();

    if (user) {
      const userService = new UserService(user);
      const validPassword = await userService.comparePasswords(password);
      if (validPassword) {
        const { _id: id, type, name } = user;
        const token = sign(
          {
            id,
            type,
            name,
          },
          config.jwtSecret,
          { expiresIn: '1h' },
        );

        user.tokens = user.tokens.concat({ token });
        await user.save();

        res.send(token);
      } else {
        logger.error('Invalid login credentials');
        res.status(401).send({
          message: 'Invalid login credentials',
        });
      }
    } else {
      logger.error('Invalid login credentials');
      res.status(404).send({
        message: 'Invalid login credentials',
      });
    }
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const { user } = req;
    if (!user) {
      res.sendStatus(401);
    } else {
      user.tokens = user.tokens.filter((existingToken) => existingToken.token !== token);
      await user.save();

      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  loginController,
  logoutController,
  registerController,
  registrationConfirmationController,
};
