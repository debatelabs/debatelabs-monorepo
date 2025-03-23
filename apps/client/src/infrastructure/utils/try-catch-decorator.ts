import errorMapper from '~/infrastructure/mappers/error.mapper';
import ResponseMapper from '../mappers/response.mapper';

export interface ServiceMethodProps<T> {
  data: T;
  params?: Record<string, unknown>;
}

export function tryCatch<T extends object, P>(
  method: (props: ServiceMethodProps<P>) => Promise<T>
) {
  return async (props: ServiceMethodProps<P>): Promise<T> => {
    try {
      return await method(props);
    } catch (err) {
      // TODO: check lang

      const defaultError = 'errors.badRequest';
      const error = err instanceof Error ? err.message : defaultError;
      console.error(error);

      // TODO: set global error
      // const appErrorDTO = errorMapper.toAppErrorDTO(error);
      // store.dispatch(setTimedAppError(appErrorDTO));

      const baseResponseDTO = ResponseMapper.toBaseDTO(false);
      return baseResponseDTO as T;
    }
  };
}
