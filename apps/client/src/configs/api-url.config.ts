import envConfig from "~/configs/env.config";

const API_BASE_ROUTE = "/api";

export const BASE_URL = `${envConfig.SERVER_PROTOCOL}://${envConfig.SERVER_HOST}${API_BASE_ROUTE}`;
