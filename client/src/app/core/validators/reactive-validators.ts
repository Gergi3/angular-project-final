import { Validators } from "@angular/forms";

import { emailRegex, imageUrlRegex, phoneNumberRegex, usernameRegex } from "../constants";

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

export const commentTextValidators = [
  Validators.required
]

export const titleValidators = [
  Validators.required,
  Validators.minLength(5),
  Validators.maxLength(150),
]

export const summaryValidators = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100),
]

export const descriptionValidators = [
  Validators.required,
  Validators.minLength(5),
  Validators.maxLength(100_000),
]

export const imageUrlValidators = [
  Validators.pattern(imageUrlRegex)
]