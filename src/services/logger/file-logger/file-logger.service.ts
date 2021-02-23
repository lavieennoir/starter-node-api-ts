import rfs, { createStream } from 'rotating-file-stream';

import BaseLogger from '../base-logger';

export default class FileLogger implements BaseLogger {
  static defaultOptions: rfs.Options = {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
  };

  info: (value: string) => void;
  warn: (value: string) => void;
  error: (value: string) => void;
  trace: (value: string) => void;

  private readonly stream: rfs.RotatingFileStream;

  constructor(options?: rfs.Options) {
    const mergedOptions = { ...FileLogger.defaultOptions, ...options };
    this.stream = createStream(this.fileNameGenerator, mergedOptions);

    this.info = this.log('info');
    this.warn = this.log('warn');
    this.error = this.log('error');
    this.trace = this.log('trace');
  }

  getStream = () => this.stream;

  private readonly fileNameGenerator = (
    timeMaybe: number | Date,
    indexMaybe: number | undefined
  ) => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const index = indexMaybe ?? 0;
    const time = timeMaybe ?? new Date();

    if (!time) {
      return 'file.log';
    }

    if (!(time instanceof Date)) {
      return `timestamp-${time}-${index}.log`;
    }

    const month = `${time.getFullYear()}${pad(time.getMonth() + 1)}`;
    const day = pad(time.getDate());

    return `${month}${day}-${index}.log`;
  };

  private readonly log = (type: 'info' | 'warn' | 'error' | 'trace') => (
    value: string
  ) => {
    this.stream.write(`${type.toUpperCase()}: ${value}`);
  };
}
