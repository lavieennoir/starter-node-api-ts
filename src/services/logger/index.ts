import path from 'path';

import { isProdEnv } from '@utils/env';
import { getBaseDir } from '@utils/path';

import ConsoleLogger from './console-logger';
import FileLogger from './file-logger';

const logger = isProdEnv()
  ? new FileLogger({
      path: path.join(getBaseDir(), '../logs/custom')
    })
  : new ConsoleLogger();

export default logger;
