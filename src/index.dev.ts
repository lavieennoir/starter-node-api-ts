import { getEnv } from 'utils/env';

console.log('Hello dev world!', { rawEnv: process.env, env: getEnv() });
