import API_ROUTES from '~/core/constants/api-routes';
import ApiClient from '~/core/lib/api-client';

class ExampleApi {
  constructor(
    private readonly apiClient = new ApiClient(),
    private readonly routes = API_ROUTES
  ) {}

  public moo() {
    return this.apiClient.get(this.routes.example);
  }
}

export default ExampleApi;
