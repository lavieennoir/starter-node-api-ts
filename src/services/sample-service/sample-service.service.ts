import { injectable } from 'inversify';
import { ISampleService } from './sample-service.interface';

@injectable()
export default class SampleService implements ISampleService {
  sum(a: number, b: number) {
    return a + b;
  }
}
