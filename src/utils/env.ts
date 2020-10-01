const envModes = {
  dev: 'development',
  prod: 'production',
  test: 'test'
};

const env =
  process.env.NODE_ENV &&
  Object.values(envModes).includes(process.env.NODE_ENV?.toLowerCase())
    ? process.env.NODE_ENV.toLowerCase()
    : envModes.dev;

const isEnv = (mode: string) => {
  return env.toLowerCase() === mode;
};

export const getEnv = () => {
  return env;
};

export const isDevEnv = () => {
  return isEnv(envModes.dev);
};

export const isProdEnv = () => {
  return isEnv(envModes.prod);
};

export const isTestEnv = () => {
  return isEnv(envModes.test);
};

export default {
  isDevEnv,
  isProdEnv,
  isTestEnv,
  getEnv
};
