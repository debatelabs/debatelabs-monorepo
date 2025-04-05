import apiClient from '~/shared/lib/api-client';
import { IAccessToken } from '~/shared/model/types/token.types';
import { API_ROUTES } from '~/shared/config/constants/api-routes';

const routes = API_ROUTES.auth;

const sessionApi = {
  async refresh() {
    return apiClient.get<IAccessToken>(routes.refresh, {
      skipAuthCheck: true
    });
  }
};

export default sessionApi;
