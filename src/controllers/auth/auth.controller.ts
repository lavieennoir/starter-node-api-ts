import { injectable } from 'inversify';

import IBaseController from '../base-controller';

@injectable()
export default class AuthController extends IBaseController {
  baseUrl = '/auth';
}
