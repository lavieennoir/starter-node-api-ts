const dotenv = require('dotenv');
const fs = require('fs');

const env = dotenv.parse(fs.readFileSync('.env'));
const testEnv = dotenv.parse(fs.readFileSync('.env.test'));

Object.assign(process.env, env, testEnv);
