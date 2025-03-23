import ExampleApi from '~/infrastructure/api/example.api';
import { tryCatch } from '~/infrastructure/utils/try-catch-decorator';
import ServiceBase from '~/infrastructure/utils/service-base';

/** Class should be exported for testing!
 * Also use ServiceBase to add error handling to methods
 */
export class ExampleService extends ServiceBase {
  constructor(private readonly exampleApi = new ExampleApi()) {
    /** Call super() to wrap all methods in tryCatch decorator.
     * If you need to skip some methods - pass an array of their names
     */
    super(['goo', 'boo']);
  }

  private goo() {
    return 'goo';
  }

  // moo will be automatically wrapped in tryCatch decorator
  public async moo() {
    this.goo();
    return this.exampleApi.moo();
  }

  /** Or instead of extending ServiceBase
   * use tryCatch decorator for error handling for each method
   */
  public boo = tryCatch(async () => {
    return this.exampleApi.moo();
  });
}

/** Use singleton pattern */
const exampleService = new ExampleService();

export default exampleService;
