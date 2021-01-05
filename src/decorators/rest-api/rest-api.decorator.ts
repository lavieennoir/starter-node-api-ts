import IBaseController from 'controllers/base-controller';

import { app } from 'index';
import { HttpMethod } from './rest-api.interface';

function api(method: HttpMethod, url: string) {
  return function(
    target: IBaseController,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const route = `${target.apiVersion ? target.apiVersion : '/v1'}${
      target.baseUrl ? target.baseUrl : '/'
    }${url === '/' ? '' : url}`;

    if (!descriptor.value || typeof descriptor.value !== 'function') {
      throw new Error(
        `${target.constructor.name}.${_propertyKey} is not a function!`
      );
    }
    app[method](route, descriptor.value.bind(target));
  };
}

export default {
  api,
  get: api.bind(null, HttpMethod.GET),
  post: api.bind(null, HttpMethod.POST),
  put: api.bind(null, HttpMethod.PUT),
  patch: api.bind(null, HttpMethod.PATCH),
  delete: api.bind(null, HttpMethod.DELETE)
};
