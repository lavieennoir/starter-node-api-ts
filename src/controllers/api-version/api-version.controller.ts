import { Request, Response } from 'express';

import { env } from 'utils/env';

const index = (_req: Request, res: Response) =>
  res.json({
    version: '1.0',
    name: env.appName
  });

export default {
  index
};
