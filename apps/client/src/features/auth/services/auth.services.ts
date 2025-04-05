import authApi from '../api/auth.api';
import authMapper from '~/features/auth/mappers/auth.mapper';
import { ServiceActionProps } from '~/shared/model/types/common.types';
import { createService } from '~/shared/lib/utils/create-service';
import { LoginForm, SignupForm } from '~/features/auth/types/auth.types';

export const login = createService({
  fn: async ({ data }: ServiceActionProps<LoginForm>) => {
    const userLoginDTO = authMapper.toLoginDTO(data);
    return await authApi.login(userLoginDTO);
  }
});

export const signup = createService({
  fn: async ({ data }: ServiceActionProps<SignupForm>) => {
    const userSignupDTO = authMapper.toSignupDTO(data);
    return await authApi.signup(userSignupDTO);
  }
});
