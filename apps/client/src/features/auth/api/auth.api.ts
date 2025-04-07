import apiClientInstance from '~/shared/lib/api-client';
import { API_ROUTES } from '~/shared/config/constants/api-routes';
import { IAccessToken } from '~/shared/model/types/token.types';

import { UserLoginDTO, UserSignupDTO } from '~/features/auth/types/auth.types';

const apiClient = apiClientInstance;
const routes = API_ROUTES.auth;

const authApi = {
  async login(data: UserLoginDTO) {
    return apiClient.post<IAccessToken>(routes.login, data);
  },

  async signup(data: UserSignupDTO) {
    return apiClient.post<IAccessToken>(routes.signup, data);
  }
};

export default authApi;
