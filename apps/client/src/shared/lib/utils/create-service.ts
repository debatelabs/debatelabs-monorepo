import applicationMapper from '~/shared/model/mappers/application.mapper';
import { BaseDTO, ResponseDTO } from '~/shared/model/types/application.types';
import ERRORS from '~/shared/config/constants/errors';
import logger from '~/shared/lib/utils/logger';

interface CreateServiceProps<T extends object, P> {
  /** The async function to execute */
  fn: (props: P) => Promise<ResponseDTO<T> | T>;
  /** Whether to log errors to console */
  log?: boolean;
  /** Callback function that runs when an error occurs */
  errorFn?: (err: unknown) => Promise<void> | void;
}

/**
 * Utility function that wraps server actions providing error handling and standardizes response format.
 *
 * This function automatically handles:
 *   - Error catching and formatting
 *   - Success response standardization
 *   - Consistent error handling
 *   - Optional console logging of errors
 *
 * @example
 * // Basic usage
 * const login = createService({
 *   fn: async (props: LoginProps) => {
 *     // Your async operation here
 *     return await authApi.login(props);
 *   }
 * });
 *
 * // Usage with error logging disabled
 * const logout = createService({
 *   fn: async () => {
 *     // Your async operation here
 *   },
 *   log: false
 * });
 */
export function createService<T extends object, P = void>({
  fn,
  log = true,
  errorFn
}: CreateServiceProps<T, P>) {
  return async (props: P): Promise<BaseDTO<T | null>> => {
    try {
      const result = await fn(props);

      if ('success' in result) {
        if (result.success) return applicationMapper.toSuccessDTO({ data: result.data });
        throw result;
      }

      return applicationMapper.toSuccessDTO({ data: result });
    } catch (err) {
      if (log) logger.error(err);

      errorFn && (await errorFn(err));

      if (err && typeof err === 'object' && 'success' in err)
        return applicationMapper.toFailDTO(err as BaseDTO<T | null>);

      let errorMessage = ERRORS.unknown;
      if (err instanceof Error) errorMessage = err.message;
      return applicationMapper.toFailDTO({ message: errorMessage });
    }
  };
}
