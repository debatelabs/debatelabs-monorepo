import applicationMapper from '~/infrastructure/mappers/application.mapper';
import { BaseDTO } from '~/shared/types/application.types';

interface TryCatchOptions {
  log?: boolean;
}

export function tryCatch<T extends object, P>(
  method: (props?: P) => Promise<BaseDTO<T>>,
  options: TryCatchOptions = {
    log: true
  }
) {
  return async (props?: P): Promise<BaseDTO<T>> => {
    try {
      return await method(props);
    } catch (err) {
      // TODO: check lang and set error with proper language
      const defaultError = 'errors.badRequest';
      const error = err instanceof Error ? err.message : defaultError;

      if (options.log) {
        console.error(error);

        // TODO: set global error
        // const appErrorDTO = errorMapper.toAppErrorDTO(error);
        // store.dispatch(setTimedAppError(appErrorDTO));
      }

      return applicationMapper.toFailDTO(error);
    }
  };
}
