import { tryCatch } from '~/infrastructure/utils/try-catch-decorator';

class ServiceBase {
  constructor(methodsToSkip: string[] = []) {
    methodsToSkip = ['constructor', ...methodsToSkip];

    const proto = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(proto).forEach((methodName) => {
      // skip methods
      if (methodsToSkip.includes(methodName)) return;

      const originalMethod = this[methodName];
      if (typeof originalMethod === 'function')
        this[methodName] = tryCatch(originalMethod.bind(this));
    });
  }
}

export default ServiceBase;
