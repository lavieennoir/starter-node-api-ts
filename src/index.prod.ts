import dotenv from 'dotenv';
import fs from 'fs';
import { exit } from 'process';

import logger from 'services/logger';

// Load prod env at the very begining
try {
  const prodEnv = dotenv.parse(fs.readFileSync('.env.prod'));
  Object.assign(process.env, prodEnv);
} catch (e) {
  console.error(e);
  console.error('Failed to load .env.prod file!');
}

import main from './index';

main().catch(e => {
  logger.error(e);
  exit(1);
});
