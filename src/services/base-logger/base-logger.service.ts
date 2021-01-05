export default interface IBaseLogger {
  info(value: string): void;
  error(value: string): void;
  trace(value: string): void;
}
