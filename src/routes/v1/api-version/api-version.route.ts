import { Router } from 'express';

import apiVersion from 'controllers/api-version';

const router = Router();

router.get('/', apiVersion.index);

export default router;
