import chalk from 'chalk';
import { exit } from 'process';

import logger from '@services/logger';

import main from './index';
import { Network } from './utils';

main()
  .then(() => {
    const padSize = 16;

    logger.info(`Server started (${new Date().toUTCString()})\n`);
    logger.info(
      chalk.white(
        chalk.bold('Local:'.padEnd(padSize)),
        Network.getLocalIpAddress()
      )
    );
    logger.info(
      chalk.white(
        chalk.bold('On Your Network:'.padEnd(padSize)),
        Network.getLocalNetworkIpAddress(),
        '\n'
      )
    );
  })
  .catch(e => {
    logger.error(e);
    exit(1);
  });
