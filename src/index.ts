import express from 'express';
import 'reflect-metadata';
export const app = express();

import cors from 'cors';
import formData from 'express-form-data';

import { Container } from 'inversify';
import IBaseLogger from 'services/base-logger';
import { DIServiceType } from 'types';
import { getEnv, IEnv, isProdEnv } from 'utils/env';
import container from './inversify.config';

export default async () =>
  new Promise<[Container, IEnv]>(resolve => {
    const env = getEnv();

    if (env.useCors) {
      app.use(cors());
    }

    app.use(express.json({ limit: env.responseJsonSizeLimit }));
    app.use(formData.parse());
    app.use(express.urlencoded({ extended: true }));

    // TODO:
    // setup express middleware logging and error handling
    app.use(function(
      err: Error,
      _req: express.Request,
      _res: express.Response,
      next: express.NextFunction
    ) {
      const logger = container.get<IBaseLogger>(
        DIServiceType.DEFAULT_LOGGER_SERVICE
      );
      logger.info(err.stack ? err.stack : '');
      next(err);
    });

    app.use(function(
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) {
      res
        .status(500)
        .send(`Internal Server Error${isProdEnv() ? '' : `\n${err.stack}`}`);
    });

    app.listen(env.port, function() {
      resolve([container, env]);
    });
  });
