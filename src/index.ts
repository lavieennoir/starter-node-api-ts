import { setBaseDir } from '@utils/path';
import express from 'express';

setBaseDir(__dirname);
export const app = express();

import {
  registerContentTypes,
  registerRequestLogger,
  registerRoutes,
  registerSecurityRestrictions,
  registerServerErrorHandler,
  registerServerListener,
  registerStaticFiles
} from './server-handlers';
import ServerSetup from './server-setup';

// TODO: use airbnb ts lint
// TODO: update prettier to fix tslint errors
// TODO: handle USE_HTTPS env variable

const createServer = () =>
  new ServerSetup(app)
    .addHandler(registerSecurityRestrictions)
    .addHandler(registerRequestLogger)
    .addHandler(registerContentTypes)
    .addHandler(registerStaticFiles)
    .addHandler(registerRoutes)
    .addHandler(registerServerErrorHandler)
    .addHandler(registerServerListener)
    .apply();

export default createServer;
