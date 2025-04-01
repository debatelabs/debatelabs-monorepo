import apiClient from '~/core/lib/api-client';
import { IAccessToken } from '~/core/types/auth.types';
import { API_ROUTES } from '~/core/constants/api-routes';

const routes = API_ROUTES.auth;

const sessionApi = {
  async refresh() {
    return apiClient.get<IAccessToken>(routes.refresh, {
      skipAuthCheck: true
    });
  }
};

export default sessionApi;
