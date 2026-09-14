import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registroSchema, loginSchema } from '../validations/auth.validation';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// registro y login son públicas: si pidieran token, no habría forma de conseguir el primero.
router.post('/registro', validate(registroSchema), authController.registrar);
router.post('/login', validate(loginSchema), authController.login);
router.get('/yo', authenticate, authController.yo);

export default router;
