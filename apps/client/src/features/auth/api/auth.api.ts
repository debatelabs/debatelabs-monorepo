import apiClientInstance from '~/app/lib/api-client';
import API_ROUTES from '~/shared/constants/api-routes';
import { IAccessToken } from '~/shared/types/auth.types';
import { UserLoginDTO, UserSignupDTO } from '~/shared/types/user.types';

const apiClient = apiClientInstance;
const routes = API_ROUTES.auth;

const authApi = {
  async login(data: UserLoginDTO) {
    return apiClient.post<IAccessToken>(routes.login, data);
  },

  async signup(data: UserSignupDTO) {
    return apiClient.post<IAccessToken>(routes.signup, data);
  },

  async refresh() {
    return apiClient.get(routes.refresh);
  },

  async logout() {
    return apiClient.delete(routes.logout);
  },

  async google() {}
};

export default authApi;
