import { AbstractControl, ValidatorFn } from "@angular/forms";

export const confirmPasswordsValidator: ValidatorFn = (control: AbstractControl) => {
  if (control.get('password')?.value !== control.get('rePassword')?.value) {
    return { confirmPasswords: true }
  }
  return null;
}