export default interface IBaseLogger {
  info(value: string): void;
  success(value: string): void;
  warn(value: string): void;
  error(value: string): void;
  trace(value: string): void;
}
