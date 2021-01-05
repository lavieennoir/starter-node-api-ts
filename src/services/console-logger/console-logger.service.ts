import { injectable } from 'inversify';

import BaseLogger from '../base-logger';

@injectable()
export default class ConsoleLogger implements BaseLogger {
  info(value: string): void {
    console.info(value);
  }
  error(value: string): void {
    console.error(value);
  }
  trace(value: string): void {
    console.trace(value);
  }
}
