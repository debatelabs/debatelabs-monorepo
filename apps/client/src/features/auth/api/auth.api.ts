import apiClientInstance from '~/core/lib/api-client';
import { API_ROUTES } from '~/core/constants/api-routes';
import { IAccessToken } from '~/core/types/auth.types';
import { UserLoginDTO, UserSignupDTO } from '~/core/types/user.types';

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
