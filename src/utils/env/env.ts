import { EnvMode, IEnv } from './env.interface';

const envMode =
  process.env.NODE_ENV &&
  Object.values(EnvMode).includes(
    process.env.NODE_ENV?.toLowerCase() as EnvMode
  )
    ? (process.env.NODE_ENV.toLowerCase() as EnvMode)
    : EnvMode.DEV_ENV;

const isEnv = (mode: EnvMode) =>
  envMode.toLowerCase() === mode;

export const getEnvMode = () =>
  envMode;

export const isDevEnv = () =>
  isEnv(EnvMode.DEV_ENV);

export const isProdEnv = () =>
  isEnv(EnvMode.PROD_ENV);

export const isTestEnv = () =>
  isEnv(EnvMode.TEST_ENV);

const mapEnv = (envData: NodeJS.ProcessEnv) => {
  const {
    PORT = '',
    USE_CORS = 'false',
    RESPONSE_JSON_SIZE_LIMIT = '1000kb'
  } = envData;

  const port = parseInt(PORT, 10);
  const defaultPort = 5000;

  const parsed: IEnv = {
    port: Number.isNaN(port) ? defaultPort : port,
    useCors: USE_CORS === 'true' ? true : false,
    responseJsonSizeLimit: RESPONSE_JSON_SIZE_LIMIT
  };

  return parsed;
};

const env = mapEnv(process.env);

export const getEnv = (): Readonly<IEnv> =>
  env;

export default {
  isDevEnv,
  isProdEnv,
  isTestEnv,
  getEnvMode,
  getEnv
};
