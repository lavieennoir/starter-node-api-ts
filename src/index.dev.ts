import { exit } from 'process';
import IBaseLogger from 'services/base-logger';
import { DIServiceType } from 'types';

import main from './index';

main()
  .then(([container, env]) => {
    const logger = container.get<IBaseLogger>(
      DIServiceType.DEFAULT_LOGGER_SERVICE
    );

    logger.info(`Server started on http://127.0.0.1:${env.port}`);
  })
  .catch(() => {
    exit(1);
  });
