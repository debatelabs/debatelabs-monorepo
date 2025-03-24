import ApiClient from '~/core/lib/api-client';
import API_ROUTES from '~/core/constants/api-routes';
import { IAccessToken } from '~/shared/types/auth.types';
import { UserLoginDTO, UserSignupDTO } from '~/shared/types/user.types';

class AuthApi {
  constructor(
    private readonly apiClient = new ApiClient(),
    private readonly routes = API_ROUTES.auth
  ) {}

  public login(data: UserLoginDTO) {
    return this.apiClient.post<IAccessToken>(this.routes.login, data);
  }

  public signup(data: UserSignupDTO) {
    return this.apiClient.post<IAccessToken>(this.routes.signup, data);
  }

  public logout() {}

  public refresh() {}

  public google() {}
}

export default AuthApi;
