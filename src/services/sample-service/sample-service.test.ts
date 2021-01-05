import 'jest';
import SampleService from './sample-service.service';

describe('calculate', function() {
  it('add', function() {
    const sampleService = new SampleService();
    const result = sampleService.sum(5, 2);
    expect(result).toBe(7);
  });
});
