const dotenv = require('dotenv');
const fs = require('fs');
require('reflect-metadata');

let env = {};
let testEnv = {};
try {
  env = dotenv.parse(fs.readFileSync('.env'));
} catch {}
try {
  testEnv = dotenv.parse(fs.readFileSync('.env.test'));
} catch {}

Object.assign(process.env, env, testEnv);
