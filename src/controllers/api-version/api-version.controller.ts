import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import REST, { HttpMethod } from 'decorators/rest-api';
import { ISampleService } from 'services/sample-service';
import { DIServiceType } from 'types';
import IBaseController from '../base-controller';

// TODO add class decorator that contains register routes logic
// https://stackoverflow.com/questions/61439271/can-i-access-the-target-class-instance-in-a-typescript-method-decorator
@injectable()
export default class ApiVersionController extends IBaseController {
  baseUrl = '/';
  @inject(DIServiceType.SAMPLE_SERVICE)
  private readonly _sampleService!: ISampleService;

  @REST.api(HttpMethod.GET, '/')
  getApiInfo(_req: Request, res: Response) {
    // console.log({
    //   self: this,
    //   _sampleService: this._sampleService,
    //   base: this.baseUrl
    // });
    return res.json({
      version: '0.1',
      test: this._sampleService.sum(1, 2)
    });
  }
}
