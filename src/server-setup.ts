import { Express } from 'express';

type RegistrationHandler =
  | ((app: Express) => Promise<void>)
  | ((app: Express) => void);

export default class ServerSetup {
  private readonly handers: Array<RegistrationHandler> = [];

  constructor(private readonly app: Express) {}

  addHandler = (handler: RegistrationHandler) => {
    this.handers.push(handler);

    return this;
  };

  apply = async () => {
    for (const handler of this.handers) {
      await handler(this.app);
    }
  };
}
