import {HttpClientResponse, HttpClientError} from "Server/services/HttpClient";

export default class Logger {
  log(message: string): void {
    console.info(`[info]: ${message}`);
  }

  logError(message: string): void {
    console.error(`[error]: ${message}`);
  }

  logWarning(message: string): void {
    console.warn(`[warn]: ${message}`);
  }

  logSuccessReponse(response: HttpClientResponse): void {
    return this.log(
      `${response.status} ${
        response.statusText
      } - ${response.config.method?.toUpperCase()} ${response.config.url}`
    );
  }

  logErrorReponse(error: HttpClientError): void {
    this.logError(
      `${error.code} ${error.message} - ${error.config.method?.toUpperCase()} ${
        error.config.url
      }`
    );
  }
}