import { exit } from 'process';

import logger from '@services/logger';
import { env } from '@utils/env';

import main from './index';

main()
  .then(() => {
    logger.info(`Server started on http://127.0.0.1:${env.port}`);
  })
  .catch(e => {
    logger.error(e);
    exit(1);
  });
