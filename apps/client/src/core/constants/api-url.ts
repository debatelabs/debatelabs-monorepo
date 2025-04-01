import envConfig from '~/core/configs/env.config';

const API_BASE_ROUTE = '/api';
const API_PORT = envConfig.SERVER_PORT ? `:${envConfig.SERVER_PORT}` : '';

export const BASE_URL = `${envConfig.SERVER_PROTOCOL}://${envConfig.SERVER_HOST}${API_PORT}${API_BASE_ROUTE}`;
