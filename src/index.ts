import express, { Express, Request, Response } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import path from 'path';

import routesV1 from 'routes/v1';
import FileLogger from 'services/logger/file-logger';
import { env, isDevEnv, isProdEnv } from 'utils/env';
import { getBaseDir, setBaseDir } from 'utils/path';

setBaseDir(__dirname);
export const expressApp = express();

// TODO: move registrations to separate file
const registerSecurityRestrictions = (app: Express) => {
  if (env.useCors) {
    app.use(cors());
  }
  if (isProdEnv()) {
    app.use(helmet());
  }
};

const registerRequestLogger = (app: Express) => {
  if (isDevEnv()) {
    app.use(
      morgan('dev', {
        skip: (_: Request, res: Response) =>
          res.statusCode < StatusCodes.BAD_REQUEST
      })
    );
  }

  if (env.enableRequestLogging) {
    const logger = new FileLogger({
      path: path.join(getBaseDir(), '../logs/requests')
    });

    app.use(
      morgan('common', {
        stream: logger.getStream()
      })
    );
  }
};

const registerContentTypes = (app: Express) => {
  app.use(express.json({ limit: env.responseJsonSizeLimit }));
  app.use(express.urlencoded({ extended: true }));
};

const registerRoutes = (app: Express) => {
  // Redirect index route to /v1
  app.get('/', (_req: express.Request, res: express.Response) => {
    res.redirect(StatusCodes.PERMANENT_REDIRECT, '/v1');
  });

  // Register routes
  app.use('/v1', routesV1);
};

const registerServerErrorHandler = (app: Express) => {
  app.use(function(
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) {
    const responseMessage = `${ReasonPhrases.INTERNAL_SERVER_ERROR}${
      isProdEnv() ? '' : `\n${err.stack}`
    }`;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseMessage);
  });
};

const registerServerListener = async (app: Express) =>
  new Promise<void>(resolve => {
    app.listen(env.port, resolve);
  });

const createServer = async () => {
  const registrationHandlers: Array<
    ((app: Express) => Promise<void>) | ((app: Express) => void)
  > = [
    registerSecurityRestrictions,
    registerRequestLogger,
    registerContentTypes,
    registerRoutes,
    registerServerErrorHandler,
    registerServerListener
  ];

  for (const handler of registrationHandlers) {
    await handler(expressApp);
  }
};

export default createServer;
