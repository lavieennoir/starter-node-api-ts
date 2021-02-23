export enum EnvMode {
  DEV_ENV = 'development',
  PROD_ENV = 'production',
  TEST_ENV = 'test'
}
export interface IEnv {
  port: number;
  useCors: boolean;
  responseJsonSizeLimit: string;
  enableRequestLogging: boolean;
  appName: string;
}
