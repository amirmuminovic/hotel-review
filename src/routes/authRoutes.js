import { Router } from 'express';

import { authenticationControllers } from '../controllers';
import { isAuthenticated } from '../middleware';

const {
  loginController,
  logoutController,
  registerController,
  registrationConfirmationController,
} = authenticationControllers;

const router = Router();

router.post('/register', registerController);

router.get('/register/:confirmationCode', registrationConfirmationController);

router.post('/login', loginController);

router.delete('/logout', isAuthenticated, logoutController);

export default router;
