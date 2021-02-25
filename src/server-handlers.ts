import express, { Express, Request, Response } from 'express';

import cors from 'cors';
import fs from 'fs';
import helmet from 'helmet';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';

import routesV1 from '@routes/v1';
import logger from '@services/logger';
import FileLogger from '@services/logger/file-logger';
import { env, isDevEnv, isProdEnv } from '@utils/env';
import { getBaseDir } from '@utils/path';

export const registerSecurityRestrictions = (app: Express) => {
  if (env.useCors) {
    app.use(cors());
  }
  if (isProdEnv()) {
    app.use(helmet());
  }
};

export const registerRequestLogger = (app: Express) => {
  if (isDevEnv()) {
    app.use(
      morgan('dev', {
        skip: (_: Request, res: Response) =>
          res.statusCode < StatusCodes.BAD_REQUEST
      })
    );
  }

  if (env.enableRequestLogging) {
    const requestLogger = new FileLogger({
      path: path.join(getBaseDir(), '../logs/requests')
    });

    app.use(
      morgan('common', {
        stream: requestLogger.getStream()
      })
    );
  }
};

export const registerContentTypes = (app: Express) => {
  app.use(express.json({ limit: env.responseJsonSizeLimit }));
  app.use(express.urlencoded({ extended: true }));
};

export const registerStaticFiles = (app: Express) => {
  // Serve favicon
  const faviconPath = path.join(getBaseDir(), '../public/favicon.ico');
  if (fs.existsSync(faviconPath)) {
    app.use(favicon(faviconPath));
  } else {
    logger.warn(
      'Webserver favicon is not set! This will result in 404 error logs when using request logger.'
    );
  }
};

export const registerRoutes = (app: Express) => {
  // Redirect index route to /v1
  app.get('/', (_req: express.Request, res: express.Response) => {
    res.redirect(StatusCodes.PERMANENT_REDIRECT, '/v1');
  });

  // Register routes
  app.use('/v1', routesV1);
};

export const registerServerErrorHandler = (app: Express) => {
  app.use(function(
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const responseMessage = `${ReasonPhrases.INTERNAL_SERVER_ERROR}${
      isProdEnv() ? '' : `\n${err.stack}`
    }`;

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseMessage);

    next();
  });
};

export const registerServerListener = async (app: Express) =>
  new Promise<void>(resolve => {
    app.listen(env.port, resolve);
  });
