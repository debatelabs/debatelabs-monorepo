import { LoginForm, SignupForm } from '~/core/types/auth.types';
import authApi from '../api/auth.api';
import userMapper from '~/infrastructure/mappers/user.mapper';
import { ServiceActionProps } from '~/core/types/common.types';
import { createService } from '~/core/utils/create-service';

export const login = createService({
  fn: async ({ data }: ServiceActionProps<LoginForm>) => {
    const userLoginDTO = userMapper.toLoginDTO(data);
    return await authApi.login(userLoginDTO);
  }
});

export const signup = createService({
  fn: async ({ data }: ServiceActionProps<SignupForm>) => {
    const userSignupDTO = userMapper.toSignupDTO(data);
    return await authApi.signup(userSignupDTO);
  }
});

export const google = createService({
  fn: async () => {
    return {};
  }
});
