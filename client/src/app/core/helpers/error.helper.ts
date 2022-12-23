import { Injectable } from "@angular/core";

import { defaultApiDownErrorMessage } from "../constants";


@Injectable({
  providedIn: 'root'
})
export class ErrorHelper {
  getApiError(error: any, defaultMessage: string = defaultApiDownErrorMessage): string {
    const errMessage = error?.error?.err?.error?.message
      || error.error?.error?.message
      || error.error?.message
      || error.error?.messages?.join('\n')
      || error.error?.errors?.join('\n')
      || error.error;

    return typeof errMessage !== 'string'
      ? defaultMessage
      : errMessage;
  }
}

