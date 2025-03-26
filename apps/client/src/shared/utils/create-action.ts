'use server';

import applicationMapper from '~/infrastructure/mappers/application.mapper';
import { BaseDTO } from '~/shared/types/application.types';
import { ErrorResponseDTO, ResponseDTO } from '~/shared/types/response.types';
import ERRORS from '~/shared/constants/errors';

interface CreateActionProps<T extends object, P> {
  fn: (props: P) => Promise<ResponseDTO<T> | ErrorResponseDTO | T>;
  log?: boolean;
}

/** Use create action for error handling */
export function createAction<T extends object, P = void>({
  fn,
  log = true
}: CreateActionProps<T, P>) {
  return async (props: P): Promise<BaseDTO<T>> => {
    try {
      const result = await fn(props);
      if ('success' in result) {
        if (!result.success) throw new Error(result.data.message);
        return applicationMapper.toSuccessDTO(result.data);
      }
      return applicationMapper.toSuccessDTO(result);
    } catch (err) {
      const error = err instanceof Error ? err.message : ERRORS.unknown;

      if (log) {
        console.error(error);

        // TODO: set global error
        // const appErrorDTO = errorMapper.toAppErrorDTO(error);
        // store.dispatch(setTimedAppError(appErrorDTO));
      }

      return applicationMapper.toFailDTO(error);
    }
  };
}
