import { Injectable } from "@angular/core";


const defaultErrorMessage = 'An error occurred while trying to do this action, please try again';

@Injectable({
  providedIn: 'root'
})
export class ErrorHelper {
  getApiError(error: any, defaultMessage: string = defaultErrorMessage): string {
    const errMessage = error?.error?.err?.error?.message 
      || error.error?.error?.message
      || error.error?.message
      || error.error?.messages?.join('\n')
      || error.error?.errors?.join('\n')
      || error.error;

    return typeof errMessage !== 'string'
      ? defaultErrorMessage
      : errMessage;
  }
}

