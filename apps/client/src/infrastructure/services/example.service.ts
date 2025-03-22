import ExampleApi from '~/infrastructure/api/example.api';

/** class should be exported for testing */
export class ExampleService {
  constructor(private readonly exampleApi = new ExampleApi()) {}

  public async moo() {
    return this.exampleApi.moo();
  }
}

/** use singleton pattern */
const exampleService = new ExampleService();

export default exampleService;
