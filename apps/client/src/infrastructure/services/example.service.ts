import ExampleApi from '~/infrastructure/api/example.api';
import { tryCatch } from '~/infrastructure/utils/try-catch-decorator';

/** class should be exported for testing */
export class ExampleService {
  constructor(private readonly exampleApi = new ExampleApi()) {}

  /** use tryCatch decorator for error handling */
  public moo = tryCatch(async () => {
    return this.exampleApi.moo();
  });
}

/** use singleton pattern */
const exampleService = new ExampleService();

export default exampleService;
