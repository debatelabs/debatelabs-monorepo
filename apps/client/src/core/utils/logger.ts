class Logger {
  error(error: unknown) {
    console.error(error);

    // TODO: set global error
    // const appErrorDTO = errorMapper.toAppErrorDTO(error);
    // store.dispatch(setTimedAppError(appErrorDTO));

    // TODO: print errors to nextJS server side
  }
}

const logger = new Logger();

export default logger;
