import { Router } from 'express';

import apiVersion from './api-version';
import auth from './auth';

const router = Router();

router.use('/', apiVersion);
router.use('/auth', auth);

export default router;
