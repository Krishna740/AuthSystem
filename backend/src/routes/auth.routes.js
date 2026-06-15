import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller.js';
import validate from '../middleware/validate.middleware.js';
import authenticate from '../middleware/auth.middleware.js';
import { signupSchema, loginSchema, refreshSchema, updateProfileSchema, changePasswordSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/signup', validate(signupSchema), ctrl.signup);
router.post('/login', validate(loginSchema), ctrl.login);
router.post('/refresh', validate(refreshSchema), ctrl.refresh);
router.post('/logout', authenticate, ctrl.logout);
router.get('/profile', authenticate, ctrl.getProfile);
router.patch('/profile', authenticate, validate(updateProfileSchema), ctrl.updateProfile);
router.put('/password', authenticate, validate(changePasswordSchema), ctrl.changePassword);

export default router;
