'use server';

import { LoginForm, SignupForm } from '~/shared/types/auth.types';
import * as authApi from '../api/auth.api';
import userMapper from '~/infrastructure/mappers/user.mapper';
import { ServiceActionProps } from '~/shared/types/common.types';
import { createAction } from '~/shared/utils/create-action';
import { redirect } from 'next/navigation';
import ROUTES from '~/shared/constants/routes';

export const login = createAction({
  fn: async ({ data }: ServiceActionProps<LoginForm>) => {
    const userLoginDTO = userMapper.toLoginDTO(data);
    const response = await authApi.login(userLoginDTO);
    if (!response.success) return response;
    // TODO: set decoded access token to redux
    redirect(ROUTES.home);
  }
});

export const signup = createAction({
  fn: async ({ data }: ServiceActionProps<SignupForm>) => {
    const userSignupDTO = userMapper.toSignupDTO(data);
    const response = await authApi.signup(userSignupDTO);
    if (!response.success) return response;
    // const accessToken = response.data.accessToken;
    // TODO: set decoded access token to redux
    redirect(ROUTES.home);
    // return response;
  }
});

export const refresh = createAction({
  fn: async () => {
    return {};
  }
});

export const logout = createAction({
  fn: async () => {
    return {};
  }
});

export const google = createAction({
  fn: async () => {
    return {};
  }
});
