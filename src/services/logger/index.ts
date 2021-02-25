import path from 'path';

import { isProdEnv } from '@utils/env';
import { getBaseDir } from '@utils/path';

import IBaseLogger from './base-logger';
import ConsoleLogger from './console-logger';
import FileLogger from './file-logger';

const logger: IBaseLogger = isProdEnv()
  ? new FileLogger({
      path: path.join(getBaseDir(), '../logs/custom')
    })
  : new ConsoleLogger();

export default logger;
