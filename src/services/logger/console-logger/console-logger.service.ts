import chalk from 'chalk';

import BaseLogger from '../base-logger';

export default class ConsoleLogger implements BaseLogger {
  private static readonly COLORS = {
    success: '#4caf50',
    warn: '#ffeb3b',
    error: '#f44336'
  };

  info = (value: string) => {
    console.info(value);
  };
  success = (value: string) => {
    console.info(chalk.green(value));
  };
  warn = (value: string) => {
    console.info(chalk.yellow(value));
  };
  error = (value: string) => {
    console.error(chalk.red(value));
  };
  trace = (value: string) => {
    console.trace(value);
  };
}
