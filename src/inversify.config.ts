import { Container } from 'inversify';

import { DIControllerType, DIServiceType } from './types';
import { isProdEnv } from './utils/env';

import IBaseLogger from 'services/base-logger';
import ConsoleLogger from 'services/console-logger';
import FileLogger from 'services/file-logger';
import SampleService, { ISampleService } from './services/sample-service';

import ApiVersionController from 'controllers/api-version';
import AuthController from 'controllers/auth';
import IBaseController from 'controllers/base-controller';

const defaultLoggerClass = isProdEnv() ? FileLogger : ConsoleLogger;

const container = new Container();

// Bind Controllers
container
  .bind<IBaseController>(DIControllerType.CONTROLLER)
  .to(ApiVersionController);
container.bind<IBaseController>(DIControllerType.CONTROLLER).to(AuthController);

// Bind Services
container.bind<ISampleService>(DIServiceType.SAMPLE_SERVICE).to(SampleService);
container
  .bind<IBaseLogger>(DIServiceType.DEFAULT_LOGGER_SERVICE)
  .to(defaultLoggerClass);
container
  .bind<IBaseLogger>(DIServiceType.CONSOLE_LOGGER_SERVICE)
  .to(ConsoleLogger);
container.bind<IBaseLogger>(DIServiceType.FILE_LOGGER_SERVICE).to(FileLogger);

export default container;
