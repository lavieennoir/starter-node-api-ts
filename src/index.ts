import dotenv from 'dotenv';
import fs from 'fs';

// Load prod env at the very begining
const prodEnv = dotenv.parse(fs.readFileSync('.env.prod'));
Object.assign(process.env, prodEnv);

import { sum } from './services/sample-service';
import { getEnv } from './utils/env';

sum(1, 2);

console.log('Hello world!', { rawEnv: process.env, env: getEnv() });
