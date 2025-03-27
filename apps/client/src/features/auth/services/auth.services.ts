import { LoginForm, SignupForm } from '~/shared/types/auth.types';
import authApi from '../api/auth.api';
import userMapper from '~/infrastructure/mappers/user.mapper';
import { ServiceActionProps } from '~/shared/types/common.types';
import { createService } from '~/shared/utils/create-service';

export const login = createService({
  fn: async ({ data }: ServiceActionProps<LoginForm>) => {
    const userLoginDTO = userMapper.toLoginDTO(data);
    const response = await authApi.login(userLoginDTO);
    return response;
  }
});

export const signup = createService({
  fn: async ({ data }: ServiceActionProps<SignupForm>) => {
    const userSignupDTO = userMapper.toSignupDTO(data);
    return await authApi.signup(userSignupDTO);
  }
});

export const refresh = createService({
  fn: async () => {
    return {};
  }
});

export const logout = createService({
  fn: async () => {
    return {};
  }
});

export const google = createService({
  fn: async () => {
    return {};
  }
});
