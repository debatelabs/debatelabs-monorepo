import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponseDTO, ResponseDTO } from '~/shared/types/response.types';

class ResponseMapper {
  toDTO<T extends object>(response: AxiosResponse): ResponseDTO<T> {
    const { data, status, statusText, headers, config, request } = response;
    return {
      success: status >= 200 && status < 300,

      // `data` is the response that was provided by the server
      data,

      // `status` is the HTTP status code from the server response
      status,

      // `statusText` is the HTTP status message from the server response
      statusText,

      // `headers` the HTTP headers that the server responded with
      // All header names are lower cased and can be accessed using the bracket notation.
      // Example: `response.headers['content-type']`
      headers,

      // `config` is the config that was provided to `axios` for the request
      config,

      // `request` is the request that generated this response
      // It is the last ClientRequest instance in node.js (in redirects)
      // and an XMLHttpRequest instance in the browser
      request
    };
  }

  toErrorDTO<T>(error: AxiosError<T>): ErrorResponseDTO {
    const { isAxiosError, message, name } = error;
    return {
      success: false,
      status: error?.status,
      name,
      message,
      isAxiosError
    };
  }
}

export default ResponseMapper;
