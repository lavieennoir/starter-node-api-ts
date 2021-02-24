import { EnvMode, IEnv } from './env.interface';

const envMode =
  process.env.NODE_ENV &&
  Object.values(EnvMode).includes(
    process.env.NODE_ENV?.toLowerCase() as EnvMode
  )
    ? (process.env.NODE_ENV.toLowerCase() as EnvMode)
    : EnvMode.DEV_ENV;

const isEnv = (mode: EnvMode) => envMode.toLowerCase() === mode;

export const getEnvMode = () => envMode;

export const isDevEnv = () => isEnv(EnvMode.DEV_ENV);

export const isProdEnv = () => isEnv(EnvMode.PROD_ENV);

export const isTestEnv = () => isEnv(EnvMode.TEST_ENV);

const mapEnvValues = {
  bool: (envValue: string) => envValue === 'true',
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return Number.isNaN(value) ? defaultValue : value;
  }
};

const mapEnv = (envData: NodeJS.ProcessEnv) => {
  const {
    PORT = '',
    USE_HTTPS = 'false',
    USE_CORS = 'false',
    RESPONSE_JSON_SIZE_LIMIT = '1000kb',
    ENABLE_REQUEST_LOGGING = 'false',
    APP_NAME = ''
  } = envData;

  const defaultPort = 5000;

  const parsed: IEnv = {
    port: mapEnvValues.number(PORT, defaultPort),
    useHttps: mapEnvValues.bool(USE_HTTPS),
    useCors: mapEnvValues.bool(USE_CORS),
    responseJsonSizeLimit: RESPONSE_JSON_SIZE_LIMIT,
    enableRequestLogging: mapEnvValues.bool(ENABLE_REQUEST_LOGGING),
    appName: APP_NAME
  };

  return Object.freeze(parsed);
};

export const env = mapEnv(process.env);

export default {
  isDevEnv,
  isProdEnv,
  isTestEnv,
  getEnvMode,
  env
};
