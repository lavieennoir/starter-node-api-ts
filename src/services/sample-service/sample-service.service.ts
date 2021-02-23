import { ISampleService } from './sample-service.interface';

export default class SampleService implements ISampleService {
  sum(a: number, b: number) {
    return a + b;
  }
}
