import { Validators } from "@angular/forms";
import { emailRegex, phoneNumberRegex, usernameRegex } from "../constants";
import { confirmPasswordsValidator } from "./confirm-passwords.validator";

export const emailValidators = [
  Validators.required,
  Validators.pattern(emailRegex)
];

export const usernameValidators = [
  Validators.required,
  Validators.minLength(5),
  Validators.maxLength(50),
  Validators.pattern(usernameRegex)
];

export const passwordValidators = [
  Validators.required,
  Validators.minLength(5),
  Validators.maxLength(50)
]

export const rePasswordValidators = [
  Validators.required
]

export const phoneNumberValidators = [
  Validators.minLength(10),
  Validators.maxLength(10),
  Validators.pattern(phoneNumberRegex)
]