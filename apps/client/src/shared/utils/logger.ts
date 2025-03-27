class Logger {
  error(error: unknown) {
    console.error(error);

    // TODO: set global error
    // const appErrorDTO = errorMapper.toAppErrorDTO(error);
    // store.dispatch(setTimedAppError(appErrorDTO));
  }
}

const logger = new Logger();

export default logger;
