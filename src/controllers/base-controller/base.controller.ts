import { injectable } from 'inversify';

@injectable()
export default class IBaseController {
  baseUrl = '/';
  apiVersion = '/v1';
}
