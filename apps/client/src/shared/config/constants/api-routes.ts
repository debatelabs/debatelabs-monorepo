import { BASE_URL } from '~/shared/config/constants/api-url';

export const API_ROUTES = {
  example: '/example',
  auth: {
    login: '/auth/login',
    signup: '/auth/register',
    refresh: '/auth/refresh'
  }
};

export const GOOGLE_API_ROUTES = {
  auth: `${BASE_URL}/auth/google`
};
