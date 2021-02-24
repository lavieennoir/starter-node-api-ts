import { Router } from 'express';

import auth from '@controllers/auth';

const router = Router();

router.get('/', auth.index);

export default router;
